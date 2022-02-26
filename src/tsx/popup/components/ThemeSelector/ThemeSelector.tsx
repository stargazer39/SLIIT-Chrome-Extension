import React from "react";
import { getTheme, listThemes } from "../../../themes";
import Theme from "../Theme/Theme";
import TopBar from "../TopBar/TopBar";
import styles from "./styles.module.css";

function ThemeSelecter() {
    return (
        <>
            <TopBar back={true} title="Themes"/>
            <div className={styles.ThemeSelector}>
                {
                    (() => {
                        const elems = [];
                        for(const key in listThemes()){
                            elems.push(<Theme id={key} key={key} theme={getTheme(key)}/>)
                        }
                        elems.push(<Theme id={"custom"} key={"custom"} theme={getTheme("custom")}/>)
                        return elems;
                    })()
                }
            </div>
        </>
    )
}

export default ThemeSelecter;