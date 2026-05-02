document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded. Found .item-data:", document.querySelectorAll('.item-data').length);
  
  document.querySelectorAll('.item-data').forEach((el, index) => {
    console.log(`Processing item-data ${index}`);
    // 処理を最小限に
    el.style.border = "3px solid red";   // テスト用
    el.insertAdjacentHTML("afterend", "<p style='color:green'>JS処理完了</p>");
  });
});
