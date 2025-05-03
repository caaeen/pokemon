import { React, useState, useEffect } from 'react';
import Header from './header.jsx';
import '../index.css';
import Wallpaper from '../assets/images/pokemon-wallpaper.png';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
  const [battles, setBattles] = useState([]);
  const playerId = localStorage.getItem('playerId');

  useEffect(() => {
    if (!playerId) {
      toast.warn("Player ID not found in localStorage");
      return;
    }

    Axios.get(`${import.meta.env.VITE_API_URL}/battle?status=completed`)
      .then((res) => {
        const filtered = res.data.filter(b => b.hostId === playerId || b.opponentId === playerId);
        setBattles(filtered);
      })
      .catch(() => toast.error("Failed to fetch battle history"));
  }, []);

  const renderTeam = (team) => (
    <div className="flex gap-2 sm:mb-4 mb-2 flex-wrap justify-around">
      {team.map((pokeId, index) => (
        <img key={index} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId.pokemonId}.png
`} alt="" className="border w-[50px] h-[50px] rounded-[50px] object-contain bg-amber-600/20" /> 
      ))}
    </div>
  );

  const renderBattle = (battle, index) => {
    const userWon = battle.result === playerId;
    const isTie = battle.result == "Tie";
    const resultText = isTie ? "Draw" : userWon ? "You Won" : "You Lost";

    return (
        <div key={index} className="shadow w-full bg-white rounded p-5 mb-5">
            <div className="text-center mb-2">
              <b className="text-2xl">{resultText}</b>
            </div>
            <div className="flex justify-between">
                <div>
                  {renderTeam(battle.hostId !== playerId ? battle.hostPickedTeam : battle.opponentPickedTeam)}
                  <b>
                    {battle.hostId === playerId
                      ? `You (${playerId})`
                      : `Opponent (${battle.hostId})`}
                  </b>
              </div>
              <b className="flex justify-center items-center mx-2">VS</b>
              <div className="flex flex-col items-end">
                {renderTeam(battle.hostId === playerId ? battle.hostPickedTeam : battle.opponentPickedTeam)}
                <b>
                  {battle.hostId !== playerId
                    ? `You (${playerId})`
                    : `Opponent (${battle.opponentId})`}
                </b>
              </div>
            </div>
            <div>
              <small>Date: {new Date(battle.timestamp).toLocaleDateString()}</small>
            </div>
        </div>
    );
  };

  return (
    <div className="w-full h-svh overflow-y-auto">
      <Header />
      <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
      <div className="md:w-[80%] w-full grid place-self-center place-items-center">
        <div className="p-5 text-start w-full">
          <b className="text-[#737373] sm:text-2xl md:text-3xl text-[19px]">Battle History</b>
        </div>
        <div className="flex flex-col md:w-[80%] w-full h-full">
          {battles.length > 0 ? battles.map(renderBattle) : <p className="text-center w-full">No completed battles found.</p>}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default History;
