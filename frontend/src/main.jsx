import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <AuthContextProvider>
    <SocketContextProvider>
					<App />
		</SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  </BrowserRouter>
)
