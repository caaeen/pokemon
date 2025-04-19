import React from 'react'

const PokeList = ({pokemon}) => {
  return (
    <div className=" w-full h-full sm:gap-5 grid md:grid-cols-4 grid-cols-2 relative sm:px-20 py-5 px-5">
            {pokemon.map(p => (
                <div key={p.id} className="p-2 rounded-xl  cursor-pointer">
                    <div>
                        <b>#{p.id}</b>
                    </div>
                    <div className="platform pt-1 pb-2 relative">
                        <img src={p.sprites.front_default} alt={pokemon.name} className="drop-shadow-[10px_0px_1px_rgba(0,0,0,0.5)] mx-auto w-[150px]"/>
                    </div>
                    <div className="border-[2px] border-blue-700/60 p-2 rounded-b-[5px] bg-amber-500/20">
                        <b>{p.name}</b>
                        <p>Type: {p.types.map((t)=> t.type.name).join(", ")}</p>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default PokeList