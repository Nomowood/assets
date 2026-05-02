console.log("script.js - 最小テスト版");

document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js DOMContentLoaded");
    
    // ページ全体に目立つ印を付ける
    const marker = document.createElement('div');
    marker.textContent = "✅ JSが動いています";
    marker.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:red;color:white;padding:20px;font-size:20px;z-index:99999;border:5px solid yellow;';
    document.body.appendChild(marker);
});
