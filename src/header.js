import React from "react";
import logo from "./images/TrollFace.png"

export default function Header(){
    return (
        <header>
            <img src={logo} alt="logo"/>
            <h2>Meme Generator</h2>
            <p>Project 1</p>
        </header>
    )
} 