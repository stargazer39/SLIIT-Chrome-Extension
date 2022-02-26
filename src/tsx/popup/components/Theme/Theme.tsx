import React from "react";
import themes from "../../../themes";

function Theme(props : Theme){
    const changeTheme = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if(!tab.id)
            throw new Error("No tab id");
        
        chrome.tabs.sendMessage(tab.id, {
            command: "SET_THEME",
            theme: themes[props.id]
        })

        chrome.storage.sync.set({ 'active_theme': themes[props.id] });
    }

    return (
        <div><span>Theme {props.id}</span><button onClick={changeTheme}>change</button></div>
    )
}

export default Theme;