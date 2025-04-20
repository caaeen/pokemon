import React from 'react';

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

const PokeList = ({ pokemon, searchResult }) => {
  const dataToShow = searchResult && searchResult !== "" ? [searchResult] : pokemon;

  return (
    <div className="w-full h-full sm:gap-5 grid md:grid-cols-4 grid-cols-2 relative sm:px-20 py-5 px-5">
      {dataToShow.map((p) => (
        <div key={p.id} className="p-2 rounded-xl cursor-pointer">
          <div className="w-full flex justify-between text-gray-800/70">
            <b>#{p.id}</b>
            {searchResult && (
              <span className="p-1 bg-blue-600/50 hover:bg-blue-700 duration-300 ease-in text-white rounded text-[12px] flex items-center gap-1">
                <i className="fa-solid fa-plus"></i>
                <span>Team</span>
              </span>
            )}
          </div>

          <div className="platform pt-1 pb-2 relative">
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="drop-shadow-[10px_0px_1px_rgba(0,0,0,0.5)] mx-auto w-[150px]"
            />
          </div>

          <div className="border-[2px] border-blue-700 p-2 rounded-b-[5px] bg-amber-500/20 ease duration-300 hover:bg-amber-400/50">
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
        </div>
      ))}
    </div>
  );
};

export default PokeList;
