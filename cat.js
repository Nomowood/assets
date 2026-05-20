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

      document.addEventListener('selectstart', e => {
    if (e.target.closest('.copy, a, button, input, textarea')) return;
    e.preventDefault();
});

document.addEventListener('copy', e => {
    if (e.target.closest('.copy, a, button, input, textarea')) return;
    e.preventDefault();
});
  });
}
