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

// カレンダー全体のスタイル
#calendar-container {
  font-family: sans-serif;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
#calendar-header {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
#calendar-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
#calendar-table th, #calendar-table td {
  text-align: center;
  padding: 5px 0;
  width: 14.28%;
}
// 期間イベントの枠線・背景（4/1〜4/5など
.event-period {
  background-color: #ffeb3b;
  color: #333;
  font-weight: bold;
  border-radius: 0;
}
// 発売日のマーク
.release-day {
  background-color: #ff5722;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
}
// 土日の色
#calendar-table th:first-child, #calendar-table td:first-child { color: red; }
#calendar-table th:last-child, #calendar-table td:last-child { color: blue; }

  </script>
