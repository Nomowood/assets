document.addEventListener("DOMContentLoaded", function() {
    alert("JSは読み込まれました");

    // === シェアボタン確認 ===
    const btn = document.getElementById('btn_wrap');
    if (btn) {
        alert("✅ btn_wrap が見つかりました");
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            if (e.target.tagName === 'I' || e.target.closest('a')) return;
            isOpen = !isOpen;
            btn.classList.toggle('active', isOpen);
        });
    } else {
        alert("❌ btn_wrap が見つかりません");
    }

    // 各シェアリンクの確認
    const links = ["x-link", "line-link", "threads-link", "reddit-link", "sms-link"];
    links.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            console.log(`✅ ${id} が見つかりました`);
        } else {
            alert(`❌ ${id} が見つかりません`);
        }
    });

    // === カレンダー確認 ===
    const monthEl = document.getElementById('calendar-month-year');
    const bodyEl = document.getElementById('calendar-body');

    if (monthEl && bodyEl) {
        alert("✅ カレンダー要素が見つかりました");
        generateCalendar();
    } else {
        alert(`❌ カレンダー要素が見つかりません\nmonth-year: ${!!monthEl}\nbody: ${!!bodyEl}`);
    }
});

function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const monthYearEl = document.getElementById('calendar-month-year');
    const calendarBody = document.getElementById('calendar-body');
    
    if (!monthYearEl || !calendarBody) return;

    monthYearEl.innerText = year + '年 ' + (month + 1) + '月';
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
}
