import React from "react";
import { Link } from "react-chrome-extension-router";
import ModulesManager from "../ModuleManager/ModuleManager";
import ThemeSelecter from "../ThemeSelector/ThemeSelector";
import TopBar from "../TopBar/TopBar";
import styles from "./styles.module.css";

function Home() {
    return (
        <>
            <TopBar back={false} title="Home"/>
            <div className={styles.options}>
                <Link component={ModulesManager}>
                    <button className={styles.btn}>Modules</button>
                </Link><br></br>
                <Link component={ThemeSelecter}>
                    <button className={styles.btn}>Themes</button>
                </Link>
            </div>
        </>
    )
}

export default Home;