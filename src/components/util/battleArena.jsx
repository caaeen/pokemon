import React, { useEffect, useState } from 'react';
import Arena from '../../assets/images/arena.png';
import axios from 'axios';
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
  normal: "bg-[#A8A77A] ",
  fighting: "bg-[#C22E28]",
  ghost: "bg-[#735797]"
};

const BattleArena = ({ battle }) => {
  const [hostPokemon, setHostPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [roundResults, setRoundResults] = useState([]);

  useEffect(() => {
    if (!battle) return;

    const hostTeam = battle.hostPickedTeam || [];
    const opponentTeam = battle.opponentPickedTeam || [];

    const lastHost = hostTeam[hostTeam.length - 1]?.pokemonId;
    const lastOpponent = opponentTeam[opponentTeam.length - 1]?.pokemonId;

    if (lastHost) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${lastHost}`)
        .then(res => setHostPokemon(res.data))
        .catch(err => console.error('Host fetch error:', err));
    }

    if (lastOpponent) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${lastOpponent}`)
        .then(res => setOpponentPokemon(res.data))
        .catch(err => console.error('Opponent fetch error:', err));
    }
  }, [battle]);

  const renderPokemonCard = (pokemon, reverse = false) => {
    if (!pokemon) return <div className="text-center">Loading...</div>;

    const sprite = reverse
      ? pokemon.sprites?.back_default
      : pokemon.sprites?.front_default;

    return (
      <div className="p-2 rounded-xl sm:w-[390px] min-w-[250px]">
        <div className="platform pt-1 pb-2 relative">
          <img
            src={sprite}
            alt={pokemon.name}
            className="animate-bounce drop-shadow-[10px_0px_1px_rgba(0,0,0,0.5)] mx-auto sm:w-[200px] w-[150px]"
          />
        </div>

        <div className="border-[2px] border-blue-700 p-2 rounded-b-[5px] bg-amber-100">
          <div>
            <b>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
            <p className="mt-1 flex gap-2 flex-wrap">
            {pokemon.types.map((typeObj, i) => (
              <span
                key={i}
                className={`px-2 py-[1px] text-white rounded text-[11px] ${
                  typeColor[typeObj.type.name] || "bg-gray-300"
                }`}
              >
                {typeObj.type.name}
              </span>
            ))}

            </p>
          </div>
          <br />
          <hr />
          <div className="flex flex-wrap gap-2 mt-2">
            <small><b>Hp:</b> {pokemon.stats[0].base_stat}</small>
            <small><b>Atk:</b> {pokemon.stats[1].base_stat}</small>
            <small><b>Def:</b> {pokemon.stats[2].base_stat}</small>
          </div>
        </div>
      </div>
    );
  };

  const updateRoundResults = (round) => {
    
    const oddRounds = round.filter((_, index) => index % 2 !== 0);
    
    
    const hostWins = oddRounds.filter(result => result === 1).length;
    const opponentWins = oddRounds.filter(result => result === 0).length;

    setRoundResults({ hostWins, opponentWins });
  };

  useEffect(() => {
    if (battle?.round) {
      updateRoundResults(battle.round);  
    }
  }, [battle]);

  return (
    <div className="sm:w-[70%] w-[100%] shadow-xl relative overflow-hidden bg-white -z-10">
      <img src={Arena} alt="" className="opacity-30 absolute w-full h-full object-cover -z-20" />

      <div className="flex px-5 shadow-sm rounded bg-white mt-1 p-2 justify-between">
        <span>
          <b className="text-[16px] sm:text-[18px] ">{battle.hostId}</b>
          <p>{roundResults.hostWins} - win</p> {/* Display host wins */}
        </span>
        <span className="text-center">
          <b className="text-[16px] sm:text-[18px]">Round </b>
          <p>{Math.floor((battle.round?.length || 0) / 2)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </p>
        </span>
        <span className="flex flex-col text-end">
          <b className="text-[16px] sm:text-[18px]">{battle.opponentId}</b>
          <p>{roundResults.opponentWins} - win</p> 
        </span>
      </div>

      <div className="flex justify-end px-5">
        {renderPokemonCard(hostPokemon)}
      </div>

      <div className="text-center sm:text-4xl py-2 text-2xl text-black/60">
        <b>V.S</b>
      </div>

      <div className="flex justify-start px-5">
        {renderPokemonCard(opponentPokemon, true)}
      </div>
    </div>
  );
};

export default BattleArena;
