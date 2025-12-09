import{r as c,j as a}from"./index-xl9o6DcG.js";const B=({isOpen:s,position:f,items:h,onClose:i,messageId:v,bubbleRect:r,sender:x,theme:l="light"})=>{const d=c.useRef(null),[g,k]=c.useState(!1),b=c.useCallback(()=>{if(!d.current)return{position:f,slideDirection:"down"};const e=d.current.getBoundingClientRect(),n=window.innerWidth,u=window.innerHeight;let{x:o,y:t}=f,m="down";const p=8;r&&x&&(x==="user"?o=r.left:o=r.right-e.width),o+e.width>n&&(o=n-e.width-10),o<0&&(o=10);const y=u-t,N=e.height+20;return y<N||y<u/2?(m="up",r?t=Math.max(10,r.top-e.height-p):t=Math.max(10,t-e.height)):(m="down",r&&(t=r.bottom+p)),t<0&&(t=10),{position:{x:o,y:t},slideDirection:m}},[f,r,x]);c.useEffect(()=>{if(!s)return;const e=u=>{d.current&&!d.current.contains(u.target)&&i()},n=setTimeout(()=>{document.addEventListener("mousedown",e)},10);return()=>{clearTimeout(n),document.removeEventListener("mousedown",e)}},[s,i]),c.useEffect(()=>{if(!s)return;const e=n=>{n.key==="Escape"&&i()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[s,i]),c.useEffect(()=>{s&&d.current?k(!0):k(!1)},[s]);const j=e=>{e.disabled||(e.onClick(v),i())};if(!s)return null;const{position:w,slideDirection:M}=b(),E=g?M==="down"?{animation:"slideDownBounce 300ms ease-out"}:{animation:"slideUpBounce 300ms ease-out"}:{opacity:0};return a.jsxs(a.Fragment,{children:[a.jsx("style",{children:`
          @keyframes slideDownBounce {
            0% {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(4px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes slideUpBounce {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(-4px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes backdropFadeIn {
            from {
              opacity: 0;
              backdrop-filter: blur(0px);
            }
            to {
              opacity: 1;
              backdrop-filter: blur(2px);
            }
          }
        `}),g&&a.jsx("div",{className:"fixed inset-0 z-9998",style:{animation:"backdropFadeIn 250ms ease-out forwards",backdropFilter:"blur(2px)",backgroundColor:l==="dark"?"rgba(0, 0, 0, 0.5)":"rgba(0, 0, 0, 0.3)"},onClick:i,"aria-hidden":"true"}),a.jsx("div",{ref:d,role:"menu","aria-label":"Message context menu",className:`fixed z-9999 min-w-[180px] rounded-lg shadow-lg border py-1 ${l==="dark"?"bg-menu-bg-dark border-menu-border-dark":"bg-menu-bg border-menu-border"}`,style:{left:`${w.x}px`,top:`${w.y}px`,...E},children:h.map((e,n)=>a.jsxs("div",{children:[a.jsxs("button",{role:"menuitem",disabled:e.disabled,onClick:()=>j(e),className:`
              w-full px-4 py-2 text-left text-sm
              flex items-center gap-3
              transition-colors duration-150
              ${e.disabled?"text-button-disabled-text cursor-not-allowed":l==="dark"?"text-menu-text-dark hover:bg-menu-hover-bg-dark active:bg-menu-hover-bg-dark/80 cursor-pointer":"text-menu-text hover:bg-menu-hover-bg active:bg-menu-hover-bg/80 cursor-pointer"}
              ${e.className||""}
            `,"aria-disabled":e.disabled,children:[e.icon&&a.jsx("span",{className:"shrink-0 w-4 h-4 flex items-center justify-center",children:e.icon}),a.jsx("span",{className:"flex-1",children:e.label})]}),e.divider&&n<h.length-1&&a.jsx("div",{className:`my-1 h-px ${l==="dark"?"bg-menu-border-dark":"bg-menu-border"}`,role:"separator"})]},e.id))})]})};B.displayName="MessageContextMenu";export{B as M};
