console.log("script.js loaded - v5");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");

    // 遅延実行（本文が完全にロードされた後）
    setTimeout(() => {
        console.log("遅延処理開始");
        
        document.querySelectorAll('.item-data').forEach((el, i) => {
            console.log(`item-data ${i} 処理`);
            el.style.border = "5px solid red";
            el.style.background = "yellow";
        });
    }, 800); // 800ms遅らせる
});
