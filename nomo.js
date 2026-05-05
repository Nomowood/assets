//<![CDATA[
document.addEventListener("DOMContentLoaded", function() {

    // 1. レイアウト調整（ローディング解除）
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 10);

    // 2. 最新記事を表示（ゆめしま）
    const newpost = document.getElementById("pokoa-posts");
    if (newpost) {
        fetch("https://nomowood.blogspot.com/feeds/posts/default/-/ゆめしま?alt=json")
            .then(response => response.json())
            .then(data => {
                const entries = data.feed.entry;
                if (!entries) return;
                entries.slice(0, 5).forEach(entry => {
                    const title = entry.title.$t;
                    const link = entry.link.find(l => l.rel === "alternate").href;
                    const media = entry.media$thumbnail?.url || "";
                    const div = document.createElement("div");
                    div.innerHTML = `<a href="${link}"><img src="${media}" alt="">${title}</a>`;
                    newpost.appendChild(div);
                });
            }).catch(err => console.error(err));
    }

    // 3. guideラベルの記事を表示
    loadGuides();

    // 4. スクロール処理（ヘッダー固定 & 出し入れ）
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        
        // クラス付与（色変更など）
        if (header) {
            header.classList.toggle('scrolled', current > 60);

            // ヘッダーの自動隠し（上にスクロールで表示、下で隠す）
            if (current > lastScroll && current > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        lastScroll = current;
    });

    // 5. 動く吹き出し（IntersectionObserver）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("is-show", entry.isIntersecting);
        });
    }, { threshold: 0.2 });
    document.querySelectorAll(".inview_re").forEach(el => observer.observe(el));

    // 6. シェアボタン設定
    setupShareButtons();

    // 7. 投稿の簡易化（図鑑ボックス生成）
    renderPokedexItems();
});

// --- 各種関数 ---

async function loadGuides() {
    const newguide = document.getElementById('guidesGrid');
    if (!newguide) return;
    const url = 'https://nomowood.blogspot.com/feeds/posts/default/-/guide?alt=json&max-results=5&orderby=published';
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.feed.entry) return;
        newguide.innerHTML = '';
        data.feed.entry.forEach(post => {
            const link = post.link.find(l => l.rel === 'alternate').href;
            const title = post.title.$t;
            const date = new Date(post.published.$t).toLocaleDateString('ja-JP', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
            const card = document.createElement('div');
            card.className = 'guide-card';
            card.innerHTML = `<div class='guide-date'>${date}</div><div class='guide-content'><h3><a href="${link}">${title}</a></h3></div>`;
            newguide.appendChild(card);
        });
    } catch (err) { console.error(err); }
}

function setupShareButtons() {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;

    let isOpen = false;
    btn.addEventListener('click', function(e) {
        if (e.target.tagName === 'I' || e.target.closest('a')) return;
        isOpen = !isOpen;
        btn.classList.toggle('active', isOpen);
    });

    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title + "\n" + location.href);
    
    const xLink = document.getElementById("x-link");
    const lineLink = document.getElementById("line-link");
    // IDが存在するかチェックしながら代入
    if(xLink) xLink.href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if(lineLink) lineLink.href = `https://social-plugins.line.me/lineit/share?url=${url}`;
    // ...他のリンクも同様
}

function renderPokedexItems() {
    const categorySlugMap = { "炎を感じる":"fire", "水を感じる":"water" /* ...以下略... */ };

    document.querySelectorAll('.item-data').forEach(el => {
        const d = el.dataset;
        const isLeft = (d.dir || "left") === "left";
        const stars = Number(d.stars) || 0;
        
        // 星の生成
        let starHTML = "";
        for (let i = 1; i <= 5; i++) {
            starHTML += `<svg class="star ${i > stars ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/></svg>`;
        }

        // 図鑑のメインHTML注入（元の el.innerHTML の内容をここに）
        // ... (中略：ご提示のロジック通り) ...
        
        // insertAdjacentHTML でセクションを追加
        // ...
    });
}
//]]>
