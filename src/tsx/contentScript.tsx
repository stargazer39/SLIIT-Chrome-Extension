import $ from "jquery";
import { applyTheme, init } from "./themeChanger";

// Theme Logic
init();
chrome.storage.sync.get('active_theme', async (res) => {
    if(res.active_theme)
        await applyTheme(res.active_theme)
})

// Bolcked Modules logic
$(() => {
    chrome.storage.sync.get('blocked_modules', (res) => {
        if(res.blocked_modules){
            for(const m of res.blocked_modules.modules){
                hideModule(m);
            }
        }
    })
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    switch(msg.command){
        case "GET_TABS":
            sendResponse({
                modules: getTabs(),
            })
            break;
        case "SET_THEME":
            applyTheme(msg.theme);
            break;
    }
})

function getTabs(): string[]{
    const modules = $("a[title='My courses'] ~ ul > li a");

    const site_array : string[] = [];

    for(let m of modules){
        const title = $(m).attr("title"); 
        if(!title)
            continue
            
        site_array.push(title);   
    }

    return site_array;
}

function hideModule(mod : string){
    $(`a[title="${mod}"]`).css({
        display: "none",
    });
}