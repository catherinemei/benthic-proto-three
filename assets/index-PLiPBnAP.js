(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const de=(e,n)=>e===n,ce=Symbol("solid-track"),M={equals:de};let ee=re;const k=1,U=2,ne={owned:null,cleanups:null,context:null,owner:null};var N=null;let W=null,ae=null,w=null,E=null,D=null,F=0;function _(e,n){const t=w,i=N,o=e.length===0,r=n===void 0?i:n,l=o?ne:{owned:null,cleanups:null,context:r?r.context:null,owner:r},s=o?e:()=>e(()=>S(()=>q(l)));N=l,w=null;try{return P(s,!0)}finally{w=t,N=i}}function H(e,n){n=n?Object.assign({},M,n):M;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},i=o=>(typeof o=="function"&&(o=o(t.value)),oe(t,o));return[ie.bind(t),i]}function I(e,n,t){const i=X(e,n,!1,k);z(i)}function fe(e,n,t){ee=ye;const i=X(e,n,!1,k);(!t||!t.render)&&(i.user=!0),D?D.push(i):z(i)}function $(e,n,t){t=t?Object.assign({},M,t):M;const i=X(e,n,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=t.equals||void 0,z(i),ie.bind(i)}function S(e){if(w===null)return e();const n=w;w=null;try{return e()}finally{w=n}}function ue(e){fe(()=>S(e))}function te(e){return N===null||(N.cleanups===null?N.cleanups=[e]:N.cleanups.push(e)),e}function ie(){if(this.sources&&this.state)if(this.state===k)z(this);else{const e=E;E=null,P(()=>j(this),!1),E=e}if(w){const e=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(e)):(w.sources=[this],w.sourceSlots=[e]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function oe(e,n,t){let i=e.value;return(!e.comparator||!e.comparator(i,n))&&(e.value=n,e.observers&&e.observers.length&&P(()=>{for(let o=0;o<e.observers.length;o+=1){const r=e.observers[o],l=W&&W.running;l&&W.disposed.has(r),(l?!r.tState:!r.state)&&(r.pure?E.push(r):D.push(r),r.observers&&se(r)),l||(r.state=k)}if(E.length>1e6)throw E=[],new Error},!1)),n}function z(e){if(!e.fn)return;q(e);const n=F;he(e,e.value,n)}function he(e,n,t){let i;const o=N,r=w;w=N=e;try{i=e.fn(n)}catch(l){return e.pure&&(e.state=k,e.owned&&e.owned.forEach(q),e.owned=null),e.updatedAt=t+1,le(l)}finally{w=r,N=o}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?oe(e,i):e.value=i,e.updatedAt=t)}function X(e,n,t,i=k,o){const r={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:N,context:N?N.context:null,pure:t};return N===null||N!==ne&&(N.owned?N.owned.push(r):N.owned=[r]),r}function K(e){if(e.state===0)return;if(e.state===U)return j(e);if(e.suspense&&S(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<F);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===k)z(e);else if(e.state===U){const i=E;E=null,P(()=>j(e,n[0]),!1),E=i}}function P(e,n){if(E)return e();let t=!1;n||(E=[]),D?t=!0:D=[],F++;try{const i=e();return pe(t),i}catch(i){t||(D=null),E=null,le(i)}}function pe(e){if(E&&(re(E),E=null),e)return;const n=D;D=null,n.length&&P(()=>ee(n),!1)}function re(e){for(let n=0;n<e.length;n++)K(e[n])}function ye(e){let n,t=0;for(n=0;n<e.length;n++){const i=e[n];i.user?e[t++]=i:K(i)}for(n=0;n<t;n++)K(e[n])}function j(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const i=e.sources[t];if(i.sources){const o=i.state;o===k?i!==n&&(!i.updatedAt||i.updatedAt<F)&&K(i):o===U&&j(i,n)}}}function se(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=U,t.pure?E.push(t):D.push(t),t.observers&&se(t))}}function q(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),o=t.observers;if(o&&o.length){const r=o.pop(),l=t.observerSlots.pop();i<o.length&&(r.sourceSlots[l]=i,o[i]=r,t.observerSlots[i]=l)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)q(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function ge(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function le(e,n=N){throw ge(e)}const be=Symbol("fallback");function J(e){for(let n=0;n<e.length;n++)e[n]()}function me(e,n,t={}){let i=[],o=[],r=[],l=0,s=n.length>1?[]:null;return te(()=>J(r)),()=>{let p=e()||[],m,d;return p[ce],S(()=>{let f=p.length,g,C,a,u,c,h,y,b,B;if(f===0)l!==0&&(J(r),r=[],i=[],o=[],l=0,s&&(s=[])),t.fallback&&(i=[be],o[0]=_(G=>(r[0]=G,t.fallback())),l=1);else if(l===0){for(o=new Array(f),d=0;d<f;d++)i[d]=p[d],o[d]=_(x);l=f}else{for(a=new Array(f),u=new Array(f),s&&(c=new Array(f)),h=0,y=Math.min(l,f);h<y&&i[h]===p[h];h++);for(y=l-1,b=f-1;y>=h&&b>=h&&i[y]===p[b];y--,b--)a[b]=o[y],u[b]=r[y],s&&(c[b]=s[y]);for(g=new Map,C=new Array(b+1),d=b;d>=h;d--)B=p[d],m=g.get(B),C[d]=m===void 0?-1:m,g.set(B,d);for(m=h;m<=y;m++)B=i[m],d=g.get(B),d!==void 0&&d!==-1?(a[d]=o[m],u[d]=r[m],s&&(c[d]=s[m]),d=C[d],g.set(B,d)):r[m]();for(d=h;d<f;d++)d in a?(o[d]=a[d],r[d]=u[d],s&&(s[d]=c[d],s[d](d))):o[d]=_(x);o=o.slice(0,l=f),i=p.slice(0)}return o});function x(f){if(r[d]=f,s){const[g,C]=H(d);return s[d]=C,n(p[d],g)}return n(p[d])}}}function v(e,n){return S(()=>e(n||{}))}const Ce=e=>`Stale read from <${e}>.`;function V(e){const n="fallback"in e&&{fallback:()=>e.fallback};return $(me(()=>e.each,e.children,n||void 0))}function we(e){const n=e.keyed,t=$(()=>e.when,void 0,{equals:(i,o)=>n?i===o:!i==!o});return $(()=>{const i=t();if(i){const o=e.children;return typeof o=="function"&&o.length>0?S(()=>o(n?i:()=>{if(!S(t))throw Ce("Show");return e.when})):o}return e.fallback},void 0,void 0)}function Ne(e,n,t){let i=t.length,o=n.length,r=i,l=0,s=0,p=n[o-1].nextSibling,m=null;for(;l<o||s<r;){if(n[l]===t[s]){l++,s++;continue}for(;n[o-1]===t[r-1];)o--,r--;if(o===l){const d=r<i?s?t[s-1].nextSibling:t[r-s]:p;for(;s<r;)e.insertBefore(t[s++],d)}else if(r===s)for(;l<o;)(!m||!m.has(n[l]))&&n[l].remove(),l++;else if(n[l]===t[r-1]&&t[s]===n[o-1]){const d=n[--o].nextSibling;e.insertBefore(t[s++],n[l++].nextSibling),e.insertBefore(t[--r],d),n[o]=t[r]}else{if(!m){m=new Map;let x=s;for(;x<r;)m.set(t[x],x++)}const d=m.get(n[l]);if(d!=null)if(s<d&&d<r){let x=l,f=1,g;for(;++x<o&&x<r&&!((g=m.get(n[x]))==null||g!==d+f);)f++;if(f>d-s){const C=n[l];for(;s<d;)e.insertBefore(t[s++],C)}else e.replaceChild(t[s++],n[l++])}else l++;else n[l++].remove()}}}const Y="_$DX_DELEGATE";function xe(e,n,t,i={}){let o;return _(r=>{o=r,n===document?e():T(n,e(),n.firstChild?null:void 0,t)},i.owner),()=>{o(),n.textContent=""}}function L(e,n,t){let i;const o=()=>{const l=document.createElement("template");return l.innerHTML=e,t?l.content.firstChild.firstChild:l.content.firstChild},r=n?()=>S(()=>document.importNode(i||(i=o()),!0)):()=>(i||(i=o())).cloneNode(!0);return r.cloneNode=r,r}function Be(e,n=window.document){const t=n[Y]||(n[Y]=new Set);for(let i=0,o=e.length;i<o;i++){const r=e[i];t.has(r)||(t.add(r),n.addEventListener(r,Ee))}}function A(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function T(e,n,t,i){if(t!==void 0&&!i&&(i=[]),typeof n!="function")return R(e,n,i,t);I(o=>R(e,n(),o,t),i)}function Ee(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const i=t[n];if(i&&!t.disabled){const o=t[`${n}Data`];if(o!==void 0?i.call(t,o,e):i.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function R(e,n,t,i,o){for(;typeof t=="function";)t=t();if(n===t)return t;const r=typeof n,l=i!==void 0;if(e=l&&t[0]&&t[0].parentNode||e,r==="string"||r==="number")if(r==="number"&&(n=n.toString()),l){let s=t[0];s&&s.nodeType===3?s.data!==n&&(s.data=n):s=document.createTextNode(n),t=O(e,t,i,s)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||r==="boolean")t=O(e,t,i);else{if(r==="function")return I(()=>{let s=n();for(;typeof s=="function";)s=s();t=R(e,s,t,i)}),()=>t;if(Array.isArray(n)){const s=[],p=t&&Array.isArray(t);if(Q(s,n,t,o))return I(()=>t=R(e,s,t,i,!0)),()=>t;if(s.length===0){if(t=O(e,t,i),l)return t}else p?t.length===0?Z(e,s,i):Ne(e,t,s):(t&&O(e),Z(e,s));t=s}else if(n.nodeType){if(Array.isArray(t)){if(l)return t=O(e,t,i,n);O(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function Q(e,n,t,i){let o=!1;for(let r=0,l=n.length;r<l;r++){let s=n[r],p=t&&t[r],m;if(!(s==null||s===!0||s===!1))if((m=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))o=Q(e,s,p)||o;else if(m==="function")if(i){for(;typeof s=="function";)s=s();o=Q(e,Array.isArray(s)?s:[s],Array.isArray(p)?p:[p])||o}else e.push(s),o=!0;else{const d=String(s);p&&p.nodeType===3&&p.data===d?e.push(p):e.push(document.createTextNode(d))}}return o}function Z(e,n,t=null){for(let i=0,o=n.length;i<o;i++)e.insertBefore(n[i],t)}function O(e,n,t,i){if(t===void 0)return e.textContent="";const o=i||document.createTextNode("");if(n.length){let r=!1;for(let l=n.length-1;l>=0;l--){const s=n[l];if(o!==s){const p=s.parentNode===e;!r&&!l?p?e.replaceChild(o,s):e.insertBefore(o,t):p&&s.remove()}else r=!0}}else e.insertBefore(o,t);return[o]}var Ae=L('<div><ul id=parents-group tabindex=0><span>Belongs to</span></ul><ul id=parent-context tabindex=0 aria-label="Node belongs to no groupings"><span>Node belongs to no groupings</span></ul><ul id=home tabindex=0 aria-live=assertive></ul><ul id=children-group tabindex=0><span>Contains</span></ul><ul id=undo-text tabindex=0 aria-label="Pressing Undo"><span>Pressing Undo'),$e=L("<li><span aria-hidden=true> group"),De=L("<li>None"),Se=L("<li tabindex=0><span aria-hidden=true>"),ke=L("<li><span aria-hidden=true>");function Te(e){const[n,t]=H(e.nodeGraph[0].id),[i,o]=H(["0"]),[r,l]=H(new Map),s=$(()=>n()!==null?e.nodeGraph[n()]:e.nodeGraph[0]),p=()=>{const f=e.nodeGraph[n()].parents,g=i()[i().length-2];return f.indexOf(g)},m=f=>{const g=e.nodeGraph[f].parents,C=new Set;for(const a of g)for(const u of e.nodeGraph[a].children)C.add(u);return C},d=(f,g)=>{if(f===g)return;if(m(g).has(f)){const a=i();a.pop(),o([...a,g])}else if(e.nodeGraph[f].parents.includes(g)){const a=r().get(g);o([...a??["0"]])}else e.nodeGraph[f].children.includes(g)&&o(a=>[...a,g]);t(g),setTimeout(()=>{const a=document.getElementById(`info-${g}`);a&&(a.hasAttribute("tabindex")||a.setAttribute("tabindex","0"),a.focus())},0)},x=f=>{if(f.key==="ArrowUp"&&f.shiftKey){const a=document.activeElement?.id,u=i();if(a.startsWith("children")){const c=document.getElementById(`info-${n()}`);c&&c.focus()}else if(u.length>2){u.pop();const c=u[u.length-1],h=u[u.length-2];if(h&&e.nodeGraph[c].parents.includes(h))o([...u]),t(c);else{const b=r().get(c);o([...b??["0"]]),t(c)}const y=document.getElementById(`info-${c}`);y&&y.focus()}else if(u.length>1){u.pop();const c=u[u.length-1];if(c){o([...u]),t(c);const h=document.getElementById(`info-${c}`);h&&h.focus()}}else document.getElementById("parents-group")?.focus();f.preventDefault()}else if(f.key==="ArrowDown"&&f.shiftKey){if((document.activeElement?.id).startsWith("parents")){const u=document.getElementById(`info-${n()}`);u&&u.focus()}else{const u=e.nodeGraph[n()].children[0];if(u){o(h=>[...h,u]),t(u);const c=document.getElementById(`info-${u}`);c&&c.focus()}else{const c=document.getElementById("children-group");c&&c.focus()}}f.preventDefault()}else if(f.key==="h"){const C=document.getElementById("home"),a=i()[i().length-1],u=document.getElementById(`info-${a}`);u?u.focus():C?.focus()}else if(f.key==="p"){const C=e.nodeGraph[n()].parents;if(C.length>0){let u=(p()+1)%C.length;const c=C[u];let h=i();const y=h.pop();h.pop(),o(G=>[...h,c,n()]);const b=document.getElementById("parent-context"),B=document.getElementById(`info-${y}`);b&&(b.innerHTML=`Grouping by ${e.nodeGraph[c].displayName}`,b.setAttribute("aria-label",`Grouping by ${e.nodeGraph[c].displayName}`),b.focus()),setTimeout(()=>{B&&B.focus()},2e3)}f.preventDefault()}else if(f.key==="Backspace")o(C=>{const a=[...C];a.pop();const u=a[a.length-1];if(u){const c=document.getElementById("undo-text");c&&c.focus(),t(u),setTimeout(()=>{const h=document.getElementById(`info-${u}`);h&&h.focus()},1e3)}return a});else if(f.key==="ArrowLeft"||f.key==="ArrowRight"||f.key==="ArrowUp"||f.key==="ArrowDown"){const C=document.activeElement,a=C?.id;if(a.startsWith("info-")||a==="home"){const u=Array.from(document.querySelectorAll("#home li")),c=u.indexOf(C);let h=c;(f.key==="ArrowLeft"||f.key==="ArrowUp")&&c>0?h=c-1:(f.key==="ArrowRight"||f.key==="ArrowDown")&&c<u.length-1&&(h=c+1);const y=u[h]?.id.split("info-")[1];if(y){const b=i();b.pop(),o([...b,y]),t(y)}u[h]?.focus(),f.preventDefault()}else f.preventDefault()}else f.preventDefault();const g=document.getElementById("parent-context");g&&(i().length>1?(g.innerHTML=`Grouping by ${e.nodeGraph[i()[i().length-2]].displayName}`,g.setAttribute("aria-label",`Grouping by ${e.nodeGraph[i()[i().length-2]].displayName}`)):(g.innerHTML="Node belongs to no groupings",g.setAttribute("aria-label","Node belongs to no groupings")))};return ue(()=>{const f=ve(e.nodeGraph);l(f),window.addEventListener("keydown",x)}),te(()=>{window.removeEventListener("keydown",x)}),v(we,{get when(){return n()},get children(){return v(Ie,{get history(){return i()},get node(){return s()},get nodeGraph(){return e.nodeGraph},onNodeClick:d})}})}function Ie(e){function n(r){if(!e.history||e.history.length<2)return[r];{const l=e.history[e.history.length-2];return e.nodeGraph[l].children}}const t=$(()=>e.node.parents.map(r=>e.nodeGraph[r]).sort((r,l)=>r.priority-l.priority));$(()=>t().map(r=>r.descriptionTokens?.label).join(", "));const i=$(()=>e.node.children.map(r=>e.nodeGraph[r]).sort((r,l)=>r.priority-l.priority));$(()=>i().map(r=>r.descriptionTokens?.label).join(", "));const o=$(()=>{const r=n(e.node.id);return Array.from(r).map(s=>e.nodeGraph[s]).sort((s,p)=>{const m=s.priority-p.priority;return m!==0?m:Number(s.id)-Number(p.id)})});return(()=>{var r=Ae(),l=r.firstChild,s=l.firstChild,p=l.nextSibling,m=p.firstChild,d=p.nextSibling,x=d.nextSibling,f=x.firstChild,g=x.nextSibling,C=g.firstChild;return s.style.setProperty("font-weight","bold"),T(l,v(V,{get each(){return t()},children:(a,u)=>(()=>{var c=$e(),h=c.firstChild,y=h.firstChild;return c.$$click=()=>e.onNodeClick(e.node.id,a.id),T(h,()=>a.displayName,y),I(b=>{var B=`parents-${e.node.id}-${u()}`,G=`${a.displayName} group`;return B!==b.e&&A(c,"id",b.e=B),G!==b.t&&A(c,"aria-label",b.t=G),b},{e:void 0,t:void 0}),c})()}),null),A(m,"aria-hidden",!0),T(d,v(V,{get each(){return o()},get fallback(){return(()=>{var a=De();return a.style.setProperty("color","grey"),a})()},children:(a,u)=>(()=>{var c=Se(),h=c.firstChild;return c.$$click=()=>e.onNodeClick(e.node.id,a.id),T(h,()=>`${a.displayName}; ${a.descriptionTokens?.longDescription}`),I(y=>{var b=`${u()+1} of ${o().length}. ${a.displayName}; ${a.descriptionTokens?.longDescription}`,B=`info-${a.id}`;return b!==y.e&&A(c,"aria-label",y.e=b),B!==y.t&&A(c,"id",y.t=B),y},{e:void 0,t:void 0}),c})()})),f.style.setProperty("font-weight","bold"),A(f,"aria-hidden",!0),T(x,v(V,{get each(){return i()},children:(a,u)=>(()=>{var c=ke(),h=c.firstChild;return c.$$click=()=>e.onNodeClick(e.node.id,a.id),T(h,()=>a.displayName),I(y=>{var b=`children-${e.node.id}-${u()}`,B=a.displayName;return b!==y.e&&A(c,"id",y.e=b),B!==y.t&&A(c,"aria-label",y.t=B),y},{e:void 0,t:void 0}),c})()}),null),C.style.setProperty("font-weight","bold"),A(C,"aria-hidden",!0),I(a=>{var u=e.node.parents.length==0?`${e.node.displayName} belongs to 0 groups`:`${e.node.displayName} belongs to ${t().length} groups`,c=e.node.children.length===0?`${e.node.displayName} contains no nodes`:`${e.node.displayName} contains ${i().length} nodes`;return u!==a.e&&A(l,"aria-label",a.e=u),c!==a.t&&A(x,"aria-label",a.t=c),a},{e:void 0,t:void 0}),r})()}function ve(e,n="0"){const t=new Map,i=[[n,[n]]];for(;i.length>0;){const[o,r]=i.shift();if(t.has(o))continue;t.set(o,r);const l=e[o].children;for(const s of l)t.has(s)||i.push([s,[...r,s]])}return t}Be(["click"]);const Oe={0:{id:"0",displayName:"Aspirin",description:"Chemical diagram for aspirin. Contains benzene, ester, and carboxylic acid.",descriptionTokens:{label:"Aspirin",shortDescription:"Chemical diagram for aspirin. Contains benzene ring, ester, and carboxylic acid.",longDescription:"Molecule containing benzene ring, ester, and carboxylic acid."},parents:[],children:["1","2","3"],priority:0},1:{id:"1",displayName:"Benzene",description:"Benzene ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid).",descriptionTokens:{label:"Benzene",shortDescription:"Benzene ring with 6 carbons.",longDescription:"Ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid)."},parents:["0"],children:["4","5","6","7","8","9"],priority:1},2:{id:"2",displayName:"Ester",description:"Ester group bonded to C1 of benzene ring.",descriptionTokens:{label:"Ester",shortDescription:"Ester group bonded to C1 of benzene ring.",longDescription:"Group bonded to C1 of benzene ring."},parents:["0"],children:["4","10","11","12","13"],priority:2},3:{id:"3",displayName:"Carboxylic acid",description:"Carboxylic acid group bonded to C2 of benzene ring.",descriptionTokens:{label:"Carboxylic acid",shortDescription:"Carboxylic acid group bonded to C2 of benzene ring.",longDescription:"Group bonded to C2 of benzene ring."},parents:["0"],children:["5","14","15","16"],priority:2},4:{id:"4",displayName:"C1",description:"Bonded to C2 and C6 of benzene and O1 of ester.",descriptionTokens:{label:"C1",shortDescription:"Bonded to C2 and C6 of benzene and O1 of ester.",longDescription:"Bonded to C2 and C6 of benzene and O1 of ester."},parents:["1","2"],children:[],priority:2},5:{id:"5",displayName:"C2",description:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",descriptionTokens:{label:"C2",shortDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",longDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid."},parents:["1","3"],children:[],priority:2},6:{id:"6",displayName:"C3",description:"Bonded to C2 and C4 of benzene.",descriptionTokens:{label:"C3",shortDescription:"Bonded to C2 and C4 of benzene.",longDescription:"Bonded to C2 and C4 of benzene."},parents:["1"],children:[],priority:2},7:{id:"7",displayName:"C4",description:"Bonded to C3 and C5 of benzene.",descriptionTokens:{label:"C4",shortDescription:"Bonded to C3 and C5 of benzene.",longDescription:"Bonded to C3 and C5 of benzene."},parents:["1"],children:[],priority:2},8:{id:"8",displayName:"C5",description:"Bonded to C4 and C6 of benzene.",descriptionTokens:{label:"C5",shortDescription:"Bonded to C4 and C6 of benzene.",longDescription:"Bonded to C4 and C6 of benzene."},parents:["1"],children:[],priority:2},9:{id:"9",displayName:"C6",description:"Bonded to C1 and C5 of benzene.",descriptionTokens:{label:"C6",shortDescription:"Bonded to C1 and C5 of benzene.",longDescription:"Bonded to C1 and C5 of benzene."},parents:["1"],children:[],priority:2},10:{id:"10",displayName:"O1",description:"Bonded to C1 of benzene and C7 of ester.",descriptionTokens:{label:"O1",shortDescription:"Bonded to C1 of benzene and C7 of ester.",longDescription:"Bonded to C1 of benzene and C7 of ester."},parents:["2"],children:[],priority:3},11:{id:"11",displayName:"C7",description:"Bonded to O1, O2, and C8 of ester",descriptionTokens:{label:"C7",shortDescription:"Bonded to O1, O2, and C8 of ester",longDescription:"Bonded to O1, O2, and C8 of ester"},parents:["2"],children:[],priority:3},12:{id:"12",displayName:"O2",description:"Bonded to C7 of ester.",descriptionTokens:{label:"O2",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},13:{id:"13",displayName:"C8",description:"Bonded to C7 of ester.",descriptionTokens:{label:"C8",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},14:{id:"14",displayName:"C9",description:"Bonded to O3 and hydroxyl in carboxylic acid.",descriptionTokens:{label:"C9",shortDescription:"Bonded to O3 and hydroxyl in carboxylic acid.",longDescription:"Bonded to O3 and hydroxyl in carboxylic acid."},parents:["3"],children:[],priority:3},15:{id:"15",displayName:"O3",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"O3",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3},16:{id:"16",displayName:"Hydroxyl",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"Hydroxyl",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3}},Ge=()=>v(Te,{nodeGraph:Oe,showHypergraph:!1}),ze=document.getElementById("root");xe(()=>v(Ge,{}),ze);