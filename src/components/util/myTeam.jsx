import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const typeColor = {
  grass: "bg-green-400",
  fire: "bg-red-400",
  water: "bg-blue-400",
  electric: "bg-yellow-300",
  bug: "bg-lime-400",
  poison: "bg-purple-400",
  flying: "bg-indigo-300",
  ground: "bg-yellow-600",
  rock: "bg-gray-500",
  psychic: "bg-pink-400",
  ice: "bg-cyan-300",
  dragon: "bg-purple-600",
  dark: "bg-[#705746] text-white",
  steel: "bg-gray-400",
  fairy: "bg-pink-200",
  normal: "bg-[#A8A77A]",
  fighting: "bg-[#C22E28]",
  ghost: "bg-[#735797]",
};

const MyTeam = ({ team, battleId, role }) => {
  const [pokemonStats, setPokemonStats] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);
  
  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const stats = await Promise.all(
          team.map(async (pokemonId) => {
            const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            return res.data;
          })
        );
        setPokemonStats(stats);
      } catch (err) {
        console.error("Error fetching Pokémon stats:", err);
      }
    };

    fetchPokemonStats();
  }, [team]);


  useEffect(() => {
    if (!selectedId) return;
  
    const interval = setInterval(async () => {
      try {
        const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
        const {
          hostTeam,
          opponentTeam,
          hostPickedTeam,
          opponentPickedTeam,
          round = []
        } = res.data;
  
        if (hostTeam.length === opponentTeam.length && hostTeam.length >= 0) {
          const hostPick = hostPickedTeam[hostPickedTeam.length - 1];
          const opponentPick = opponentPickedTeam[opponentPickedTeam.length - 1];
  
          if (hostPick && opponentPick) {
            let hostPoints = 0;
            let opponentPoints = 0;
  
            const stats = ['hp', 'attack', 'speed'];
            stats.forEach(stat => {
              if (hostPick[stat] > opponentPick[stat]) hostPoints++;
              else if (hostPick[stat] < opponentPick[stat]) opponentPoints++;
            });
  
            const newRound = [...round];
            if (hostPoints > opponentPoints) newRound.push(1);
            else if (hostPoints < opponentPoints) newRound.push(0);
           
  
            await Axios.patch(`${import.meta.env.VITE_API_URL}/battle/${battleId}`, {
              hostRoundPoints: hostPoints,
              opponentRoundPoints: opponentPoints,
              round: newRound
            });
  
            //console.log(`Round Result -> Host: ${hostPoints}, Opponent: ${opponentPoints}`);
          }
  
          window.location.reload();
        }
      } catch (err) {
        console.error("Error checking team status or scoring:", err);
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, [selectedId, battleId]);
  

  const handleSelect = async (pokemon) => {
    if (isSelectionDisabled) return;

    setSelectedId(pokemon.id);
    setIsSelectionDisabled(true);

    const selectedData = {
      pokemonId: pokemon.id,
      hp: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
      speed: pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat
    };

    const roleField = role === 'Host' ? 'hostPickedTeam' : 'opponentPickedTeam';
    const teamFieldToRemoveFrom = role === 'Host' ? 'hostTeam' : 'opponentTeam';

    try {
      const res = await Axios.get(`${import.meta.env.VITE_API_URL}/battle/${battleId}`);
      const battleData = res.data;

      const updatedTeam = (battleData[roleField] || []).concat(selectedData);
      const filteredTeam = (battleData[teamFieldToRemoveFrom] || []).filter(id => id !== pokemon.id);

      await Axios.patch(`${import.meta.env.VITE_API_URL}/battle/${battleId}`, {
        [roleField]: updatedTeam,
        [teamFieldToRemoveFrom]: filteredTeam
      });
    } catch (err) {
      console.error("Error updating battle team:", err);
    }
  };


  
  
  return (
    <>
      <div className='w-full h-full absolute z-50'>
      <div className='pt-10 text-center text-2xl text-[#737373]'>
        <b>Choose a Pokemon</b>
      </div>
      <div className='grid w-full md:grid-cols-5 gap-3 grid-cols-2 p-5 place-item-center cursor-pointer'>
        {pokemonStats.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => handleSelect(pokemon)}
            className={`py-4 rounded-md hover:shadow-md border ${
              selectedId === pokemon.id ? 'border-red-500' : 'border-gray-700/40'
            } ease duration-200 bg-white p-2 ${isSelectionDisabled ? 'pointer-events-none opacity-50' : ''}`}
          >
            <div className='flex justify-center'>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='lg:w-[150px] min-w-[150px]'
              />
            </div>
            <div className='text-center mb-2 flex justify-center items-center flex-col gap-2'>
              <b className="text-[20px]">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
              <div className="p-1 rounded text-white">
                {pokemon.types.map(type => (
                  <span key={type.type.name} className={`${typeColor[type.type.name]} p-1 rounded mr-1`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <p>Hp: <b>{pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</b></p>
            <div className="bg-[#d9d9d9] h-2 rounded mt-2 w-full relative">
              <div
                className="bg-[#ffbd59] h-full rounded"
                style={{ width: `${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat * 0.38}%` }}
              ></div>
            </div>
            <p>Attack: <b>{pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</b></p>
            <div className="bg-[#d9d9d9] h-2 rounded mt-2 w-full relative">
              <div
                className="bg-[#ffbd59] h-full rounded"
                style={{ width: `${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat * 0.39}%` }}
              ></div>
            </div>
            <p>Speed: <b>{pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</b></p>
            <div className="bg-[#d9d9d9] h-2 rounded mt-2 w-full relative">
              <div
                className="bg-[#ffbd59] h-full rounded"
                style={{ width: `${pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat * 0.39}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* WHO WON DESIGN HERE */}

    <div>
      
    </div>
    </>


  );
};

export default MyTeam;
