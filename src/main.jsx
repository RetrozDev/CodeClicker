import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Settings from './pages/Settings.jsx'
import "./styles/root.css"
import "nes.css/css/nes.min.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/game", element: <Game /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
