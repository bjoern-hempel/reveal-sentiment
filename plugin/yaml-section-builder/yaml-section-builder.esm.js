let e={},t={};const n=(e,t)=>{if(!t)return;const n=document.createElement("h2");n.classList.add("title"),n.textContent=t,e.appendChild(n)},r=(e,t)=>{if(!t)return;const n=document.createElement("div");n.classList.add("text");let r=t.split("\n");for(const e of r){const t=document.createElement("p");t.textContent=e,n.appendChild(t)}e.appendChild(n)},a=(e,t)=>{if(!t)return;const n=document.createElement("div");n.classList.add("note");let r=t.split("\n");for(const e of r){const t=document.createElement("p");t.textContent=e,n.appendChild(t)}e.appendChild(n)},s=(e,t)=>{if(!t)return;const n=document.createElement("ul");n.classList.add("links");for(const e in t){const r=t[e],a=document.createElement("li"),s=document.createElement("a");s.href=r,s.textContent=e,s.target="_blank",a.appendChild(s),n.appendChild(a)}e.appendChild(n)},c=(e,t)=>{if(!t)return;const n=document.createElement("h2");n.classList.add("question"),n.textContent=t,e.appendChild(n)},o=(n,r,a)=>{if(!r)return;"string"==typeof r&&void 0!==t[r]&&(r=t[r]);const s=document.createElement("ul");s.classList.add("answers");let c=1;for(const[t,n]of Object.entries(r)){const r=document.createElement("li"),o=document.createElement("a");switch(!0){case"string"==typeof n&&void 0!==e[n]:const t=e[n];o.href=`#${t}`;break;case"string"==typeof n&&n.startsWith("page-"):o.href=`#${n}`;break;default:const r=a+"-"+c;o.href=`#${r}`}o.textContent=t,r.appendChild(o),s.appendChild(r),c++}n.appendChild(s)},i=(e,t)=>{if(!t)return;const n=document.createElement("iframe");n.src=t,n.title="YouTube video player",n.width="80%",n.height="50%",n.frameBorder="0",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",n.allowFullScreen=!0,n.referrerPolicy="strict-origin-when-cross-origin",e.appendChild(n)},l=(n,r)=>{let a=n.answers;if(n.anchor&&(e[n.anchor]=r),!a)return;let s=1,c={};for(const[e,t]of Object.entries(a)){const n=r+"-"+s;c[e]=n,t&&l(t,n),s++}n.anchor&&(t[n.anchor]=c)},d=(e,t,l)=>{const u=e.answers,p=((e,t)=>{const l=document.createElement("section");return l.setAttribute("data-auto-animate",null),l.id=t,Array.isArray(e.content)&&e.content.forEach((d=>{for(const[u,p]of Object.entries(d))switch(u){case"answers":o(l,e.answers,t);break;case"note":a(l,p);break;case"links":s(l,p);break;case"question":c(l,p);break;case"text":r(l,p);break;case"title":n(l,p);break;case"youtube":i(l,p)}})),l})(e,l);if(t.appendChild(p),!u)return;let f=1;for(const[e,n]of Object.entries(u))n&&d(n,t,l+"-"+f++)},u={id:"yaml-section-builder",init:async e=>{const t=await(async e=>{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch ${e}: ${t.statusText}`);const n=await t.text();return jsyaml.load(n)})("/plugin/yaml-section-builder/config.yml");l(t,"page");let n=(e=>{const t=document.createElement("div");return t.classList.add("slides"),d(e,t,"page"),t})(t),r=document.querySelector("div.reveal div.slides");if(r&&n)for(;n.lastChild;)r.insertBefore(n.lastChild,r.firstChild)}};export{u as default};
