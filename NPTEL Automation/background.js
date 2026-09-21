// background.js

chrome.runtime.onMessage.addListener((msg,sender)=>{
    if (msg.type==="VIDEO_ENDED"){
        chrome.tabs.sendMessage(
            sender.tab.id,
            {type: "VIDEO_ENDED"}
        )
        console.log(sender);
    }
})