console.log("Youtube Controller started!");

let videoHandled = false;
let tries = 0;
const MAX_TRIES = 20;   
let videoElem = null;



function setPlaybackSpeed() {
        
    if (videoHandled) return;
    const interval = setInterval(()=>{
        const video = document.querySelector("video");

        if (video) {
            clearInterval(interval);
            video.playbackRate = 2.0;
            video.volume = 0.3;
            videoHandled = true;
            videoElem = video;
            console.log("Video found and configured");

            chrome.runtime.sendMessage({type: "GET_START_TIME"},(response)=>{
                if (response?.value && videoElem){
                    videoElem.currentTime = parseInt(response.value,10);
                    console.log("Video skipped successfully");
                }
            })

        } else{
            console.log("Video not found yet, waiting...");
        }

        tries++;
        if (tries>MAX_TRIES){
            console.log("Maximum tries limit exceeded");
            clearInterval(interval);
        }
    },500)
}

if (!videoHandled){
    setPlaybackSpeed();
}

console.log("Injected into:", location.href);

