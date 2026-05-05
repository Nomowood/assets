document.addEventListener("DOMContentLoaded", function() {

    // ヘッダースクロール
    const header = document.getElementById('main-header');
    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
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

    // ==================== シェアボタン（スマホ対策強化） ====================
    const btn = document.getElementById('shareBtn');
    if (btn) {
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            if (e.target.closest('a') || 
                e.target.closest('.share_item') || 
                e.target.tagName === 'I' || 
                e.target.closest('i') || 
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

    // ==================== カレンダー（月切り替え対応） ====================
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
                    cell.innerText = '';
                } else if (date > daysInMonth) {
                    cell.innerText = '';
                } else {
                    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
                    cell.innerText = date;

                    // イベント処理
                    let eventLabel = '';

                    calendarEvents.ranges.forEach(range => {
                        if (dateStr >= range.start && dateStr <= range.end) {
                            cell.classList.add(range.class);
                            eventLabel = range.label;
                        }
                    });

                    calendarEvents.points.forEach(point => {
                        if (dateStr === point.date) {
                            cell.classList.add(point.class);
                            eventLabel = point.label;
                        }
                    });

                    // セル内にラベルを追加（画像風）
                    if (eventLabel) {
                        const label = document.createElement('div');
                        label.className = 'event-label';
                        label.textContent = eventLabel;
                        cell.appendChild(label);
                    }

                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
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

// イベントデータ
const calendarEvents = {
    ranges: [{ start: '2026-04-01', end: '2026-04-05', class: 'event-period', label: '期間限定' }],
    points: [{ date: '2026-04-20', class: 'release-day', label: '新刊' }]
};
