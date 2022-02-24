import $ from "jquery";

chrome.storage.sync.get('blocked_modules', (res) => {
    if(res.blocked_modules){
        for(const m of res.blocked_modules.modules){
            $(`a[title="${m}"]`).css({
                display: "none",
            });
            console.log(m);
        }
    }
})
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    switch(msg.command){
        case "GET_TABS":
            sendResponse({
                modules: getTabs(),
            })
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