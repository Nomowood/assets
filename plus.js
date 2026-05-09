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
});

// ここから違うスクリプト

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
}}

// ここから違うスクリプト
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
    const stars = Number(d.stars) || 0;
    let starHTML = "";
    for (let i = 1; i <= 5; i++) {
        starHTML += `<svg class="star ${i > stars ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/></svg>`;
    }
let freeHTML = "";
const freeCount = Number(d.free) || 0;
for (let i = 1; i <= freeCount; i++) {
    freeHTML += `<p>${d[`free${i}`] || ""}</p>`;
}

// 2-3-3. 図鑑ボックスの描画
el.innerHTML = `
<div class="fukidashi inview_re">
<div class="faceicon"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcgi537e8devoopI5LkSdV0veR08UoJuoA3NmCOcXNRohXDb05kCHKktudFV5uUuaqDMWYJTAYcork2_kbOscMna2hlt50VFcpHALNmCWvkTa60VeGfHhq6_9i65Oq_wh0P1CPZ5ibxLGuYXgYKXndBzvmC3hzHpWniqXY0AxW_yDc0jSsozBWagEg0Kbw/s1600/%E7%84%A1%E9%A1%8C829_20260410232336.png" alt="メタモン"></div>
<div class="chatting"><div class="says"><p>ぽこあポケモンに登場する『<span class="st">${name}</span>』の入手方法・レシピ・使い道をまとめたよ！</p></div></div>
</div><br>
<h2>${name}とは</h2>
<div class="pokedex-box">
<div class="pokedex-top"><div class="btn-main"></div>
<div class="indicator-lights"><div class="light-row"><div class="light red"></div>
<div class="light yellow"></div><div class="light green"></div>
</div></div></div>
<div class="screen-outer">
<div class="screen-inner">
      <div class="pokedex-header">
        <span class="name">${name}</span>
      </div>
      <div class="item-visual">
        <img class="dex" src="${img}" alt="${name}の画像">
      </div>
      <p class="pokedex-description">${d.desc || ""}</p>
      <div class="pokedex-footer">
        <span>${d.howtoget || ""}</span>
        <span class="rating">${starHTML}</span></div></div></div>
</div>
<div style="margin:1.7rem 0">${freeHTML}</div>
`;
    
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
        <div class="whoa-blue">レシピの入手方法</div>
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

// 2-3-9. 〆
observeInviewElements();
}

// typing
function typeText(el, text, speed = 80) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}
const descEl = el.querySelector('.pokedex-description');
typeText(descEl, d.desc || '');
