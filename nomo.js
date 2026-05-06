function renderPokedexItems(observer) {
    const categorySlugMap = {
        "炎を感じる":"fire","水を感じる":"water","海を感じる":"ocean","自然を感じる":"nature","風を感じる":"nicebreezes","土を感じる":"dirt","電気で動く":"electronics","花ざかり":"prettyflowers","せいけつ":"cleanliness","キズをいやす":"healing","見て楽しむ":"watching","木製":"wooden","石づくり":"stone","布仕立て":"fabric","ガラス入り":"glass","かたい":"hard","やわらかい":"soft","四角い":"blocky","まんまる":"round","ほっそり":"slender","とがっている":"sharp","ゆれる":"wobbly","まわる":"spinning","いれもの":"container","けんせつ":"construction","乗りもの":"rides","キュート":"cute","カラフル":"colorful","ゴージャス":"luxury","メタリック":"metal","シンボル":"symbol","キラキラしてる":"shiny","音が鳴る":"noisy","トレーニングできる":"exercise","みんなで使う":"groupactivities","あそびば":"playspaces","食べものそっくり":"likefood","難しそうなもの":"complicated","文字がある":"letter","フシギ":"strange","ブキミ":"spooky","ゴミ":"garbage","あつまり":"gatherings","あまい":"sweet","すっぱい":"sour","からい":"spicy","にがい":"bitter","しぶい":"dry"
    };

    document.querySelectorAll('.item-data').forEach(el => {
        const d = el.dataset;
        const name = d.name || "";
        const img = d.img || "";
        const isLeft = (d.dir || "left") === "left";
        const stars = Number(d.stars) || 0;

        // 星の生成
        let starHTML = "";
        for (let i = 1; i <= 5; i++) {
            starHTML += `<svg class="star ${i > stars ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2 2 9.3l6.9-1z"/></svg>`;
        }

        // 1. 図鑑ボックスの描画
        el.innerHTML = `
<div class="fukidashi ${isLeft ? "LeftToRight" : "RightToLeft"} inview_re">
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

        // 2. 以降のリスト生成（全部残す）
        let getHTML = "";
        const getCount = Number(d.get) || 0;
        for (let i = 1; i <= getCount; i++) {
            getHTML += `<li><span class="markerL">${d[`get${i}Title`] || ""}</span><br>${d[`get${i}Body`] || ""}</li>`;
        }

        let recipeHTML = "";
        const recipeCount = Number(d.recipe) || 0;
        for (let i = 1; i <= recipeCount; i++) {
            recipeHTML += `<li><img src="${d[`recipeimg${i}`] || ""}" alt="">${d[`recipe${i}`] || ""}</li>`;
        }

        let typeHTML = "";
        const typeCount = Number(d.type) || 0;
        for (let i = 1; i <= typeCount; i++) {
            typeHTML += `<li><img src="${d[`typeimg${i}`] || ""}" alt="">${d[`type${i}`] || ""}</li>`;
        }

        let catHTML = "";
        let catSpanHTML = "";
        const catCount = Number(d.category) || 0;
        for (let i = 1; i <= catCount; i++) {
            const cat = d[`category${i}`];
            if (!cat) continue;
            const slug = categorySlugMap[cat] || cat;
            catSpanHTML += `<a href="/p/${slug}-items-pokopia.html" style="padding:0 0.5rem">${cat}</a>`;
            catHTML += `<li><a href="/p/${slug}-items-pokopia.html">${cat}</a></li>`;
        }

        // 6. 詳細セクションの注入
        el.insertAdjacentHTML("afterend", `
        <div class="item-section">
            <h2><img src="${img}" alt="">${name}の入手方法</h2>
            ${d.getbody || ""}
            <p style="font-size:1.1em;">＼ ゲットする${getCount}つの方法 ／</p>
            <ol class="material-listY">${getHTML}</ol>
            
            ${recipeCount > 0 ? `
            <h2><img src="${img}" alt="">${name}のレシピ</h2>
            <ul class="material-list">${recipeHTML}</ul>
            <h3 class="whoa-blue">レシピの入手方法</h3>
            <p class="whoa-p">${d.recipebody || ""}</p>` : ""}

            <h2><img src="${img}" alt="">${name}の種類</h2>
            <ul class="material-list">${typeHTML}</ul>

            <h2><img src="${img}" alt="">${name}の使い道</h2>
            <p>${d.catbody || ""}ポケモンのすみかに設置すると<br>
            ${catSpanHTML}<br>のアイテムを好きなポケモンが喜びます。</p>

            <h2><img src="${img}" alt="">${name}の分類</h2>
            <ul class="material-list">${catHTML}</ul>
        </div>`);

    });

    // ★★★ 最後に監視対象を登録 ★★★
    observeInviewElements();
}
