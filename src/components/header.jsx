import React from 'react'
import PokemonLogo from '../assets/icon/pokemon-logo.png'
import PokeBall from '../assets/icon/pokeball.svg'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <nav className='relative w-full h-[90px]'>
        <div className="backdrop-blur-sm bg-white/10 fixed w-[100vw] h-[80px] flex justify-between items-center sm:px-10 pt-2 px-5 z-10">
            <img src={PokemonLogo} alt="" className=' sm:w-[200px] w-[150px] ' />
            <div className='flex items-center sm:gap-5 gap-4'>
              <Link to="/" className='hover:text-yellow-900 ease duration-300 font-bold sm:text-[16px] text-[13px]'><i className="fa-solid fa-house"></i> Home</Link>
              <Link to="/pokedex" className='hover:text-yellow-900 ease duration-300 font-bold sm:text-[16px] text-[13px]'><i className="fa-solid fa-book"></i> Pokedex</Link>
            </div>

        </div>
    </nav>
  )
}


{/*<span className='bg-white/40 p-1 rounded-[5px]'>
                <input type="text" placeholder='Search' className='bg-transparent px-2 py-1 sm:w-[150px] w-[120px]  outline-none'/>
                <i class="fa-solid fa-magnifying-glass text-black/40 ml-1 bg-transparent ease duration-300 hover:text-white p-1 rounded-[5px] cursor-pointer"></i>
              </span>*/}
export default Header