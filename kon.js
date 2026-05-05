document.addEventListener("DOMContentLoaded", function() {

    // ヘッダースクロール
    const header = document.getElementById('main-header');
    if (header) {
        const handleScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 吹き出し
    const targets = document.querySelectorAll(".inview_re");
    if (targets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.target.classList.toggle("is-show", entry.isIntersecting));
        }, { threshold: 0.2 });
        targets.forEach(el => observer.observe(el));
    }

    // シェアボタン
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

    // シェアリンク
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
        if (!monthYearEl || !calendarBody) {
            console.log("カレンダー要素が見つからない");
            return;
        }

        monthYearEl.innerText = `${year}年 ${month + 1}月`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarBody.innerHTML = '';

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

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
                    addEventsToCell(cell, dateStr);
                    date++;
                }

                row.appendChild(cell);
            }

            calendarBody.appendChild(row);
        }
    }

    function addEventsToCell(cell, dateStr) {

        // 期間イベント
        calendarEvents.ranges.forEach(range => {
            if (dateStr >= range.start && dateStr <= range.end) {

                const bar = document.createElement('div');

                let extraClass = '';

                if (dateStr === range.start) {
                    extraClass = 'start';
                    bar.textContent = range.label;
                } else if (dateStr === range.end) {
                    extraClass = 'end';
                } else {
                    extraClass = 'continuation';
                }

                bar.className = `event-bar ${range.class} ${extraClass}`;
                cell.appendChild(bar);
            }
        });

        // 単発イベント
        calendarEvents.points.forEach(point => {
            if (dateStr === point.date) {
                const bar = document.createElement('div');
                bar.className = `event-bar ${point.class}`;
                bar.textContent = point.label;
                cell.appendChild(bar);
            }
        });
    }

    // 追加
    function renderEventBars(year, month) {
    const layer = document.getElementById("event-layer");
    if (!layer) return;
    layer.innerHTML = "";

    const wrapper = document.getElementById('calendar-wrapper');
    if (!wrapper) return;
    
    const wrapperRect = wrapper.getBoundingClientRect();

    // 期間イベント
    calendarEvents.ranges.forEach(range => {
        const startCell = document.querySelector(`[data-date="${range.start}"]`);
        const endCell = document.querySelector(`[data-date="${range.end}"]`);
        if (!startCell || !endCell) return;

        const sRect = startCell.getBoundingClientRect();

        const bar = document.createElement("div");
        bar.className = "event-bar-absolute";
        bar.textContent = range.label;

        bar.style.left = (sRect.left - wrapperRect.left) + "px";
        bar.style.top = (sRect.top - wrapperRect.top + 35) + "px";  // 日付の下の位置を調整
        bar.style.width = (endCell.getBoundingClientRect().right - sRect.left - 8) + "px";

        layer.appendChild(bar);
    });

    // 単発イベントも同様に...
    // （省略）
}
}

    // 月送り
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentYear, currentMonth);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentYear, currentMonth);
        });
    }

    generateCalendar(currentYear, currentMonth);
renderEventBars(currentYear, currentMonth);
});

// イベント
const calendarEvents = {
    ranges: [
        { start: '2026-05-09', end: '2026-05-13', class: 'event-period', label: 'chouchou' }
    ],
    points: [
        { date: '2026-05-25', class: 'release-day', label: '新刊' }
    ]
};
