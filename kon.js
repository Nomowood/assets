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
const btn = document.getElementById('.btn_wrap');
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

// カレンダー
const calendarEvents = {
// 期間イベント（開始日, 終了日, クラス名, ラベル）
ranges: [{ start: '2026-04-01', end: '2026-04-05', class: 'event-period', label: '期間限定イベント' }],
// 特定の日（発売日など）
points: [{ date: '2026-04-20', class: 'release-day', label: '新刊発売日' }]
};

function generateCalendar() {
          const now = new Date(); // 2026年に実行中と想定
          const year = now.getFullYear();
          const month = now.getMonth();
          document.getElementById('calendar-month-year').innerText = year + '年 ' + (month + 1) + '月';
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const calendarBody = document.getElementById('calendar-body');
          calendarBody.innerHTML = '';
          let date = 1;
          for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
              let cell = document.createElement('td');
              if (i === 0 && j < firstDay) {
                cell.innerText = '';
              } else if (date > daysInMonth) {
                break;
              } else {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                cell.innerText = date;
                
// 期間イベントの判定
                calendarEvents.ranges.forEach(range => {
                  if (dateStr >= range.start && dateStr <= range.end) {
                    cell.classList.add(range.class);
                    cell.title = range.label;
                  }
                });

// 特定日の判定
                calendarEvents.points.forEach(point => {
                  if (dateStr === point.date) {
                    cell.classList.add(point.class);
                    cell.title = point.label;
                  }
                });
                date++;
              }
              row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (date > daysInMonth) break;
          }
        }
        generateCalendar();


  </script>
