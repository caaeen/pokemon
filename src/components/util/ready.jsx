import { React, useState, useEffect } from 'react';
import Loading from './loader.jsx';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Wallpaper from '../../assets/images/pokemon-wallpaper.png'
const Ready = () => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  const playerId = localStorage.getItem('playerId');
  const battleId = localStorage.getItem('battleId');

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const battle = res.data;

        if (battle.hostId === playerId) {
          setPlayerData({ role: 'host', id: playerId });
        } else if (battle.opponentId === playerId) {
          setPlayerData({ role: 'opponent', id: playerId });
        } else {
          toast.error("You are not part of this battle.");
        }
      } catch (err) {
        toast.error("Failed to fetch battle data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBattle();

    // 30s timeout to check if battle should be aborted
    const abortTimeout = setTimeout(async () => {
      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const battle = res.data;

        if (!battle.hostReady && !battle.opponentReady) {
          await Axios.put(`${import.meta.env.VITE_API_URL}/battle/${battleId}`, {
            ...battle,
            status: 'aborted'
          });

          localStorage.removeItem('battleId');
          toast.error("Battle aborted due to inactivity.");
          navigate('/pokedex');
        }
      } catch (err) {
        toast.error("Failed to check or abort battle.");
      }
    }, 30000);

    return () => clearTimeout(abortTimeout);
  }, []);

  const handleReady = async () => {
    try {
      const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
      const currentBattle = res.data;

      const updatedBattle = {
        ...currentBattle,
        [`${playerData.role}Ready`]: true
      };

      await Axios.put(`${import.meta.env.VITE_API_URL}/battle/${battleId}`, updatedBattle);

      toast.success("You are ready!");
      setIsReady(true);

      const id = setInterval(async () => {
        setCountdown(prev => prev - 5);

        try {
          const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
          const battle = res.data;

          const opponentRole = playerData.role === 'host' ? 'opponentReady' : 'hostReady';

          if (battle[opponentRole]) {
            clearInterval(id);
            toast.success("Starting battle...");
            navigate('/pvp');
          } else if (countdown <= 5) {
            clearInterval(id);
            localStorage.removeItem('battleId');
            navigate('/pokedex');
            toast.error("Opponent did not respond. Timeout.");
          }
        } catch (err) {
          toast.error("Failed to check opponent status.");
        }
      }, 500);

      setIntervalId(id);
    } catch (err) {
      toast.error("Failed to set ready status.");
    }
  };

  useEffect(() => {
    if (countdown <= 0 && intervalId) {
      clearInterval(intervalId);
    }
  }, [countdown, intervalId]);

  if (loading) return <Loading />;
  if (!playerData) return navigate('/pokedex');

  return (
    <div className="p-4 w-full h-svh flex justify-center items-center flex-col ">
      <ToastContainer />
      <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
      

      <div className="flex justify-center items-center flex-col h-[200px] bg-white shadow-xl w-[350px] rounded-md gap-5 ">
        <b className="text-2xl font-bold mb-4">Are you ready...</b>
        {!isReady && (
          <button
            onClick={handleReady}
            className="animate-bounce cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <p className="">Ready</p>
          </button>
        )}

        {isReady && (
          <div className="mt-4 text-yellow-600 font-semibold">
            Waiting for opponent... <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ready;
