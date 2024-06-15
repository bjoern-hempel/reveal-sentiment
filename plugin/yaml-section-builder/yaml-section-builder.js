!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).YamlSectionBuilder=t()}(this,(function(){"use strict";let e={},t={};const n=(e,t)=>{if(!t)return;const n=document.createElement("h2");n.classList.add("title"),n.textContent=t,e.appendChild(n)},o=(e,t)=>{if(!t)return;const n=document.createElement("div");n.classList.add("text");let o=t.split("\n");for(const e of o){const t=document.createElement("p");t.textContent=e,n.appendChild(t)}e.appendChild(n)},r=(e,t)=>{if(!t)return;const n=document.createElement("div");n.classList.add("note");let o=t.split("\n");for(const e of o){const t=document.createElement("p");t.textContent=e,n.appendChild(t)}e.appendChild(n)},i=(e,t)=>{if(!t)return;const n=document.createElement("ul");n.classList.add("links");for(const e in t){const o=t[e],r=document.createElement("li"),i=document.createElement("a");i.href=o,i.textContent=e,i.target="_blank",r.appendChild(i),n.appendChild(r)}e.appendChild(n)},s=(e,t)=>{if(!t)return;const n=document.createElement("h2");n.classList.add("question"),n.textContent=t,e.appendChild(n)},a=(n,o,r)=>{if(!o)return;"string"==typeof o&&void 0!==t[o]&&(o=t[o]);const i=document.createElement("ul");i.classList.add("answers");let s=1;for(const[t,n]of Object.entries(o)){const o=document.createElement("li"),a=document.createElement("a");switch(!0){case"string"==typeof n&&void 0!==e[n]:const t=e[n];a.href=`#${t}`;break;case"string"==typeof n&&n.startsWith("section-"):a.href=`#${n}`;break;default:const o=r+"-"+s;a.href=`#${o}`}a.textContent=t,o.appendChild(a),i.appendChild(o),s++}n.appendChild(i)},c=(e,t)=>{if(!t)return;const n=document.createElement("iframe");n.src=t,n.title="YouTube video player",n.width="80%",n.height="50%",n.frameBorder="0",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",n.allowFullScreen=!0,n.referrerPolicy="strict-origin-when-cross-origin",e.appendChild(n)},l=(n,o)=>{let r=n.answers;if(n.anchor&&(e[n.anchor]=o),!r)return;let i=1,s={};for(const[e,t]of Object.entries(r)){const n=o+"-"+i;s[e]=n,t&&l(t,n),i++}n.anchor&&(t[n.anchor]=s)},d=(e,t,l)=>{const u=e.answers,f=((e,t)=>{const l=document.createElement("section");return l.setAttribute("data-transition","slide-out"),l.setAttribute("data-auto-animate",null),l.id=t,Array.isArray(e.content)&&e.content.forEach((d=>{for(const[u,f]of Object.entries(d))switch(u){case"answers":a(l,e.answers,t);break;case"note":r(l,f);break;case"links":i(l,f);break;case"question":s(l,f);break;case"text":o(l,f);break;case"title":n(l,f);break;case"youtube":c(l,f)}})),l})(e,l);if(t.appendChild(f),!u)return;let p=1;for(const[e,n]of Object.entries(u))n&&d(n,t,l+"-"+p++)};return{id:"yaml-section-builder",init:async e=>{const t=await(async e=>{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch ${e}: ${t.statusText}`);const n=await t.text();return jsyaml.load(n)})("/plugin/yaml-section-builder/config.yml");l(t,"section");let n=(e=>{const t=document.createElement("div");return t.classList.add("slides"),d(e,t,"section"),t})(t),o=document.querySelector("div.reveal div.slides");if(o&&n)for(;n.lastChild;)o.insertBefore(n.lastChild,o.firstChild)}}}));
