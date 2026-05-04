// 投稿された最新記事を表示,ok
fetch("https://nomowood.blogspot.com/feeds/posts/default/-/ゆめしま?alt=json")
.then(response => response.json())
.then(data => {
    const newpost = document.getElementById("pokoa-posts");
    const entries = data.feed.entry;
    entries.slice(0, 5).forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const media = entry.media$thumbnail?.url || "";
      const div = document.createElement("div");
      const a = document.createElement("a");
      a.href = link;
      const img = document.createElement("img");
      img.src = media;
      a.appendChild(img);
      a.appendChild(document.createTextNode(title));
      div.appendChild(a);
      newpost.appendChild(div);
 });
  });

// guideラベルの記事を表示.ok
const newguide = document.getElementById('guidesGrid');
async function loadGuides() {
  if (!newguide) return;
  const url = 'https://nomowood.blogspot.com/feeds/posts/default/-/guide?alt=json&max-results=5&orderby=published';
  try {
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    if (!data.feed.entry || data.feed.entry.length === 0) return;
    newguide.innerHTML = '';
    data.feed.entry.forEach(function(post) {
      const card = document.createElement('div');
      card.className = 'guide-card';
      const link = post.link.find(l => l.rel === 'alternate').href;
      const title = post.title.$t;
      const date = new Date(post.published.$t).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      card.innerHTML = `
        <div class='guide-date'>${date}</div>
        <div class='guide-content'>
          <h3><a href="${link}">${title}</a></h3>
        </div>
      `;
      newguide.appendChild(card);
    });
} catch (err) {
return;
}}
window.addEventListener('DOMContentLoaded', loadGuides);

// レイアウト調整
window.setTimeout(function() {
document.body.className = document.body.className.replace('loading', '');
}, 10);

// ヘッダーのスクロール固定
const header = document.getElementById('main-header');  
function handleScroll() {
if (window.scrollY > 60) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}}
window.addEventListener('scroll', handleScroll);
handleScroll();

// 動く吹き出し
document.addEventListener("DOMContentLoaded", () => {
const targets = document.querySelectorAll(".inview_re");
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("is-show");
} else {
entry.target.classList.remove("is-show");
}
});}, {
threshold: 0.2
});
targets.forEach(el => observer.observe(el));
});

// SNSシェアボタン
<script>
// スクロールヘッダー
let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      const current = window.scrollY;
      if (current > lastScroll &amp;&amp; current > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    });    
 // —— シェアボタン
const btn = document.getElementById('shareBtn');
let isOpen = false;
// クリックで開閉
btn.addEventListener('click', function(e) {
// アイコンクリック時は閉じない
 if (e.target.tagName === 'I' || e.target.closest('a')) {
return;
}
isOpen = !isOpen;
if (isOpen) {
btn.classList.add('active');
} else {
btn.classList.remove('active');
}
});
// シェアURL設定
const url = encodeURIComponent(location.href);
const text = encodeURIComponent(document.title + "\n" + location.href);
document.getElementById("x-link").href = "https://twitter.com/intent/tweet?text=" + text + "&amp;url=" + url;
document.getElementById("line-link").href = "https://social-plugins.line.me/lineit/share?url=" + url;
document.getElementById("threads-link").href = "https://www.threads.net/intent/post?text=" + text;
document.getElementById("reddit-link").href = "https://www.reddit.com/submit?url=" + url;
document.getElementById("sms-link").href = "sms:?body=" + text;
// ネイティブ機能
function nativeShare() {
if (navigator.share) {
navigator.share({ title: document.title, text: document.title, url: location.href });
} else {
alert("この端末では使えません");
}}
function copyLink() {   navigator.clipboard.writeText(location.href).then(() => {alert("URLのリンクをコピーしました");});
}


// 投稿の簡易化
document.querySelectorAll('.item-data').forEach(el => {
const name = el.dataset.name || "";
const dir = el.dataset.dir || "left"; // left / right
const isLeft = dir === "left";
const img = el.dataset.img || "";
const desc = el.dataset.desc || "";
const howtoget = el.dataset.howtoget || "";
const stars = Number(el.dataset.stars) || 0;
let starHTML = "";
for (let i = 1; i <= 5; i++) {
if (i <= stars) {
starHTML += `
<svg class="star" viewBox="0 0 24 24">
<path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/>
</svg>`;
} else {
starHTML += `
<svg class="star empty" viewBox="0 0 24 24">
<path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/>
</svg>`;
}}
el.innerHTML = `
<div class="fukidashi ${isLeft ? "LeftToRight" : "RightToLeft"} inview_re">
<div class="faceicon"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcgi537e8devoopI5LkSdV0veR08UoJuoA3NmCOcXNRohXDb05kCHKktudFV5uUuaqDMWYJTAYcork2_kbOscMna2hlt50VFcpHALNmCWvkTa60VeGfHhq6_9i65Oq_wh0P1CPZ5ibxLGuYXgYKXndBzvmC3hzHpWniqXY0AxW_yDc0jSsozBWagEg0Kbw/s1600/%E7%84%A1%E9%A1%8C829_20260410232336.png" alt="メタモンのアイコン"></div>
<div class="chatting"><div class="says"><p>ぽこあポケモンに登場する『<span class="st">${name}</span>』の入手方法・レシピ・使い道をまとめたよ！</p>
</div></div>
</div>
<div class="pokedex-box"><div class="pokedex-btn"><div class="after">
<span class="red"></span>
<span class="yellow"></span>
<span class="green"></span>
</div></div>
<div class="pokedex-header"><span class="name">${name}</span></div>
<div class="item-visual"><img class="dex" src="${img}" alt="${name}のイラスト"></div>
<p class="pokedex-description">${desc}</p>
<div class="pokedex-footer">
<span>${howtoget}</span>
<span class="rating" aria-label="個人的なレア度は星${stars}">
${starHTML}
</span>
</div></div>
`;

const getbody = el.dataset.getbody || "";
const getCount = Number(el.dataset.get);
let getHTML = "";
for (let i = 1; i <= getCount; i++) {
getHTML += `
<li>
<span class="markerL">${el.dataset[`get${i}-title`]}</span><br>
${el.dataset[`get${i}-body`]}
</li>`;
}
const recipeCount = Number(el.dataset.recipe);
const recipeimg = Number(el.dataset.recipeimg);
let recipeHTML = "";
for (let i = 1; i <= recipeCount; i++) {
recipeHTML += `<li><img alt="${el.dataset[`recipe${i}`]}のイラスト" src="${el.dataset[`recipeimg${i}`]}">${el.dataset[`recipe${i}`]}</li>`;
}

const recipebody = el.dataset.recipebody || "";
const recipebodyHTML = `
${el.dataset[`recipebody$`]}
`;

const typeCount = Number(el.dataset.type);
const typeimg = Number(el.dataset.typeimg);
let typeHTML = "";
for (let i = 1; i <= typeCount; i++) {
typeHTML += `<li><img alt="${el.dataset[`type${i}`]}のアイコン" src="${el.dataset[`typeimg${i}`]}">${el.dataset[`type${i}`]}</li>`;
}

// Category
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
}
const catbody = el.dataset.catbody || "";
const catbodyHTML = `
${el.dataset[`catbody$`]}`;
const catCount = Number(el.dataset.category);
let catHTML = "";
let catSpanHTML = "";
for (let i = 1; i <= catCount; i++) {
const cat = el.dataset[`category${i}`];
if (!cat) continue;
const slug = categorySlugMap[cat] || cat;
catSpanHTML += `<a href="/p/${slug}-items-pokopia.html" style="padding:0 0.5rem">${cat}</a>`;
catHTML += `<li><a href="/p/${slug}-items-pokopia.html">${cat}</a></li>`;
}

el.insertAdjacentHTML("afterend", `
<div class="item-section">
<h2><img src="${img}" alt="${name}のイラスト">${name}の入手方法</h2>
${getbody}
<p style="font-size:1.1em;">＼ ゲットする${el.dataset["get"]}つの方法 ／</p>
<ol class="material-listY">${getHTML}</ol>
${recipeCount > 0 ? `
<h2><img src="${img}" alt="${name}のイラスト">${name}のレシピ</h2>
<ul class="material-list">${recipeHTML}</ul>
<h3 class="whoa-blue">レシピの入手方法</h3><br>
<p class="whoa-p">${recipebody}</p>` : ""}

<h2><img src="${img}" alt="${name}のイラスト">${name}の種類</h2>
<ul class="material-list">${typeHTML}</ul>
<h2><img src="${img}" alt="${name}のイラスト">${name}の使い道</h2>
<p>${catbody}ポケモンのすみかに設置すると<br>
${catSpanHTML}<br>のアイテムを好きなポケモンが喜びます。</p>
<h2><img src="${img}" alt="${name}のイラスト">${name}の分類</h2>
<ul class="material-list">${catHTML}</ul>
</div>
`);
});
