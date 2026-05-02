console.log("script.js - FINAL TEST");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded in script.js");

    // ページ全体を赤くして目立つ
    document.body.style.border = "8px solid red";
    
    setTimeout(() => {
        const items = document.querySelectorAll('.item-data');
        console.log(`.item-data 見つかった数: ${items.length}`);
        
        items.forEach((el, i) => {
            el.style.border = "6px solid lime";
            el.style.background = "yellow";
        });
    }, 1500);
});
