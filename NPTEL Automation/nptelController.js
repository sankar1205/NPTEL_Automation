// nptelController.js

console.log("NPTEL Controller started!");
console.log("Injected into:", location.href);

chrome.runtime.onMessage.addListener((msg)=>{
    if (msg.type=="VIDEO_ENDED"){
        const nextButton = document.querySelector('[aria-label="Next lesson"]');
        if (nextButton){
            nextButton.click();
        } else {
            console.log("Button not found");
        }
        console.log("Moving to next video...");
    }
})


