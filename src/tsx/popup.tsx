import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

const PopupHome = () => {
    const [bgColor, setBgColor] = useState<string>('red');

    useEffect(() => {
        // Get old preference form chrome.storage
        chrome.storage.sync.get(['bgColor'], (res) => {
            setBgColor(res.bgColor);
        });
    });

    const changeBodyBg = () => {
        document.body.style.backgroundColor = bgColor;
        console.log(bgColor);
    }

    const changeBackground = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(`Tab ID ${tab.id} ${bgColor}`);

        chrome.tabs.sendMessage(tab.id!, {
            bgColor: bgColor
        });
    }

    return (
        <>
            <h1> DOM renders </h1>
            <div>Current bgcolor is {bgColor}</div>
            <input type="button" onClick={changeBackground} value="Change Bg"></input>
        </>
    )
}

ReactDOM.render(
    <PopupHome/>,
    document.getElementById('root')
)