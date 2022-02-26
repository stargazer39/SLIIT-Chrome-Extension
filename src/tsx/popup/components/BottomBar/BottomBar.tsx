import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

function Bottombar() {
    const [text, setText] = useState(<span>For courseweb.sliit.lk by Dehemi Weerakkody.</span>);

    const onHover = () => {
        setText(<span>For courseweb.sliit.lk by Dehemi Weerakkody.<br></br>Copyright © Dehemi Weerakkody</span>);
    }

    const onMouseOut = () => {
        setText(<span>For courseweb.sliit.lk by Dehemi Weerakkody.</span>);
    }
    return (
        <div onMouseOver={onHover} onMouseOut={onMouseOut} className={styles.BottomBar}>
            {text}
        </div>
    )
}

export default Bottombar;