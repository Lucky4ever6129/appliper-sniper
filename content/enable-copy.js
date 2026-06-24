const COPY_STYLE_ID="cappliper-enable-copy";function injectCopyStyles(){if(document.getElementById(COPY_STYLE_ID))return;const t=document.createElement("style");t.id=COPY_STYLE_ID,t.textContent=`
    html.cappliper-embed,
    html.cappliper-embed *:not(input):not(textarea):not(select):not(button):not([contenteditable="true"]) {
      -webkit-user-select: text !important;
      user-select: text !important;
    }

    html.cappliper-embed input,
    html.cappliper-embed textarea,
    html.cappliper-embed [contenteditable="true"] {
      -webkit-user-select: text !important;
      user-select: text !important;
    }
  `,(document.head||document.documentElement).appendChild(t),markEmbedRoot()}function copyViaExecCommand(t){const e=document.createElement("textarea");e.value=t,e.setAttribute("readonly",""),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.opacity="0",e.style.pointerEvents="none",document.body.appendChild(e),e.focus(),e.select(),e.setSelectionRange(0,t.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return e.remove(),r}function writeClipboard(t){return new Promise((e,r)=>{chrome.runtime.sendMessage({type:"CLIPBOARD_WRITE",text:t},n=>{if(chrome.runtime.lastError){r(new Error(chrome.runtime.lastError.message));return}if(n?.ok){e();return}r(new Error(n?.error||"Clipboard write failed"))})})}async function copyText(t){if(typeof t!="string"||!t)throw new Error("Nothing to copy");if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(t);return}catch{}copyViaExecCommand(t)||await writeClipboard(t)}function installClipboardBridge(){navigator.clipboard||(navigator.clipboard={});const t=navigator.clipboard,e=t.writeText?.bind(t);t.writeText=async r=>{try{if(e){await e(r);return}}catch{}await copyText(r)}}function applyCopySupport(){isExtensionEmbed()&&(injectCopyStyles(),installClipboardBridge())}applyCopySupport(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",applyCopySupport,{once:!0});
