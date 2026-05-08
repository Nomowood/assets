document.addEventListener("DOMContentLoaded", function() {
// 1-1. レイアウト調整（ローディング解除）
setTimeout(() => {
    document.body.classList.remove('loading');
}, 10);

// 1-2. スクロール処理（ヘッダーの固定・表示切り替え）
const header = document.getElementById('header');
if(header){
  let lastScroll = window.scrollY || 0;
  let ticking = false;
  function onScroll() {
    const current = window.scrollY || 0;
    header.classList.toggle('scrolled', current > 60);
    if (current > lastScroll && current > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = current;
    ticking = false;
  }
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();
}

});
