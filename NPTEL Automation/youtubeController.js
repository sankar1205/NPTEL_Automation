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
            video.playbackRate = 2.0;
            videoHandled = true;
            videoElem = video;
            videoElem.volume = 0.1;
            console.log("Extension volume:", videoElem.volume);
            // videoElem.muted = true;
            // videoElem.volume = 0.9;
            console.log("Video found and configured");
            videoElem.currentTime = 5;
            console.log("Intro skipped successfully");
            
            const playButton = document.querySelector('[aria-label="Play video"]');
            try{
                if (playButton){
                    playButton.click();
                    console.log("Paused:", videoElem.paused);
                    const fullscreenButton = document.querySelector('[aria-label="Enter full screen"]');
                    if (fullscreenButton){
                        fullscreenButton.click();
                        console.log("Fullscreen enabled");
                    }
                    console.log("Video started playing");
                }
                else{
                    console.log("Play button not found");
                }
            }
            catch(error){
                console.log("Autoplay error: ",error);
            }

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