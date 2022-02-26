import React from "react";
import styles from "./styles.module.css";
import { goBack } from "react-chrome-extension-router";

type TopBarProps = {
    title: string
    back: boolean
}

function TopBar(props : TopBarProps) {
    return (
        <div className={styles.flex}>
            <div className={styles.backBtn} onClick={ props.back ? goBack : () => {} }>
                <img src={`./img/${ props.back ? "back-button-svgrepo-com.svg" : "home-svgrepo-com.svg"}`} className={styles.backImg}></img>
            </div>
            <div className={styles.title}>{props.title}</div>
        </div>
    )
}

export default TopBar;