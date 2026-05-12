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
const typeDATA = {
かぐ: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghbZ1lT0riY1KWwC6skAqyPd3CAZQahclzXaxCQb41pPYDsTBJt6t8u0ea8dFrRy4gs6E9jFsH4cF1DBHaHj5_gmX4jtA_hryKajKDWwHsZxDOxBHxy5fjQ8y-k20FutBfvsQQwdtcxTlRLDxHTxyp0ma4PxQy-WTizTIvafuKqUzrV_c/s1600/IMG_4050.png",
slug: "furniture"
},
ざっか:{
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivf6fPgOtuYZuu_FaZseyY1DC99dSZ4tWbewrFXVdTozNVqKWLkLheBGYIeBYep8SfKutKUkt2e-1a0sq-aoZST1YC8icjXHAgiGlpdPLuQ5YmFHAwWjuz4Y-mF-DsnjbZ0F63nSikcMgOP2mWZIPbqF69AcPueC_ux8km7r_GVtHaTPo/s1600/IMG_4051.png",
slug:"mist"
},
おくがい: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKIgxmR9VWFX0BMtrTLoGvdS6wjrX6SHHuuLwo6yPm8mnQeRH1ZNYHq_J2y-A52qguLq7PdQ2tuJPhnslUtsl8ICvAY7nB0G8wlgiCrEqPjjWpUVswRCkKjzUNGdDnCTQkPwM1T-PfJRI7iSK4em0QTGjTkIyMksDu_rrnei5g2IpaPa4/s1600/IMG_4052.png",
slug: "outdoor"
},
べんり: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYoEp4RZLYRLqm6V6TFwuUXQlZR9WR5dk9cQ7yQAXYPYNbnxU3QIqe0lpSRjA03XG3kVWNGAtEV63nnU2NJI0SDIcIFY45Ft-7K-Llh5J1fb7TENbcRrsO_EQ3EhimCqB5T84bEXJLqfrxoJQu-ZMidYsHQ9WJIBqeDAP4SDVXZKGJ2mw/s1600/IMG_4053.png",
slug: "utilities"
},
たてもの: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhuRI95EuB2UZCSdAmndh4s1mBun3xvewlf45ZziNcMJYQdy0cM235uA6ijgKm4kVqWSIkccFqXiZv_u_uAZ3xuZqTDtVFf-oCTDI62gsQEEtSorvqtOfQDMkqq1ogvtboFPgdxZwOYdGLmDw38U4rNoWbY7-TVneZ19dNZtZUIUe3FA-o/s1600/IMG_3946.png",
slug: "buildings"
},
ブロック: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUR9nKORMdgtf59xs6JnY7eVNygJO-qC30YgPXuVOaPBQUPM7Y7_9tvbc_OnM-fnt9HDtgwqisbsjhfD66JnJcNtHzMUJnJKlLhFxeSiFmaFSPQQ0opc9hSBvwfK27aCardAYCbD0EwKCtlL9PS0eZhNY8MrcIwq0awtS5qWDsgk-VsJA/s1600/IMG_3947.png",
slug: "blocks"
},
キット: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2rAbQizQYuzuuNZb-3-bLL6d8aGRZ_ujIwo4glJKnXkFkvvPrZ9dbzU6yR9uSw2qy_wqXnrFnrKGWlKpgb1rhJS9GiqFVgTXoVgt8e5DO0RW1zkXu-3OqXgoqgvQUT5PqcmB6yAE4SH32gihW7ilxHkSwnkwNGOKEbOszdszB5VKfnMM/s1600/IMG_3948.png",
slug: "kits"
},
しぜん: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkG_vu04C6272ligRRhWMXC-bbSx-MZx4uBlMSCTUHdkDm_8G_y8E5JqKBU4ac-zJtPIOdiGRPTECiPZxUpK7m43c6ztYF-z-HtYqXobOEb-YAuzrw_8FGGZKo91K0kq_9mBQ4fP1PPO3fKnZR5vrpL_-eX3GXfmkUdqDXwbYhC1OOyRg/s1600/IMG_3949.png",
slug: "nature"
},
食べもの: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhR77G-geALZwS5Qju3nFF-K7IFbMVkWzedh3vSklgHigqf2Hxs_zwcGUimaF7oYXLyk0XuVVPFolC7pXQ7DEOXTAZF51I2NbbBunPbeeiNSjYk88v551bRIn3IfSGJMRI-2zJmoVVsvYyp0i07dgydny4nL77i79EmWewgAjSgMCYFy4M/s1600/IMG_3950.png",
slug: "food"
},
ざいりょう: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisggkrOuFtcVKeFDIPi7-j3sIWpi86Gzt1EQdNiEkEjYZbBjrtOA9GzXpB0XR5kd3lJvTR4dH1EmheuMto-GQW7-nLTpIBseD9iK2I88_yu_P10J0Lab4B_Ash2AacKqZfcX5W0Xx56UaskJcgc3CpHXtseT6bRrQ90pYtwQ7xedJwlNE/s1600/IMG_3951.png",
slug: "materials"
},
キーアイテム: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5hDy9IMtfe8x5-pV_TiEesPBZtOe0dJmjqhBzfXFKj4XdtdjbYQmZZ1xDjUlzOe2EoA9EU3g-YQeVkyHvjyLBUx6ZYFPDUNQCxCvA3RzaLWgmhtv4zYsOn9JFaBXqS__IuIdO-B1uXg-0rZg4oCx1DGOLLmd7rwG0f2c9QPRfnHf0Buw/s1600/IMG_3952.png",
slug: "keyitems"
},
そのた: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjYGKpS0_GJOyHTNspOGiBvgxBLt-O_KbsvziAIk9EI91otvVoPU9btsC71vfXg4Jv1flDeMHUDo90hskfpzgDMmhaGiNZythn_6cK-aoMtWMUFGDGVgHRWoBMJOSbyjWRt4QyNwAPLW5rhkNQGvqKU-FCPUCbCDrzovMZ60IIJtF2Tjpw/s1600/IMG_3953.png",
slug: "other"
},
オモチャ: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg26BoRti4d5GyS4hCwCQRZSqTx2NhI08WoI5zQo0MiXRm_iZ-qUEn387FRWoKBt3qD1cBtRJaN9tqdd8VU5SNSBSouHNPY1Vzc3nnUk_TXdvi_30fP7G9wSRhNB6KUCd9GNTDjQ5YxJY-wP-nR0_LJombstvPu6QbOsqAxpMZx2M4zGok/s1600/IMG_4062.png",
slug: "toy"
},
かざりつけ: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnKHFUU0qDrWJ79GZJZf9_AeTbB01QEA_bJjLQxzkKmVe8UbCvfgWb0JD0ci-c85HRaSICjHwsc9FDXQtZJAxH5thGDBhyphenhyphenYVKIUG9CyXk6lNeBaGyGXxgN9cukrSzlHdjM5vZVI7iL3h3xLB1s21V-bOZjliPsh_0fyO6Rw9jgjLHv2KY/s1600/IMG_4061.png",
slug: "decoration"
},
きゅうけい: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCvhndlzOu9S5gtVrckkwcKjC81Os6YmGoYnpjX7sPk-4mBJaswqcNJ6NhpHQ8GPcWB726iKGgJ_L7xKl9cQYpovwd3BeAK_p4hYmaoci7TIgGNzHgzbF_5pivgNg5RwJZnTbZF2gGng1U6VWK1RykhGJ-_PQs2ciWpcUeueTHkJC_Q4s/s1600/IMG_4063.png",
slug: "relaxation"
},
どうろ: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizvQhoWnHX18V3BHFQDLGyZEzWA8afoa99RirkdNobFm19HNgC0aLM81R9bNvjxqTEFfDaxdMSYv7CqYrBN9RtzFMDcg9PyZyTG0NZ_9xFhJdy8X7oe_YSJUXbxKsQZeChCIrpP0QAQLe4fLQDjXD-WtVWLG8nrRFZknLnXYxvbLxdG1E/s1600/IMG_4060.png",
slug: "road"
},
かせき: {
icon: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWLevq3LHOZgz4sBzVK5D6YBka8N3Shvb38NBAe6yTu1QWZjxc6gYCFra3j42qYpdqB0UaLdKCzx7r2Sler8XmUKozvYhYF-eAMs6nOEXc8efkcj515CZu54qtAe-bIoJ_DiR3F4yy67axkSwqNVdOUUfCdk4kQzauhs3i_SOZmT4168g/s1600/IMG_9533.png",
slug: "foxil"
}
}
    let typeHTML = "";
const typeCount = Number(d.type) || 0;
for (let i = 1; i <= typeCount; i++) {
    const typeName = d[`type${i}`];
    if (!typeName) continue;
    const typeInfo = typeDATA[typeName];
    typeHTML += `
    <li><img src="${typeInfo?.icon || ""}" alt="${typeName}">${typeName}</li>`;
}

// 2-3-7. カテゴリー
    let catHTML = "";
    let catSpanHTML = "";
    const catCount = Number(d.category) || 0;
    for (let i = 1; i <= catCount; i++) {
        const cat = d[`category${i}`];
        if (!cat || typeof cat !== "string") continue;
        const slug = categorySlugMap[cat] || cat;
        catSpanHTML += `<a href="/p/${slug}-items-pokopia.html" style="padding:0 0.5rem; text-decoration:none; color:var(--text-st);">${cat}</a>`;
        catHTML += `<li><a href="/p/${slug}-items-pokopia.html">${cat}</a></li>`;
}
const catSection = catCount > 0
    ? `<h2>${name}の分類</h2><ul class="material-list">${catHTML}</ul>`
    : "";

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
        <p>${d.catbody || ""}ポケモンのすみかに設置すると、${catSpanHTML}のアイテムを好きなポケモンが喜びます。</p>
    ${catCount > 0 ? `<h2>${name}の分類</h2><ul class="material-list">${catHTML}</ul>
    </div>`);
});

// 2-3-9. 〆
observeInviewElements();
}
});
    

// 3-1. シェアボタン
const ITEMS = [
  { id:'copy',    label:'URLをコピー', icon:'<i class="fa-regular fa-copy"></i>' },
  { id:'native',  label:'シェア', icon:'<i class="fa-solid fa-share-nodes"></i>' },
  { id:'x',       label:'X / Twitter', icon:'<i class="fa-brands fa-x-twitter"></i>' },
  { id:'line',    label:'LINE', icon:'<i class="fa-brands fa-line"></i>' },
  { id:'threads', label:'Threads', icon:'<i class="fa-brands fa-threads"></i>' },
  { id:'sms',     label:'SMS', icon:'<i class="fa-regular fa-comment-dots"></i>' },
  { id:'reddit',  label:'Reddit', icon:'<i class="fa-brands fa-reddit-alien"></i>' },
  { id:'hatena',  label:'はてな', icon:'<i class="fa-solid fa-bookmark"></i>' },
  { id:'note',    label:'noteで引用', icon:'<i class="fa-regular fa-file-lines"></i>' },
];
const ROTS = [-0.8, 0.5, -0.3, 0.7, -0.6, 0.4, -0.5, 0.9, -0.4];
function enc(str) {
  return encodeURIComponent(str);
}
function openShare(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
async function copyText(text) {
  // Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard API failed:', err);
    }
  }
  // fallback
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    return ok;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}
async function act(id, btn) {
  const raw = location.href;
  const u = enc(raw);
  const t = enc(document.title);
  const map = {
    copy: async () => {
      const ok = await copyText(raw);
      if (!ok) {alert('コピーできませんでした');return;}
      btn.classList.add('copied');
      const label = btn.querySelector('.sBtn-label');
      if (label) {label.textContent = 'コピーしました';}
      showToast();
      setTimeout(() => {
        btn.classList.remove('copied');
        if (label) {label.textContent = 'URLをコピー';}
      }, 2000);
    },
    native: async () => {
      if (!navigator.share) {
        alert('このブラウザはシェア機能に対応していません');
        return;
      }
      try {
        await navigator.share({title: document.title,url: raw});
      } catch (err) {if (err.name !== 'AbortError') {console.error(err);}}
},
    x: () => {openShare(`https://x.com/intent/tweet?url=${u}&text=${t}`);},
    line: () => {openShare(`https://social-plugins.line.me/lineit/share?url=${u}`);},
    threads: () => {openShare(`https://www.threads.net/intent/post?text=${t}%20${u}`);},
    sms: () => {location.href = `sms:?&body=${t}%20${u}`;},
    reddit: () => {openShare(`https://www.reddit.com/submit?url=${u}&title=${t}`);},
    hatena: () => {openShare(`https://b.hatena.ne.jp/entry?url=${u}`);},
    note: async () => {const ok = await copyText(raw);if (ok) {window.open('https://note.com/', '_blank');}},
  };
  if (map[id]) {
    map[id]();
  }
}
function showToast() {
  const el = document.getElementById('toast');
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => {
    el.classList.remove('show');
  }, 2000);
}

const grid = document.getElementById('grid');
if (grid) {
  ITEMS.forEach(({ id, label, icon }, i) => {
    const rot = ROTS[i % ROTS.length];
    const btn = document.createElement('button');
    btn.className = 'sBtn';
    btn.style.transform = `rotate(${rot}deg)`;
    btn.innerHTML = `
      <span class="sBtn-icon">${icon}</span>
      <span class="sBtn-label">${label}</span>
    `;
    btn.addEventListener('click', () => {
      act(id, btn);
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'rotate(0deg)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `rotate(${rot}deg)`;
    });
    grid.appendChild(btn);
  });
}
