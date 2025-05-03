import { React, useState, useEffect } from 'react';
import Loading from './util/loader.jsx';
import MyTeam from './util/myTeam.jsx';
import BattleArena from './util/battleArena.jsx';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallpaper from '../assets/images/pokemon-wallpaper.png';
import {useNavigate} from 'react-router-dom'

const Pvp = () => {
  const [playerData, setPlayerData] = useState(null);
  const [battleData, setBattleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBattle, setShowBattle] = useState(false);
  const [role, setRole] = useState('');
  const [scoreData, setScoreData] = useState(null);  // State for storing filtered scores
  const playerId = localStorage.getItem('playerId');
  const battleId = localStorage.getItem('battleId');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBattle = async () => {
      if (!playerId || !battleId) {
        toast.error("Missing playerId or battleId in local storage.");
        setLoading(false);
        return;
      }

      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const battle = res.data;
        setBattleData(battle);

        let team = [];
        let role = '';

        if (battle.hostId === playerId) {
          team = battle.hostTeam;  // Assuming team is an array of Pokémon IDs
          role = 'Host';
          setRole(role);
        } else if (battle.opponentId === playerId) {
          team = battle.opponentTeam;  // Same here for opponent team
          role = 'Opponent';
          setRole(role);
        } else {
          toast.error("You are not a participant in this battle.");
          setLoading(false);
          return;
        }

        setPlayerData({
          id: playerId,
          role: role,
          team: team
        });
        
        // Fetching scores
        const scoreRes = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const roundScores = scoreRes.data.round;

        // Filter out even-indexed rounds
        const filteredScores = roundScores.filter((score, index) => index % 2 !== 0);

        setScoreData(filteredScores);  // Save the filtered scores

        if (battle.hostReady && battle.opponentReady && battle.status === "active") {
          setTimeout(() => setShowBattle(true), 4000);
        }

      } catch (err) {
        toast.error("Error fetching battle data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBattle();
  }, [playerId, battleId]);

  //Check winner 


  useEffect(() => {
    const checkWinner = async () => {
      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const { hostTeam, opponentTeam, round = [], hostId, opponentId } = res.data;
  
        if (hostTeam.length === 0 && opponentTeam.length === 0 && round.length > 0) {
          let hostWins = 0;
          let opponentWins = 0;
  
          for (let i = 1; i < round.length; i += 2) {
            if (round[i] === 1) hostWins++;
            else if (round[i] === 0) opponentWins++;
          }
  
          let result;
          if (hostWins > opponentWins) {
            toast.info(hostId + " Wins!");
            result = hostId;
          } else if (opponentWins > hostWins) {
            toast.info(opponentId +" Wins!");
            result = opponentId;
          } else {
            toast.info(" It's a Tie!");
            result = "It's a Tie";
          }
  
          await Axios.patch(`${import.meta.env.VITE_API_URL}/battle/${battleId}`, {
            status: "completed",
            result
          });
          window.location.href="/result?resultId="+battleId;
          //navigate(`/result?resultId=${battleId}`);

        }
      } catch (err) {
        console.error("Error checking winner:", err);
      }
    };
  
    const interval = setInterval(checkWinner, 5000);
    return () => clearInterval(interval);
  }, [battleId]);
  

  if (loading) return <Loading />;
  if (!playerData || !battleData) return <div>No battle data found.</div>;
  
  return (
    <div className="w-full h-full flex justify-center relative min-h-svh">
      <ToastContainer />
      <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />

      {showBattle ? (
        <MyTeam team={playerData.team} battleId={battleData.id} role={role} />
      ) : (
        <BattleArena battle={battleData} playerId={playerId} scoreData={scoreData} /> 
      )}
    </div>
  );
};

export default Pvp;
