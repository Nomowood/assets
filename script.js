<script>
  //<![CDATA[
     // 投稿の簡易化（安全版）
document.addEventListener("DOMContentLoaded", () => {
    console.log("item-data処理開始");

    document.querySelectorAll('.item-data').forEach(el => {
        if (el.dataset.processed) return;
        el.dataset.processed = "true";

        try {
            // ここにあなたの元の長いコード（name, dir, img, starHTML, getHTML など全部）をそのまま入れる
            // ...（省略）...

            // 最後の挿入部分だけ安全に変更
            const newHTML = `...あなたの長いHTML文字列...`;   // 元の insertAdjacentHTML の中身

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHTML;
            
            // afterend の代わりに安全に挿入
            if (el.nextSibling) {
                el.parentNode.insertBefore(tempDiv, el.nextSibling);
            } else {
                el.parentNode.appendChild(tempDiv);
            }

        } catch(e) {
            console.error("item-data処理エラー", e);
        }
    });
});
//]]>
