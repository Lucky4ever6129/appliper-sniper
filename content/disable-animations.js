const ANIMATION_STYLE_ID="cappliper-disable-animations";function prefersReducedMotion(){return{matches:!0,media:"(prefers-reduced-motion: reduce)",onchange:null,addEventListener(){},removeEventListener(){},dispatchEvent(){return!1}}}function disableMotionPreferences(){const e=window.matchMedia.bind(window);window.matchMedia=t=>/prefers-reduced-motion/i.test(t)?prefersReducedMotion():e(t)}function injectAnimationStyles(){if(document.getElementById(ANIMATION_STYLE_ID))return;const e=document.createElement("style");e.id=ANIMATION_STYLE_ID,e.textContent=`
    html.cappliper-embed,
    html.cappliper-embed *,
    html.cappliper-embed *::before,
    html.cappliper-embed *::after {
      animation: none !important;
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition: none !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      scroll-behavior: auto !important;
    }
  `,(document.head||document.documentElement).appendChild(e),markEmbedRoot()}function applyEmbedMode(){isExtensionEmbed()&&(disableMotionPreferences(),injectAnimationStyles())}applyEmbedMode(),document.readyState==="loading"&&document.addEventListener("DOMContentLoaded",applyEmbedMode,{once:!0});
