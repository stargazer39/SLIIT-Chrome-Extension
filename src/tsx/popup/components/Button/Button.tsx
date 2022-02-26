import styles from "./styles.module.css";
import React, { MouseEventHandler } from "react";

type ButtonProps = {
    onClick: MouseEventHandler<HTMLElement>
    name: string
    active?: boolean
}

function Button(props : ButtonProps){
    return (
        <div className={(props.active) ? styles.Button : `${styles.Button} ${styles.notActive}`} onClick={props.onClick}>{props.name}</div>
    )
}

export default Button;