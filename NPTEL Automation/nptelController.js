console.log("NPTEL Controller started!");
console.log("Injected into:", location.href);

console.log("Calculating start time...");
const transcript = document.getElementById("video-transcript-div");
const transcript_div = transcript.querySelector('div[data-start-time]');
const startTime = transcript_div.dataset.startTime;
chrome.runtime.sendMessage(
    {type : "SET_START_TIME", value : startTime}
)
console.log("Start time sent successfully: ",startTime);
