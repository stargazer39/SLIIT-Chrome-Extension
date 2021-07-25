chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.bgColor) {
        document.body.style.backgroundColor = msg.bgColor;
    }
})