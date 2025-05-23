import { React, useState, useEffect } from 'react';
import Header from './header.jsx';
import Wallpaper from '../assets/images/pokemon-wallpaper.png';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './util/loader.jsx'
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
  normal: "bg-[#A8A77A] text-black",
  fighting: "bg-[#C22E28]",
  ghost: "bg-[#735797]",
};

const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);

  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeData = res.data;
        setPokemon(pokeData);
  
        const speciesRes = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        setSpecies(speciesRes.data);
  
        const damageMap = {};
  
        const typePromises = pokeData.types.map(async ({ type }) => {
          const typeRes = await Axios.get(type.url);
          const relations = typeRes.data.damage_relations;
  
          relations.double_damage_from.forEach(({ name }) => {
            damageMap[name] = (damageMap[name] || 1) * 2;
          });
  
          relations.half_damage_from.forEach(({ name }) => {
            damageMap[name] = (damageMap[name] || 1) * 0.5;
          });
  
          relations.no_damage_from.forEach(({ name }) => {
            damageMap[name] = 0;
          });
        });
  
        await Promise.all(typePromises);
  
        const finalWeaknesses = Object.entries(damageMap)
          .filter(([type, multiplier]) => multiplier > 1)
          .map(([type]) => type);
  
        setWeaknesses(finalWeaknesses);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      }
    };
  
    fetchPokemon();
  }, [id]);

  if (!pokemon) return <Loading/>;

  return (
    <div className="w-full h-full grid mb-20">
      <Header />
      <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
      <div className="md:w-[80%] w-full h-full flex sm:flex-row mt-10 gap-3 flex-col place-self-center">
        
        {/* LEFT PANEL */}
        <div className="flex-1 p-2 flex flex-col items-center gap-3">
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt="" className="w-full min-h-[300px] object-cover" />
          <span className="text-[28px] text-center text-[#737373]">
            #{pokemon.id} <span className="font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
          </span>
          <div className="w-full flex justify-center gap-2 flex-wrap">
            {pokemon.types.map((t, i) => (
              <span key={i} className={`${typeColor[t.type.name]} py-1 px-5 text-white rounded-md text-center capitalize`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* BASE STATS */}
        <div className="flex-1 p-2">
          <b className="text-[24px] text-[#737373]">Base Stats</b>
          {pokemon.stats.map((stat, i) => {
            const name = stat.stat.name.replace('-', ' ');
            const value = stat.base_stat;
            return (
              <div className="mt-4" key={i}>
                <span className="font-bold text-[#737373] capitalize">{name}:</span>
                <span className='text-[#737373]'> {value}</span><br />
                <div className="bg-[#d9d9d9] h-2 rounded mt-2 w-full relative">
                  <div className="bg-[#ffbd59] h-full rounded" style={{ width: `${value * 0.39}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-2">
          <div>
            <b className="text-[24px] text-[#737373]">Pokedex Entry</b>
            <p className="text-[#737373]">{species?.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')}</p>
            <div className="shadow-md p-4 mt-3 rounded bg-white">
                <p className="text-[#737373]"><span className="font-bold ">Height:</span> {pokemon.height / 10} m</p><br />
                <p className="text-[#737373]"><span className="font-bold ">Weight:</span> {pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className="mt-4">
            <b className="text-[24px] text-[#737373]">Abilities</b>
            <div className="flex flex-wrap mt-2 gap-3">
              {pokemon.abilities.map((a, i) => (
                <p key={i} className="px-5 py-1 border-[1px] border-[#737373] rounded text-[#737373] capitalize">{a.ability.name}</p>
              ))}
            </div>
          </div>

          <div className="mt-4">
          <b className="text-[24px] text-[#737373]">Weakness</b>
          <span className="w-full flex justify-start flex-wrap mt-2 gap-3">
            {weaknesses.map((w, i) => (
              <span key={i} className={`py-1 px-5 text-white rounded-md text-center capitalize ${typeColor[w] || "bg-gray-600"}`}>
                {w}
              </span>
            ))}
          </span>
        </div>


          {/*<div className="mt-4">
            <b className="text-[24px] text-[#737373]">Resistance</b>
            <span className="w-full flex justify-start flex-wrap mt-2 gap-3">
              <span className="bg-gray-400 py-1 px-5 text-white rounded-md text-center">steel</span>
            </span>
          </div>*/}


        </div>

      </div>
    </div>
  );
};

export default Pokemon;
