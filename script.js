console.log("script.js loaded");

function waitForPostBody() {
    const body = document.querySelector('.post-body');
    if (body && body.innerHTML.trim() !== "") {
        console.log("post-body READY");
        document.body.style.border = "8px solid red";
    } else {
        console.log("waiting...");
        setTimeout(waitForPostBody, 200);
    }
}

waitForPostBody();
