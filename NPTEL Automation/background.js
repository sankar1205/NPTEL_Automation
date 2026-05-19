let latestSkipTime = null;

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
    if (msg.type==="SET_START_TIME"){
        latestSkipTime = msg.value;
        console.log(sender);
    }
    if (msg.type==="GET_START_TIME"){
        sendResponse({value : latestSkipTime});
        console.log(sender);
    }
    return true;
})