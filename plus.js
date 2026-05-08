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

// 1-3. 動く吹き出し
observer = new IntersectionObserver((entries, obs) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("is-show");
obs.unobserve(entry.target);
}
});
}, { threshold: 0.2 });
// 静的HTML
observeInviewElements();
// 動的HTML生成
renderPokedexItems();

// 1-4. シェアボタン・リンク設定
setupShareButtons();

});

// ここから違うスクリプト

// 2-1. シェアボタン
function setupShareButtons() {
const btn = document.getElementById('shareBtn');
if (!btn) return;
let isOpen = false;
btn.addEventListener('click', (e) => {
if (e.target.tagName === 'I' || e.target.closest('a')) return;
isOpen = !isOpen;
btn.classList.toggle('active', isOpen);
});
const url = encodeURIComponent(location.href);
const text = encodeURIComponent(document.title + "\n" + location.href);
const links = {
    "x-link": `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "line-link": `https://social-plugins.line.me/lineit/share?url=${url}`,
    "threads-link": `https://www.threads.net/intent/post?text=${text}`,
    "reddit-link": `https://www.reddit.com/submit?url=${url}`,
    "sms-link": `sms:?body=${text}`
};
for (const [id, href] of Object.entries(links)) {
    const el = document.getElementById(id);
    if (el) el.href = href;
}}

// ここから違うスクリプト
