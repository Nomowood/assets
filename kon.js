document.addEventListener("DOMContentLoaded", function() {

    // ヘッダースクロール
    const header = document.getElementById('main-header');
    if (header) {
        const handleScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 吹き出し（IntersectionObserver）
    const targets = document.querySelectorAll(".inview_re");
    if (targets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.target.classList.toggle("is-show", entry.isIntersecting));
        }, { threshold: 0.2 });
        targets.forEach(el => observer.observe(el));
    }

    // シェアボタンの開閉
    const btn = document.getElementById('shareBtn');
    if (btn) {
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            if (e.target.closest('a') || e.target.closest('.share_item') || e.target.tagName === 'I' || e.target.closest('i') || e.target.classList.contains('share_label')) return;
            e.stopPropagation();
            isOpen = !isOpen;
            btn.classList.toggle('active', isOpen);
        });
    }

    // シェアリンクの設定
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title + "\n" + location.href);
    const linkIds = ["x-link","line-link","threads-link","reddit-link","sms-link"];
    linkIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === "x-link") el.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            if (id === "line-link") el.href = `https://social-plugins.line.me/lineit/share?url=${url}`;
            if (id === "threads-link") el.href = `https://www.threads.net/intent/post?text=${text}`;
            if (id === "reddit-link") el.href = `https://www.reddit.com/submit?url=${url}`;
            if (id === "sms-link") el.href = `sms:?body=${text}`;
        }
    });

    // ==================== カレンダー ====================
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    function generateCalendar(year, month) {
        const monthYearEl = document.getElementById('calendar-month-year');
        const calendarBody = document.getElementById('calendar-body');
        if (!monthYearEl || !calendarBody) return;

        monthYearEl.innerText = `${year}年 ${month + 1}月`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarBody.innerHTML = '';

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            let hasDate = false;

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                cell.className = 'calendar-cell';

                if ((i === 0 && j < firstDay) || date > daysInMonth) {
                    cell.innerHTML = '<div class="date-number"></div>';
                } else {
                    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
                    const dateNum = document.createElement('div');
                    dateNum.className = 'date-number';
                    dateNum.textContent = date;
                    cell.appendChild(dateNum);
                    cell.dataset.date = dateStr;
                    
                    // 単発イベントのみセル内に描画（期間バーはrenderEventBarsで描画）
                    addPointsToCell(cell, dateStr);
                    
                    date++;
                    hasDate = true;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (date > daysInMonth && !hasDate) break; // 余分な空行を作らない
        }
        // カレンダー描画後にバーを再計算
        setTimeout(() => renderEventBars(), 10); 
    }

    // 単発イベント用
    function addPointsToCell(cell, dateStr) {
        calendarEvents.points.forEach(point => {
            if (dateStr === point.date) {
                const bar = document.createElement('div');
                bar.className = `event-bar ${point.class}`;
                bar.textContent = point.label;
                cell.appendChild(bar);
            }
        });
    }

    // 期間イベント（絶対配置バー）の描画
    function renderEventBars() {
        const layer = document.getElementById("event-layer");
        const wrapper = document.getElementById('calendar-wrapper');
        if (!layer || !wrapper) return;
        
        layer.innerHTML = "";
        const wrapperRect = wrapper.getBoundingClientRect();

        calendarEvents.ranges.forEach(range => {
            const startCell = document.querySelector(`[data-date="${range.start}"]`);
            const endCell = document.querySelector(`[data-date="${range.end}"]`);
            
            // 今の月に表示されている範囲だけ描画
            if (!startCell && !endCell) return;

            // 月を跨ぐ場合の考慮（簡易版）
            const sRect = startCell ? startCell.getBoundingClientRect() : null;
            const eRect = endCell ? endCell.getBoundingClientRect() : null;

            if (startCell && endCell) {
                const bar = document.createElement("div");
                bar.className = "event-bar-absolute " + range.class;
                bar.textContent = range.label;
                bar.style.left = (sRect.left - wrapperRect.left) + "px";
                bar.style.top = (sRect.top - wrapperRect.top + 35) + "px";
                bar.style.width = (eRect.right - sRect.left - 8) + "px";
                layer.appendChild(bar);
            }
        });
    }

    // 月送りボタン
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            generateCalendar(currentYear, currentMonth);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            generateCalendar(currentYear, currentMonth);
        });
    }

    // 初期表示
    generateCalendar(currentYear, currentMonth);

}); // ここでDOMContentLoadedを閉じる

// イベントデータ
const calendarEvents = {
    ranges: [
        { start: '2026-05-09', end: '2026-05-13', class: 'event-period', label: 'chouchou' }
    ],
    points: [
        { date: '2026-05-25', class: 'release-day', label: '新刊' }
    ]
};
