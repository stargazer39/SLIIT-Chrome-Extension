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
            <div className={styles.backBtn} onClick={ props.back ? goBack : () => {} }></div>
            <h1 className={styles.title}>{props.title}</h1>
        </div>
    )
}

export default TopBar;