import React from 'react'
import '../index.css'
import Header from './header.jsx'
import Charizard from '../assets/images/charizard.png'
import Ash from '../assets/images/ash.jpg'
import PokeBall from '../assets/images/pokeball.gif'
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <>
    <div className='relative w-full min-h-[100vh] h-full border'>
        <div className="absolute  w-[60%] h-full bg-accent clip-diagonal  top-0 right-0 -z-1"></div>
        <Header/>
        <div className='flex sm:flex-row flex-col-reverse'>

          <div className='sm:w-1/2  flex flex-col items-center justify-center sm:p-10 p-5'>
            <b className='sm:text-5xl text-2xl'>Gotta Fight 'Em All</b>
            <br />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut autem consectetur tempore fugiat. A laborum ratione, culpa optio neque eveniet eligendi. Sit totam esse odit a odio non sint animi!</p>
            <br />
            <Link to='/pokedex' className='bg-black text-white py-2 px-4 rounded-[50px] cursor-pointer'>Pokedex</Link>

            <div className=' w-full h-[200px] mt-5 flex sm:flex-row flex-col-reverse gap-5'>
              <div className='sm:w-1/2 h-full flex-1 sm:-z-2 sm:flex hidden'>
                <img src={Ash} alt="" className='w-full rounded-[10px]  h-full object-contain'/>
              </div>
              <div className='sm:w-1/2 h-full flex-1 sm:-z-2 sm:flex hidden'>
                <img src={PokeBall} alt="" className='w-full rounded-[10px]  h-full object-contain'/>
              </div>
            </div>

          </div>

          <div className='sm:w-1/2 flex sm:justify-start items-center justify-center'>
            <img src={Charizard} className="w-[90%]" alt="" />
          </div>

        </div>
    </div>
    </>
  )
}

export default Hero