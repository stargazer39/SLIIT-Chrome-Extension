import React from "react";
import { useEffect, useState } from "react";
import ModuleDisplay from "../ModuleDisplay/ModuleDisplay";
import TopBar from "../TopBar/TopBar";
import styles from "./styles.module.css"

function ModulesManager(){
    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {
        (async function() {
            // Get current sites from the site
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            if(!tab.id)
                throw new Error("No tab id");
            
            chrome.tabs.sendMessage(tab.id, {
                command: "GET_TABS",
            },(resp) => {
                let new_modules : Module[] = resp.modules.map((val : string) => {
                    return { active: false, title: val }
                })

                 // Get old preference form chrome.storage
                chrome.storage.sync.get('blocked_modules', (res) => {
                    if(!res.blocked_modules){
                        chrome.storage.sync.set({ 'blocked_modules': {
                            modules: [],
                        }})
                        console.log(res, "Reset");
                        setModules(new_modules);
                        return;
                    }
                    console.log(res);
                    const mod = res.blocked_modules.modules as string[];
                    const modmap = new Map<string, boolean>();

                    mod.forEach((val) => { modmap.set(val, true);});
                    console.log(modmap)
                    if(mod){
                        let enabled : Module[] = [];
                        let disabled : Module[] = [];

                        new_modules.forEach(element => {
                            if(modmap.has(element.title)){
                                element.active = true;
                                
                                enabled.push(element);
                                return;
                            }
                            disabled.push(element);
                        });
                        
                        setModules([...enabled, ...disabled]);
                    }
                });
            });
        })()
    }, []);

    return (
        <>
            <TopBar back={true} title="Modules"/>
            <div className={styles.ModuleManager}>
                {
                    modules.map((value, index) => {
                        return <ModuleDisplay module={value} key={index}/>
                    })
                }
            </div>
        </>
    )
}

export default ModulesManager;