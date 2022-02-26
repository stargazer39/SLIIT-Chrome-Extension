import React from "react";
import { useState } from "react";

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
        <div className="mDisplay">
            <span>{props.module.title}</span>
            <span className='spacer'></span>
            <button onClick={toggleActive}>{active ? "Enable" : "Disable"}</button>
        </div>
    )
}

export default ModuleDisplay;