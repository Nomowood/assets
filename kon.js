<script>
// ヘッダーのスクロール固定
const header = document.getElementById('main-header');  
function handleScroll() {
if (window.scrollY > 60) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}}
window.addEventListener('scroll', handleScroll);
handleScroll();

// 動く吹き出し
document.addEventListener("DOMContentLoaded", () => {
const targets = document.querySelectorAll(".inview_re");
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("is-show");
} else {
entry.target.classList.remove("is-show");
}
});}, {
threshold: 0.2
});
targets.forEach(el => observer.observe(el));
});
    
// シェアボタン
const btn = document.getElementById('shareBtn');
let isOpen = false;
// クリックで開閉
btn.addEventListener('click', function(e) {
// アイコンクリック時は閉じない
 if (e.target.tagName === 'I' || e.target.closest('a')) {
return;
}
isOpen = !isOpen;
if (isOpen) {
btn.classList.add('active');
} else {
btn.classList.remove('active');
}
});
// URL設定
const url = encodeURIComponent(location.href);
const text = encodeURIComponent(document.title + "\n" + location.href);
document.getElementById("x-link").href = "https://twitter.com/intent/tweet?text=" + text + "&amp;url=" + url;
document.getElementById("line-link").href = "https://social-plugins.line.me/lineit/share?url=" + url;
document.getElementById("threads-link").href = "https://www.threads.net/intent/post?text=" + text;
document.getElementById("reddit-link").href = "https://www.reddit.com/submit?url=" + url;
document.getElementById("sms-link").href = "sms:?body=" + text;
// 機能
function nativeShare() {
if (navigator.share) {
navigator.share({ title: document.title, text: document.title, url: location.href });
} else {
alert("この端末では使えません");
}}
function copyLink() {   navigator.clipboard.writeText(location.href).then(() => {alert("URLのリンクをコピーしました");});
}

// 


  </script>
