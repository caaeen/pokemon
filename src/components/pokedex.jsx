import {React, useState, useEffect} from 'react'
import Header from './header.jsx'
import PokeList from './pokeList.jsx'
import Pagination from './pagination.jsx'

import '../index.css'
import Wallpaper from '../assets/images/pokemon-wallpaper.png'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Pokedex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
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
  
      const promises = res.data.results.map(p =>
        Axios.get(p.url).then(resp => resp.data).catch(err => {
          if (err.response?.status === 404) {
  
            alert("error 404");
            return null; 
          }
          return null; 
        })
      );
  
      return Promise.all(promises);
    }).then(pokemonData => {
      const filtered = pokemonData.filter(p => p !== null);
      setPokemon(filtered);
      setLoading(false);
    }).catch(err => {
      if (Axios.isCancel(err)) return;
  
      setLoading(false);
    });
  
    return () => cancel?.();
  }, [currentPageUrl]);
  
  
  
  
  
    if(loading){return "Loading..."}

    function goToPrevPage(){
        setCurrentPageUrl(prevPageUrl);
    }

    function goToNextPage(){
        setCurrentPageUrl(nextPageUrl);
    }

    const searchPokemon = () => {
      if(searchTerm == ""){
        window.location.href="/pokedex";
        //hays
      }else{
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then((res) =>{ setSearchResult(res.data); console.log(res.data);})
        .catch((error) => {
          setSearchResult("");
          toast.error("Pokemon not found. Please enter valid input");
          if(error.response?.status === 404){
            return null;
          }
          
          
        });
      }
    };

    return (
        <div className='pokedex w-full min-h-svh'>
            
            <Header isOn={false}/>
            <ToastContainer />
            <img src={Wallpaper} alt="" className="opacity-60 fixed w-full h-full object-cover -z-10" />
            <div className="p-4 relative w-full h-full flex justify-end items-center">
                <span className='bg-white border rounded-[5px] sm:mr-10 '>
                  <input value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value);}} type="text" placeholder='Search' className='bg-transparent px-2 py-1 sm:w-[150px] w-[120px]  outline-none'/>
                  <i onClick={searchPokemon} className="fa-solid fa-magnifying-glass text-black/40 ml-1 bg-transparent ease duration-300 hover:text-black p-1 rounded-[5px] cursor-pointer"></i>
                </span>
            </div>

            <PokeList pokemon={pokemon} searchResult={searchResult}/>
            <Pagination goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage :null} searchResult={searchResult ? false : true}/>
        </div>
    )
}

export default Pokedex