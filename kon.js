document.addEventListener("DOMContentLoaded", function() {

    // ヘッダーのスクロール固定
    const header = document.getElementById('main-header');
    if (header) {
        const handleScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 動く吹き出し
    const targets = document.querySelectorAll(".inview_re");
    if (targets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("is-show", entry.isIntersecting);
            });
        }, { threshold: 0.2 });
        targets.forEach(el => observer.observe(el));
    }

    // ==================== シェアボタン ====================
    const btn = document.getElementById('shareBtn');
    if (btn) {
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            if (e.target.closest('a') || e.target.closest('.share_item') || 
                e.target.tagName === 'I' || e.target.closest('i') || 
                e.target.classList.contains('share_label')) {
                return;
            }
            e.stopPropagation();
            isOpen = !isOpen;
            btn.classList.toggle('active', isOpen);
        });
    }

    // シェアリンク設定
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title + "\n" + location.href);
    const links = {
        "x-link": `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "line-link": `https://social-plugins.line.me/lineit/share?url=${url}`,
        "threads-link": `https://www.threads.net/intent/post?text=${text}`,
        "reddit-link": `https://www.reddit.com/submit?url=${url}`,
        "sms-link": `sms:?body=${text}`
    };
    Object.keys(links).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = links[id];
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
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                cell.className = 'calendar-cell';

                if (i === 0 && j < firstDay) {
                    cell.innerHTML = '<div class="date-number"></div>';
                } else if (date > daysInMonth) {
                    cell.innerHTML = '<div class="date-number"></div>';
                } else {
                    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;

                    const dateNum = document.createElement('div');
                    dateNum.className = 'date-number';
                    dateNum.textContent = date;
                    cell.appendChild(dateNum);

                    // イベントバー
                    calendarEvents.ranges.forEach(range => {
                        if (dateStr >= range.start && dateStr <= range.end) {
                            cell.appendChild(createEventBar(range.label, range.class));
                        }
                    });

                    calendarEvents.points.forEach(point => {
                        if (dateStr === point.date) {
                            cell.appendChild(createEventBar(point.label, point.class));
                        }
                    });

                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function createEventBar(text, className) {
        const bar = document.createElement('div');
        bar.className = `event-bar ${className}`;
        bar.textContent = text;
        return bar;
    }

    // 矢印
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        generateCalendar(currentYear, currentMonth);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        generateCalendar(currentYear, currentMonth);
    });

    generateCalendar(currentYear, currentMonth);
});

// ==================== イベントデータ ====================
const calendarEvents = {
    ranges: [
        { start: '2026-05-10', end: '2026-05-14', class: 'event-period', label: '新イベント' }
    ],
    points: [
        { date: '2026-05-25', class: 'release-day', label: '新刊' }
    ]
};
