let observer;
function observeInviewElements() {
document.querySelectorAll('.inview_re:not(.observed)').forEach(el => {
try {observer.observe(el);} catch (e) {
console.warn("Observer error:", e);
}
el.classList.add('observed');
});
}

document.addEventListener("DOMContentLoaded", function() {
// 1-1. レイアウト調整（ローディング解除）
setTimeout(() => {
    document.body.classList.remove('loading');
}, 10);

// 1-2. スクロール処理（ヘッダーの固定・表示切り替え）
const header = document.getElementById('header');
if(header){
  let lastScroll = window.scrollY || 0;
  let ticking = false;
  function onScroll() {
    const current = window.scrollY || 0;
    header.classList.toggle('scrolled', current > 60);
    if (current > lastScroll && current > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = current;
    ticking = false;
  }
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();
}

// 1-3. 動く吹き出し
observer = new IntersectionObserver((entries, obs) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("is-show");
obs.unobserve(entry.target);
}
});
}, { threshold: 0.2 });
// 静的HTML
observeInviewElements();
// 動的HTML生成
renderPokedexItems();

// 1-4. シェアボタン・リンク設定
setupShareButtons();

// 1-5. カレンダー初期化
if (typeof generateCalendar === "function") {
    generateCalendar(currentYear, currentMonth);
}
});

// 2-1. シェアボタン
function setupShareButtons() {
const btn = document.getElementById('shareBtn');
if (!btn) return;
let isOpen = false;
btn.addEventListener('click', (e) => {
if (e.target.tagName === 'I' || e.target.closest('a')) return;
isOpen = !isOpen;
btn.classList.toggle('active', isOpen);
});
const url = encodeURIComponent(location.href);
const text = encodeURIComponent(document.title + "\n" + location.href);
const links = {
    "x-link": `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "line-link": `https://social-plugins.line.me/lineit/share?url=${url}`,
    "threads-link": `https://www.threads.net/intent/post?text=${text}`,
    "reddit-link": `https://www.reddit.com/submit?url=${url}`,
    "sms-link": `sms:?body=${text}`
};
for (const [id, href] of Object.entries(links)) {
    const el = document.getElementById(id);
    if (el) el.href = href;
}
}

// 2-2.template
function renderPokedexItems() {
const categorySlugMap = {
"炎を感じる":"fire",
"水を感じる":"water",
"海を感じる":"ocean",
"自然を感じる":"nature",
"風を感じる":"nicebreezes",
"土を感じる":"dirt",
"電気で動く":"electronics",
"花ざかり":"prettyflowers",
"せいけつ":"cleanliness",
"キズをいやす":"healing",
"見て楽しむ":"watching",
"木製":"wooden",
"石づくり":"stone",
"布仕立て":"fabric",
"ガラス入り":"glass",
"かたい":"hard",
"やわらかい":"soft",
"四角い":"blocky",
"まんまる":"round",
"ほっそり":"slender",
"とがっている":"sharp",
"ゆれる":"wobbly",
"まわる":"spinning",
"いれもの":"container",
"けんせつ":"construction",
"乗りもの":"rides",
"キュート":"cute",
"カラフル":"colorful",
"ゴージャス":"luxury",
"メタリック":"metal",
"シンボル":"symbol",
"キラキラしてる":"shiny",
"音が鳴る":"noisy",
"トレーニングできる":"exercise",
"みんなで使う":"groupactivities",
"あそびば":"playspaces",
"食べものそっくり":"likefood",
"難しそうなもの":"complicated",
"文字がある":"letter",
"フシギ":"strange",
"ブキミ":"spooky",
"ゴミ":"garbage",
"あつまり":"gatherings",
"あまい":"sweet",
"すっぱい":"sour",
"からい":"spicy",
"にがい":"bitter",
"しぶい":"dry"
};

// 2-3-1.Dex
document.querySelectorAll('.item-data').forEach(el => {
    const d = el.dataset;
    const name = d.name || "";
    const img = d.img || "";
    const isLeft = (d.dir || "left") === "left";
    const stars = Number(d.stars) || 0;

// 2-3-2. 星の生成
    let starHTML = "";
    for (let i = 1; i <= 5; i++) {
        starHTML += `<svg class="star ${i > stars ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/></svg>`;
    }

// 2-3-3. 図鑑ボックスの描画
    el.innerHTML = `
<div class="fukidashi inview_re">
<div class="faceicon"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcgi537e8devoopI5LkSdV0veR08UoJuoA3NmCOcXNRohXDb05kCHKktudFV5uUuaqDMWYJTAYcork2_kbOscMna2hlt50VFcpHALNmCWvkTa60VeGfHhq6_9i65Oq_wh0P1CPZ5ibxLGuYXgYKXndBzvmC3hzHpWniqXY0AxW_yDc0jSsozBWagEg0Kbw/s1600/%E7%84%A1%E9%A1%8C829_20260410232336.png" alt="メタモン"></div>
<div class="chatting"><div class="says"><p>ぽこあポケモンに登場する『<span class="st">${name}</span>』の入手方法・レシピ・使い道をまとめたよ！</p></div></div>
</div>
<div class="pokedex-box">
<div class="pokedex-btn"></div>
<div class="after">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div>
            <div class="pokedex-header"><span class="name">${name}</span></div>
            <div class="item-visual"><img class="dex" src="${img}" alt="${name}"></div>
            <p class="pokedex-description">${d.desc || ""}</p>
            <div class="pokedex-footer">
                <span>${d.howtoget || ""}</span>
                <span class="rating">${starHTML}</span>
            </div>
        </div>`;
    
// 2-3-4. 入手方法リスト
    let getHTML = "";
    const getCount = Number(d.get) || 0;
    for (let i = 1; i <= getCount; i++) {
        getHTML += `<li><span class="markerL">${d[`get${i}Title`] || ""}</span><br>${d[`get${i}Body`] || ""}</li>`;
    }

// 2-3-5. レシピリスト
    let recipeHTML = "";
    const recipeCount = Number(d.recipe) || 0;
    for (let i = 1; i <= recipeCount; i++) {
        recipeHTML += `<li><img src="${d[`recipeimg${i}`] || ""}" alt="">${d[`recipe${i}`] || ""}</li>`;
    }

// 2-3-6. 分類
    let typeHTML = "";
    const typeCount = Number(d.type) || 0;
    for (let i = 1; i <= typeCount; i++) {
        typeHTML += `<li><img src="${d[`typeimg${i}`] || ""}" alt="">${d[`type${i}`] || ""}</li>`;
    }

// 2-3-7. カテゴリー
    let catHTML = "";
    let catSpanHTML = "";
    const catCount = Number(d.category) || 0;
    for (let i = 1; i <= catCount; i++) {
        const cat = d[`category${i}`];
        if (!cat || typeof cat !== "string") continue;
        const slug = categorySlugMap[cat] || cat;
        catSpanHTML += `<a href="/p/${slug}-items-pokopia.html" style="padding:0 0.5rem">${cat}</a>`;
        catHTML += `<li><a href="/p/${slug}-items-pokopia.html">${cat}</a></li>`;
}

// 2-3-8. 記述
    el.insertAdjacentHTML("afterend", `
    <div class="item-section">
        <h2>${name}の入手方法</h2>
        ${d.getbody || ""}
        <p style="font-size:1.1em;">＼ ゲットする${getCount}つの方法 ／</p>
        <ol class="material-listY">${getHTML}</ol>

        ${recipeCount > 0 ? `
        <h2>${name}のレシピ</h2>
        <ul class="material-list">${recipeHTML}</ul>
        <h3 class="whoa-blue">レシピの入手方法</h3>
        <p class="whoa-p">${d.recipebody || ""}</p>` : ""}

        <h2>${name}の種類</h2>
        <ul class="material-list">${typeHTML}</ul>

        <h2>${name}の使い道</h2>
        <p>${d.catbody || ""}ポケモンのすみかに設置すると<br>
        ${catSpanHTML}<br>のアイテムを好きなポケモンが喜びます。</p>

        <h2>${name}の分類</h2>
        <ul class="material-list">${catHTML}</ul>
    </div>`);
});

// 2-3-9. DOMContentLoaded 〆
observeInviewElements();
});

// — カレンダーロジック —
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const calendarEvents = {
ranges: [{ start: '2026-05-09', end: '2026-05-13', class: 'event-period', label: 'chouchou' }],
points: [{ date: '2026-05-25', class: 'release-day', label: '新刊' }]
};

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
            cell.innerHTML = `<div class="date-number">${date}</div>`;
            cell.dataset.date = dateStr;
            // 点イベントの描画
            calendarEvents.points.forEach(p => {
                if (dateStr === p.date) {
                    const dot = document.createElement('div');
                    dot.className = `event-bar ${p.class}`;
                    dot.textContent = p.label;
                    cell.appendChild(dot);
                }
            });
            date++;
            hasDate = true;
        }
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
    if (date > daysInMonth && !hasDate) break;
}
setTimeout(() => renderEventBars(), 50);
}

function renderEventBars() {
const layer = document.getElementById("event-layer");
const wrapper = document.getElementById('calendar-wrapper');
if (!layer || !wrapper) return;
layer.innerHTML = "";
const wrapperRect = wrapper.getBoundingClientRect();

calendarEvents.ranges.forEach(range => {
    const startCell = document.querySelector(`[data-date="${range.start}"]`);
    const endCell = document.querySelector(`[data-date="${range.end}"]`);
    if (!startCell || !endCell) return;
    const sRect = startCell.getBoundingClientRect();
    const eRect = endCell.getBoundingClientRect();
    const bar = document.createElement("div");
    bar.className = "event-bar-absolute " + range.class;
    bar.textContent = range.label;
    bar.style.left = (sRect.left - wrapperRect.left) + "px";
    bar.style.top = (sRect.top - wrapperRect.top + 35) + "px";
    bar.style.width = (eRect.right - sRect.left - 8) + "px";
    layer.appendChild(bar);
});

}
