import React, {useState, useRef, useEffect} from "react";
import {exportComponentAsJPEG} from "react-component-export-image";

let getEl = (e) => document.querySelector(e);


export default function Form(){
    let [compo, setCompo] = useState({f: "", 
                                      s: "", 
                                      image: "https://i.imgflip.com/4t0m5.jpg"});
    let [myStyle, setMyStyle] = useState({f:{top:'0px', left: '0px'}, 
                                          s:{bottom:'0px', left: '0px'},
                                          font:{fontSize:'30px', color: "#ffffff"}});
    
    let [memesData, setMemeData] = useState({})                             

    const exportImage = useRef();

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setMemeData(data))
        console.log("ran")
    }, [])

    function randomMeme(e){
        e.preventDefault();
        let randNum = Math.floor(Math.random()*memesData.data.memes.length)
        let randMeme = memesData.data.memes[randNum];
        if(randMeme.box_count == 2){
            setCompo({f: "", 
                      s: "", 
                      image: randMeme.url});
            setMyStyle({f:{top:'0px', left: '0px'}, 
                        s:{bottom:'0px', left: '0px'},
                        font:{fontSize:'30px', color: "#ffffff"}});
            
        }else{
            randomMeme(e);
        }
    }

    function setTexts(e){
        let {id, value} = e.target;
        setCompo(prev => (id === "f-txt" ? {...prev, f: value.toString()} : {...prev, s: value.toString()}))
    }

    function dragText(e){
        let {id} = e.target;
        let resultDiv = getEl("#result-edit-export").getBoundingClientRect();
        let leftvar = Math.floor(e.clientX)-Math.floor(resultDiv.left);
        let topvar = Math.floor(e.clientY)-Math.floor(resultDiv.top);
        setMyStyle(prev => (id === "f-text-cap" ? {...prev, f:{top: topvar, left: leftvar}}
            : {...prev, s:{top: topvar, left: leftvar}}))
    }

    function changeFontText(e){
        let {value} = e.target
        setMyStyle(prev => ({...prev, font:{color:prev.font.color, fontSize: `${value}px`}}))
    }

    function changeColor(e){
        let {value} = e.target
        setMyStyle(prev => ({...prev, font:{color: value.toString(), fontSize: prev.font.fontSize}}))
    }


    return (
    <main>
        <form id="meme-form">
            <button id="submit" onClick={randomMeme}>Get a random new meme image &#128248;</button>
            <input id="f-txt" 
                    onChange={setTexts} 
                    className="textbox" 
                    type="text" 
                    value={compo.f}
                    placeholder="1st text here"/>
            <input id="s-txt" 
                    onChange={setTexts} 
                    className="textbox" 
                    type="text" 
                    value={compo.s}
                    placeholder="2nd text here"/>
            <div className="color-box">
                <span>Font Color: </span>
                <input id="give-color" type="color" value={myStyle.font.color} onChange={changeColor}/>
            </div>
            <div className="font-size-box">
                <span>Font Size:</span>
                <input type="number" id="font-size" value={myStyle.font.fontSize.slice(0,-2)} onChange={changeFontText}/>
            </div>
        </form>
        <hr/>
        
        <React.Fragment>
        <div id="result-edit-export" ref={exportImage}>
            <span 
                id="f-text-cap" 
                draggable="true" 
                style={{...myStyle.f, ...myStyle.font}}
                onDrag={dragText} 
                onDragEnd={dragText}>{compo.f}</span>
            <span 
                id="s-text-cap" 
                draggable="true" 
                style={{...myStyle.s, ...myStyle.font}} 
                onDrag={dragText} 
                onDragEnd={dragText}>{compo.s}</span>
            <img id="result-img" src={compo.image} alt="results will go here"/>
        </div>
            <button id="exportbtn" onClick={() => exportComponentAsJPEG(exportImage)}>Export as Image</button>
        </React.Fragment>
    </main>
    )
} 