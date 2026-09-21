const speed = document.getElementById("speed");
const skip = document.getElementById("skip");

console.log("POPUP JS IS RUNNING");
console.log("Speed element:", speed);
console.log("Skip element:", skip);

chrome.storage.local.get({playbackSpeed : 1.0, skipTime : 0}, (result) => {
    console.log("Stored speed:", result);

    if (result.playbackSpeed !== undefined) {
        speed.value = result.playbackSpeed;
    }
    if (result.skipTime !== undefined) {
        skip.value = result.skipTime;
    }
});

speed.addEventListener("change", () => {
    const selectedSpeed = Number(speed.value);
    chrome.storage.local.set({
        playbackSpeed: selectedSpeed
    });
    console.log("Selected speed:", selectedSpeed);
});

skip.addEventListener("change", ()=>{
    const selectedSkip = Number(skip.value);
    chrome.storage.local.set({
        skipTime : selectedSkip
    });
    console.log("Selected skip time: ",selectedSkip);
})