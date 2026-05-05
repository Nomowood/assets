document.addEventListener("DOMContentLoaded", function() {

    // ヘッダーのスクロール固定
    const header = document.getElementById('main-header');
    if (header) {
        function handleScroll() {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // 動く吹き出し
    const targets = document.querySelectorAll(".inview_re");
    if (targets.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-show");
                } else {
                    entry.target.classList.remove("is-show");
                }
            });
        }, { threshold: 0.2 });
        targets.forEach(el => observer.observe(el));
    }

    // ==================== シェアボタン ====================
    const btn = document.getElementById('shareBtn');   // 正しいID
    if (btn) {
        let isOpen = false;
        btn.addEventListener('click', function(e) {
            // リンクやシェアアイテムをクリックした場合はトグルしない
            if (e.target.closest('a') || e.target.closest('.share_item') || 
                e.target.tagName === 'I' || e.target.closest('i')) {
                return;
            }
            isOpen = !isOpen;
            btn.classList.toggle('active', isOpen);
        });
    }

    // ==================== シェアリンク設定 ====================
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title + "\n" + location.href);

    // 各リンクを設定
    const xLink = document.getElementById("x-link");
    if (xLink) xLink.href = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url;

    const lineLink = document.getElementById("line-link");
    if (lineLink) lineLink.href = "https://social-plugins.line.me/lineit/share?url=" + url;

    const threadsLink = document.getElementById("threads-link");
    if (threadsLink) threadsLink.href = "https://www.threads.net/intent/post?text=" + text;

    const redditLink = document.getElementById("reddit-link");
    if (redditLink) redditLink.href = "https://www.reddit.com/submit?url=" + url;

    const smsLink = document.getElementById("sms-link");
    if (smsLink) smsLink.href = "sms:?body=" + text;

    // ==================== カレンダー ====================
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();   // 0〜11

    // カレンダー生成関数（月を指定可能に）
    function generateCalendar(year, month) {
        const monthYearEl = document.getElementById('calendar-month-year');
        const calendarBody = document.getElementById('calendar-body');

        if (!monthYearEl || !calendarBody) return;

        monthYearEl.innerText = year + '年 ' + (month + 1) + '月';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarBody.innerHTML = '';

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');

                if (i === 0 && j < firstDay) {
                    cell.innerText = '';
                } else if (date > daysInMonth) {
                    cell.innerText = '';
                } else {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    cell.innerText = date;

                    // イベント判定
                    calendarEvents.ranges.forEach(range => {
                        if (dateStr >= range.start && dateStr <= range.end) {
                            cell.classList.add(range.class);
                            cell.title = range.label;
                        }
                    });

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

    // 矢印のイベント設定
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

    // 初回表示
    generateCalendar(currentYear, currentMonth);
});

// カレンダーイベントデータ
const calendarEvents = {
    ranges: [{ start: '2026-04-01', end: '2026-04-05', class: 'event-period', label: '期間限定イベント' }],
    points: [{ date: '2026-04-20', class: 'release-day', label: '新刊発売日' }]
};
