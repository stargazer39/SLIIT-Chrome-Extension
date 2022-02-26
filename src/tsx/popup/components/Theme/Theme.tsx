import React from "react";
import styles from "./styles.module.css";
import { Theme as ThemeType } from "../../../themes";
import Button from "../Button/Button";

type ThemeProps = {
    id: string,
    theme: ThemeType
}

function Theme(props : ThemeProps){
    const changeTheme = async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if(!tab.id)
            throw new Error("No tab id");
        
        chrome.tabs.sendMessage(tab.id, {
            command: "SET_THEME",
            theme: props.id
        })

        chrome.storage.sync.set({ 'active_theme': props.id });
    }

    return (
        <div className={styles.Theme}>
            <span>Theme {props.theme.name}</span>
            <div className="spacer"></div>
            <Button onClick={changeTheme} name={"change"} />
        </div>
    )
}

export default Theme;