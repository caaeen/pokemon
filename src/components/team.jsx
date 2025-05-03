import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Header from './header.jsx'
import Wallpaper from '../assets/images/pokemon-wallpaper.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    ghost: "bg-[#735797]"
  };
const MyTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const playerId = localStorage.getItem('playerId');
    const teamKey = `team-${playerId}`;
    const teamIds = JSON.parse(localStorage.getItem(teamKey)) || [];

    const fetchTeamData = async () => {
      try {
        const promises = teamIds.map(id =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
        const responses = await Promise.all(promises);
        const teamData = responses.map(res => res.data);
        setTeam(teamData);
      } catch (err) {
        console.error("Failed to fetch Pokémon data", err);
      }
    };

    fetchTeamData();
  }, []);
  
  const removePokemon = (pokemonId) => {
    const playerId = localStorage.getItem('playerId');
    const teamKey = `team-${playerId}`;
    let teamIds = JSON.parse(localStorage.getItem(teamKey)) || [];
  
    teamIds = teamIds.filter(id => id !== pokemonId);
    localStorage.setItem(teamKey, JSON.stringify(teamIds));
    
    // Update React state to trigger re-render
    toast.success("Removed from team.")
    const updatedTeam = team.filter(p => p.id !== pokemonId);
    setTeam(updatedTeam);
    
  };
  
  return (
    <div>
      <Header/>
      <div className="p-5 text-start sm:ml-17 ">
          <b className="text-[#737373] sm:text-2xl md:text-3xl text-[19px]">Trainer's Party </b>
      </div>
      <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
      {team.length === 0 ? (
        <p>Your team is empty.</p>
      ) : (
        <div className="w-full h-full sm:gap-5 grid md:grid-cols-4 grid-cols-2 relative sm:px-20 py-5 px-5">
      {team.map((p) => (
       
          <div key={p.id} className="p-2 rounded-xl ">
            <div className="w-full flex justify-between text-gray-800/70">
              <b>#{p.id}</b>
           
              <span onClick={()=>removePokemon(p.id)} className="p-1 cursor-pointer bg-red-600/50 hover:bg-red-700 duration-300 ease-in text-white rounded text-[12px] flex items-center gap-1">
                <i  className="fa-solid fa-minus"></i>
                <span>Remove</span>
              </span>
            </div>
         
            <div className="platform pt-1 pb-2 relative">
              <img
                src={p.sprites.other["official-artwork"].front_default}
                alt={p.name}
                className="drop-shadow-[10px_0px_1px_rgba(0,0,0,0.5)] mx-auto w-[150px]"
              />
            </div>
            <Link to={`/pokemon/${p.id}`}>
              <div className="cursor-pointer border-[2px] border-blue-700 p-2 rounded-b-[5px] bg-amber-100 ease duration-300 hover:bg-amber-400/50">
              <b>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</b>
              <p className="mt-1 flex gap-2 flex-wrap">
                {p.types.map((t, i) => {
                  const type = t.type.name;
                  const bgClass = typeColor[type] || "bg-gray-100";

                  return (
                    <span
                      key={i}
                      className={`px-2 py-[1px] rounded text-[11px] text-white ${bgClass}`}
                    >
                      {type}
                    </span>
                  );
                })}
              </p>
              </div>
            </Link>
          </div>
        
      ))}
    </div>
      )}
    </div>
  );
};

export default MyTeam;
