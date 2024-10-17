import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RecoilRoot} from "recoil";
import AuthObserver from "./recoil/authObserver.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <AuthObserver />
            <App />
        </RecoilRoot>
    </React.StrictMode>,
)