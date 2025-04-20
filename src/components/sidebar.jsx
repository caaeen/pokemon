import {React, useState} from 'react'
import {Link} from 'react-router-dom'

const Sidebar = ({ sidebar, setSidebar }) => {
    if (!sidebar) return null;
  
    return (
      <div
        className='z-30 fixed w-full h-full bg-black/40 '
        onClick={() => setSidebar(false)}
      >
        <div
          className='fixed z-40 right-0 p-3 bg-white w-[200px] h-full'
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <i
              onClick={() => setSidebar(false)}
              className="px-2 fa-solid fa-square-xmark cursor-pointer hover:text-red-700 duration-300 ease"
            ></i>
          </div>
          <div className="flex flex-col gap-4 mt-7">
            <Link to="/" className='ease duration-300 rounded font-bold sm:text-[16px] text-[13px] p-2 hover:bg-amber-100 hover:text-black'><i className="fa-solid fa-house"></i> Home</Link>
            <Link to="/pokedex" className='ease duration-300 rounded font-bold sm:text-[16px] text-[13px] p-2 hover:bg-amber-100 hover:text-black'><i className="fa-solid fa-book"></i> Pokedex</Link>
            <Link to="/team" className='ease duration-300 rounded font-bold sm:text-[16px] text-[13px] p-2 hover:bg-amber-100 hover:text-black'><i className="fa-solid fa-paw"></i> Team</Link>
            <Link to="/battle" className='ease duration-300 rounded font-bold sm:text-[16px] text-[13px] p-2 hover:bg-amber-100 hover:text-black'><i className="fa-solid fa-khanda"></i> Battle</Link>
            <Link to="/history" className='ease duration-300 rounded font-bold sm:text-[16px] text-[13px] p-2 hover:bg-amber-100 hover:text-black'><i className="fa-solid fa-clock-rotate-left"></i> History</Link>
          </div>
        </div>
      </div>
    );
  };
  

export default Sidebar