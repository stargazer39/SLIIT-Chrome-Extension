import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

type Module = {
    active: boolean,
    title: string
}

function PopupHome(){
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

                // setModules(new_modules);
                 // Get old preference form chrome.storage
                chrome.storage.sync.get('blocked_modules', (res) => {
                    if(!res.blocked_modules){
                        chrome.storage.sync.set({ 'blocked_modules': {
                            modules: [],
                        }})
                        console.log(res, "Reset");
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
            <h1>Modules</h1>
            <div>
                {
                    modules.map((value, index) => {
                        return <ModuleDisplay module={value} key={index}/>
                    })
                }
            </div>
        </>
    )
}

type ModulesProps = {
    module: Module
}

function ModuleDisplay(props : ModulesProps){
    const [active, setActive] = useState<boolean>(props.module.active);

    const toggleActive = () => {
       chrome.storage.sync.get('blocked_modules', (data) => {
            let idx = data.blocked_modules.modules.indexOf(props.module.title);
            let new_data : string[] = [];
            console.log(data);
            if(idx != -1){
                data.blocked_modules.modules.splice(idx, 1)
                
                chrome.storage.sync.set(data, () => {
                    setActive(false);
                });
            }else{
                new_data.push(...data.blocked_modules.modules, props.module.title);
                data.blocked_modules.modules = new_data;

                chrome.storage.sync.set(data, () => {
                    setActive(true);
                });
            }
       })
    }

    return (
        <div>
            {props.module.title} 
            <button onClick={toggleActive}>{active ? "Enable" : "Disable"}</button>
        </div>
    )
}

// async function sendToTab(obj : any){
    
// }
ReactDOM.render(
    <PopupHome/>,
    document.getElementById('root')
)