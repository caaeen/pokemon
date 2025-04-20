import {React, useState} from 'react'
import PokemonLogo from '../assets/icon/pokemon-logo.png'
import PokeBall from '../assets/icon/pokeball.svg'
import {Link} from 'react-router-dom'
import Sidebar from './sidebar.jsx'
const Header = () => {
  const [sidebar, setSideBar] = useState(false);
  return (<>
    <Sidebar sidebar={sidebar} setSidebar={setSideBar} />

    <nav className='relative w-full h-[90px]'>
        <div className="backdrop-blur-sm bg-white/10 fixed w-[100vw] h-[80px] flex justify-between items-center sm:px-10 pt-2 px-5 z-10">
            <img src={PokemonLogo} alt="" className=' sm:w-[200px] w-[150px] ' />
            <div className='flex items-center sm:gap-5 gap-4'>
              <span className="hidden md:inline"><Link to="/" className='hover:text-yellow-900 ease duration-300 font-bold sm:text-[16px] text-[13px]'><i className="fa-solid fa-house"></i> Home</Link></span>
              <span className="hidden md:inline"><Link to="/pokedex" className='hover:text-yellow-900 ease duration-300 font-bold  sm:text-[16px] text-[13px]'><i className="fa-solid fa-book"></i> Pokedex</Link></span>
              <span className="hidden md:inline"><Link to="/team" className='hover:text-yellow-900 ease duration-300 rounded  font-bold sm:text-[16px] text-[13px]  '><i className="fa-solid fa-paw"></i> Team</Link></span>
              <span className="hidden md:inline"><Link to="/battle" className='hover:text-yellow-900  ease duration-300 rounded  font-bold sm:text-[16px] text-[13px] '><i className="fa-solid fa-khanda"></i> Battle</Link></span>
              <span className="hidden md:inline"><Link to="/history" className='hover:text-yellow-900  ease duration-300 rounded  font-bold sm:text-[16px] text-[13px] '><i className="fa-solid fa-clock-rotate-left"></i> History</Link></span>
              <b className="inline md:hidden"><i onClick={() => setSideBar(true)} className=" fa-solid fa-bars  pr-5 text-bold text-[18px] cursor-pointer hover:text-yellow-900 ease duration-300 font-bold sm:text-[16px] "></i></b>
            </div>

        </div>
    </nav>
    
    </>)
}


{/*<span className='bg-white/40 p-1 rounded-[5px]'>
                <input type="text" placeholder='Search' className='bg-transparent px-2 py-1 sm:w-[150px] w-[120px]  outline-none'/>
                <i class="fa-solid fa-magnifying-glass text-black/40 ml-1 bg-transparent ease duration-300 hover:text-white p-1 rounded-[5px] cursor-pointer"></i>
              </span>*/}
export default Header