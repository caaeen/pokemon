import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Result = () => {
  const [message, setMessage] = useState("Loading result...");
  const navigate = useNavigate();
  const battleId = localStorage.getItem("battleId");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const { result } = res.data;
        const playerId = localStorage.getItem("playerId");

        if (result === "Tie") {
          setMessage("Draw");
        } else if (result === playerId) {
          setMessage("You Win");
        } else {
          setMessage("You Lose");
        }
      } catch (err) {
        console.error("Failed to fetch result:", err);
        setMessage("Error fetching result.");
      }
    };

    if (battleId) fetchResult();
  }, [battleId]);

  return (
    <div className="w-full h-svh justify-center flex flex-col gap-10 items-center">
      <img
        src="https://img.freepik.com/premium-vector/pixel-art-game-background-with-grass-sky-clouds_1334819-36231.jpg"
        alt=""
        className="opacity-50 absolute w-full h-full object-cover -z-20"
      />
      <div className="shadow-md backdrop-blur-2xl bg-white/30 rounded-lg sm:w-[600px] w-[80%] h-[300px] justify-center flex flex-col gap-10 items-center">
        <span className="relative w-full flex justify-center items-center">
          <b className="text-4xl absolute animate-ping text-white tracking-[10px]">
            {message}
          </b>
          <b className="text-blue-900/70 sm:text-5xl text-3xl absolute tracking-[10px]">
            {message}
          </b>
        </span>
        <button
          onClick={() => navigate("/pokedex")}
          className="bg-green-700/70 hover:bg-green-700 duration-300 cursor-pointer ease text-white py-1 mt-2 px-3 rounded"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default Result;
