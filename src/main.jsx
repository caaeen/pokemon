import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Pokedex from './components/pokedex.jsx'
import Pokemon from './components/pokemon.jsx'
import History from './components/history.jsx'
import Team from './components/team.jsx'
import Battle from './components/battle.jsx'
import Pvp from './components/pvp.jsx'
import Ready from './components/util/ready.jsx'
import Result from './components/util/result.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

//Generate Player Id
const generatePlayerId = () => {
  let playerId = localStorage.getItem('playerId');
  if (!playerId) {
    playerId = 'player-' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('playerId', playerId);
  }
  console.log(playerId);
};

generatePlayerId();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/pokedex",
    element: <Pokedex/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/pokemon/:id",
    element: <Pokemon/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/team",
    element: <Team/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/battle",
    element: <Battle/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/pokedex/:bid",
    element: <Pokedex/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/pvp",
    element: <Pvp/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/ready",
    element: <Ready/>,
    elementError: <div>Error 404</div>,
  },{
    path: "/result", 
    element: <Result />,
    errorElement: <div>Error 404</div>,
  },{
    path: "/history", 
    element: <History />,
    errorElement: <div>Error 404</div>,
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
