import React, { useState, ChangeEventHandler } from 'react';
import ReactDOM from 'react-dom'

const OptionsHome = () => {
    const [bgColor, setBgColor] = useState<string>('black');
    const [status, setStatus] = useState<string>('');

    const updateBgColor = () => {
        chrome.storage.sync.set({
            bgColor: bgColor
        },() => {
            setStatus(`Color Updated. ${bgColor}`);
        })
    }

    return (
        <>
            <h1> DOM renders </h1>
            <input type="text" placeholder="Enter Color" size={10}  onChange={(e) => { setBgColor(e.target.value)} }></input>
            <input type="button" onClick={updateBgColor} value="Set Color"></input>
            <div>{status}</div>
        </>
    )
}

ReactDOM.render(
    <OptionsHome/>,
    document.getElementById('root')
)