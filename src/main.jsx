import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Pokedex from './components/pokedex.jsx'
import Pokemon from './components/pokemon.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

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
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
