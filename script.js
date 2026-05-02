<script type='text/javascript'>
//<![CDATA[
const debugDiv = document.createElement('div');
debugDiv.style.position = 'fixed';
debugDiv.style.top = '10px';
debugDiv.style.left = '10px';
debugDiv.style.background = 'rgba(0,0,0,0.8)';
debugDiv.style.color = 'yellow';
debugDiv.style.padding = '10px';
debugDiv.style.zIndex = '99999';
debugDiv.style.fontSize = '14px';
document.body.appendChild(debugDiv);

function log(msg) {
    debugDiv.innerHTML += msg + '<br>';
    console.log(msg);
}

// テスト開始
log("=== JS TEST START ===");

const externalScript = document.createElement('script');
externalScript.src = 'https://nomowood.github.io/assets/script.js';
externalScript.async = false;

externalScript.onload = () => log("✅ 外部JS読み込み <b>成功</b>");
externalScript.onerror = () => log("❌ 外部JS読み込み <b>失敗</b>");

document.head.appendChild(externalScript);

log("スクリプト読み込み試行中...");
//]]>
</script>
