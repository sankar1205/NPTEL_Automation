//youtubeController.js

console.log("Youtube Controller started!");

let videoHandled = false;
let tries = 0;
const MAX_TRIES = 20;   
let videoElem = null;

function setPlaybackSpeed() {
        
    if (videoHandled) return;
    const interval = setInterval(()=>{
        let video = document.querySelector("video");
        
        if (video) {
            clearInterval(interval);
            videoHandled = true;
            videoElem = video;
            chrome.storage.local.get({playbackSpeed : 1.0},(result)=>{
                const newSpeed = result.playbackSpeed;
                videoElem.playbackRate = newSpeed;
                console.log("Video playback speed set to: ",newSpeed);
            })
            chrome.storage.local.get({skipTime : 0},(result)=>{
                const newSkip = result.skipTime;
                videoElem.currentTime = newSkip;
                console.log("Video skipped to: ",newSkip);
            })
            // videoElem.muted = true;
            // videoElem.volume = 0.9;
            console.log("Video found and configured");
            nextVideo(videoElem);
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

function nextVideo(videoElem){
    videoElem.addEventListener('ended',()=>{
        chrome.runtime.sendMessage({
            type:"VIDEO_ENDED",
        });
    })
}

console.log("Injected into:", location.href);