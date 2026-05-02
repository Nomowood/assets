<script type='text/javascript'>
//<![CDATA[
console.log("=== JS LOADED ===");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded fired");
    console.log("Found .item-data:", document.querySelectorAll('.item-data').length);
    
    // テスト：.item-dataが見つかったら目立つ表示
    document.querySelectorAll('.item-data').forEach((el, i) => {
        console.log(`.item-data ${i} found`);
        el.style.border = "5px solid red";
        el.style.background = "yellow";
        el.insertAdjacentHTML("afterend", `<p style="color:red; font-size:1.2em;">JSテスト成功 - ${i}</p>`);
    });

    // 本文の状態確認
    const postBody = document.querySelector('.post-body');
    if (postBody) {
        console.log("post-body found. InnerHTML length:", postBody.innerHTML.length);
    }
});

// 5秒後に強制実行（タイミング問題対策）
setTimeout(() => {
    console.log("5秒後強制実行");
    document.querySelectorAll('.item-data').forEach(el => {
        el.style.border = "5px solid blue";
    });
}, 5000);
//]]>
</script>
