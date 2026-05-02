// デバッグ用超簡易版
console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded in script.js");

    // .item-data の処理を完全に無効化
    document.querySelectorAll('.item-data').forEach(el => {
        el.style.border = "4px solid lime";
        el.style.background = "rgba(0,255,0,0.1)";
        console.log("item-data found and highlighted");
    });

    // 他の処理も一旦停止
});
