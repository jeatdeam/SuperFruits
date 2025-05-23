
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import {BrowserRouter} from "react-router-dom"
//
//
// createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//       <StrictMode>
//           <App />
//       </StrictMode>
//   </BrowserRouter>
//
// )
