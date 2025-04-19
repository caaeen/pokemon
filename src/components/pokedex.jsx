import {React, useState, useEffect} from 'react'
import Header from './header.jsx'
import PokeList from './pokeList.jsx'
import '../index.css'
import Wallpaper from '../assets/images/pokemon-wallpaper.png'
import Axios from 'axios'

const Pokedex = () => {
  
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    
    Axios.get(currentPageUrl, {
      cancelToken: new Axios.CancelToken(c => cancel = c)
    }).then((res) => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
  
      return Promise.all(res.data.results.map(p => Axios.get(p.url)));
    }).then(pokemonResponses => {
      setPokemon(pokemonResponses.map(p => p.data));
      setLoading(false);
    });
  
    return () => cancel();
  }, [currentPageUrl]);
  
  
    if(loading){return "Loading..."}

    function goToPrevPage(){
        setCurrentPageUrl(prevPageUrl);
    }

    function goToNextPage(){
        setCurrentPage(nextPageUrl);
    }


    return (
        <div className='pokedex w-full min-h-svh'>
            <Header/>
            <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
            <div className="p-4 relative w-full h-full flex justify-end items-center">
                <span className='bg-white border rounded-[5px] sm:mr-10 '>
                  <input  type="text" placeholder='Search' className='bg-transparent px-2 py-1 sm:w-[150px] w-[120px]  outline-none'/>
                  <i className="fa-solid fa-magnifying-glass text-black/40 ml-1 bg-transparent ease duration-300 hover:text-white p-1 rounded-[5px] cursor-pointer"></i>
                </span>
            </div>

            <PokeList pokemon={pokemon}/>
        </div>
    )
}

export default Pokedex