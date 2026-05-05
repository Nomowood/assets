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
    // ...（ここは前のカレンダー処理をそのまま貼ってください）
    // 省略せず、以前送ったgenerateCalendar関数全体をここに貼り付けてください
}
