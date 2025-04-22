import React, { useState } from 'react';
import Header from './header.jsx';
import Wallpaper from '../assets/images/pokemon-wallpaper.png';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const Battle = () => {
  const [battleId, setBattleId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generateQR = async () => {
    const newBattleId = crypto.randomUUID();
    const playerId = localStorage.getItem("playerId");
    localStorage.setItem("battleId", newBattleId);
  
    setBattleId(newBattleId);
  
    try {
      await Axios.post("http://localhost:3000/queue", {
        id: newBattleId,
        hostId: playerId,
        opponentId: null,
        status: "pending",

        createdAt: new Date().toISOString()
      });
  
      toast.success("QR Generated and battle created!");
    } catch (err) {
      toast.error("Failed to save battle to server");
      console.error(err);
    }
  };

  const qrValue = battleId
    ? `http://localhost:5173/pokedex?bid=${battleId}` // replace with your actual site URL
    : '';

  return (
    <>
      <div>
        <Header isOn={false} />
        <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />

        <div className="w-full h-full flex flex-col pt-15 gap-5 items-center p-2">
          <p className="text-[#737373] text-center">
            This match is a <b>Player</b> vs <b>Player</b> battle simulation. Generating QR will require other player
            to scan in order to join you in a battle. <br />
            <b className="text-red-900/70 text-[13px]">
              *Do not leave this page or the battle request will be cancelled.*
            </b>
          </p>

          <div className="generatedQR sm:w-[400px] p-2 w-full min-h-[200px] border-[2px] bg-white border-[#737373] rounded flex justify-center items-center">
            {battleId ? (
              <QRCode value={qrValue} size={200} />
            ) : (
              <p className="text-center text-sm text-gray-400">Click "Generate QR" to create a battle</p>
            )}
          </div>

          <button
            onClick={generateQR}
            className="p-2 rounded cursor-pointer shadow-md text-[#737373] bg-white hover:bg-blue-700/80 hover:text-white ease-linear duration-300"
          >
            Generate QR
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Battle;
