import React, {useState, useRef} from "react";
import MemeData from "./memesData.js";
import {exportComponentAsJPEG} from "react-component-export-image";

let getEl = (e) => document.querySelector(e);


export default function Form(){
    let [fText, setFText] = useState("first text go here");
    let [sText, setSText] = useState("second text go here");
    let [myfstyle, setMyfStyle] = useState({top:'0px', left: '0px'});
    let [mysstyle, setMySStyle] = useState({bottom:'0px', left: '0px'});
    const exportImage = useRef();

    function randomMeme(e){
        e.preventDefault();
        let randNum = Math.floor(Math.random()*MemeData.data.memes.length)
        let randMeme = MemeData.data.memes[randNum];
        if(randMeme.box_count == 2){
            getEl("#result-img").src = randMeme.url;
            setFText("first text goes here");
            setSText("second text goes here");
            setMyfStyle({top: 0, left: 0});
            setMySStyle({bottom: 0, left: 0});
        }else{
            randomMeme(e);
        }
    }

    function fTextkey(e){setFText(e.target.value)}
    function sTextkey(e){setSText(e.target.value)}
    function dragFText(e){
        let resultDiv = getEl("#result-edit-export").getBoundingClientRect();
        let leftvar = Math.floor(e.clientX)-Math.floor(resultDiv.left);
        let topvar = Math.floor(e.clientY)-Math.floor(resultDiv.top);
        setMyfStyle({top: topvar, left: leftvar});
    }
    function dragSText(e){
        let resultDiv = getEl("#result-edit-export").getBoundingClientRect();
        let leftvar = Math.floor(e.clientX)-Math.floor(resultDiv.left);
        let topvar = Math.floor(e.clientY)-Math.floor(resultDiv.top);
        setMySStyle({top: topvar, left: leftvar});
    }

    function changeFontText(e){
        getEl("#f-text-cap").style.fontSize = e.target.value+"px";
        getEl("#s-text-cap").style.fontSize = e.target.value+"px";
    }

    function changeColor(e){
        getEl("#f-text-cap").style.color = e.target.value.toString();
        getEl("#s-text-cap").style.color = e.target.value.toString();
        console.log(e.target.value.toString());
    }


    return (
    <main>
        <form id="meme-form">
            <button id="submit" onClick={randomMeme}>Get a random new meme image &#128248;</button>
            <input id="f-txt" onKeyUp={fTextkey} className="textbox" type="text" placeholder="1st text here"/>
            <input id="s-txt" onKeyUp={sTextkey} className="textbox" type="text" placeholder="2nd text here"/>
            <div className="color-box">
                <span>Font Color: </span>
                <input id="give-color" type="color" defaultValue="#ffffff" onChange={changeColor}/>
            </div>
            <div className="font-size-box">
                <span>Font Size:</span>
                <input type="number" id="font-size" defaultValue="30" onChange={changeFontText}/>
            </div>
        </form>
        <hr/>
        
        <React.Fragment>
        <div id="result-edit-export" ref={exportImage}>
            <span id="f-text-cap" draggable="true" style={myfstyle} onDrag={dragFText} onDragEnd={dragFText}>{fText}</span>
            <span id="s-text-cap" draggable="true" style={mysstyle} onDrag={dragSText} onDragEnd={dragSText}>{sText}</span>
            <img id="result-img" src="https://i.imgflip.com/4t0m5.jpg" alt="results will go here"/>
        </div>
            <button id="exportbtn" onClick={() => exportComponentAsJPEG(exportImage)}>Export as Image</button>
        </React.Fragment>
    </main>
    )
} 