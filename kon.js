document.addEventListener("DOMContentLoaded", function() {
    alert("JSは読み込まれました");   // ← これが出るか確認

    // シェアボタン確認
    const btn = document.getElementById('btn_wrap');
    if (btn) {
        alert("シェアボタン(btn_wrap)が見つかりました");
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            if (e.target.tagName === 'I' || e.target.closest('a')) return;
            isOpen = !isOpen;
            btn.classList.toggle('active', isOpen);
        });
    } else {
        alert("シェアボタン(btn_wrap)が見つかりません");
    }

    // カレンダー確認
    const monthEl = document.getElementById('calendar-month-year');
    const bodyEl = document.getElementById('calendar-body');
    if (monthEl && bodyEl) {
        alert("カレンダー要素が見つかりました");
        // ここにカレンダー生成処理（前のコードと同じ）
        generateCalendar();
    } else {
        alert("カレンダー要素が見つかりません");
    }
});

function generateCalendar() {
    // 前の回答と同じカレンダー関数をここに貼り付けてください
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    document.getElementById('calendar-month-year').innerText = year + '年 ' + (month + 1) + '月';
    // ...（残りのカレンダー処理は前のコードと同じ）
}
