(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const de=(e,t)=>e===t,ce=Symbol("solid-track"),H={equals:de};let Z=ie;const S=1,M=2,ee={owned:null,cleanups:null,context:null,owner:null};var x=null;let q=null,ae=null,w=null,N=null,E=null,F=0;function G(e,t){const n=w,o=x,i=e.length===0,s=t===void 0?o:t,c=i?ee:{owned:null,cleanups:null,context:s?s.context:null,owner:s},r=i?e:()=>e(()=>k(()=>R(c)));x=c,w=null;try{return L(r,!0)}finally{w=n,x=o}}function _(e,t){t=t?Object.assign({},H,t):H;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},o=i=>(typeof i=="function"&&(i=i(n.value)),oe(n,i));return[ne.bind(n),o]}function P(e,t,n){const o=Q(e,t,!1,S);O(o)}function fe(e,t,n){Z=ye;const o=Q(e,t,!1,S);(!n||!n.render)&&(o.user=!0),E?E.push(o):O(o)}function $(e,t,n){n=n?Object.assign({},H,n):H;const o=Q(e,t,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=n.equals||void 0,O(o),ne.bind(o)}function k(e){if(w===null)return e();const t=w;w=null;try{return e()}finally{w=t}}function ue(e){fe(()=>k(e))}function te(e){return x===null||(x.cleanups===null?x.cleanups=[e]:x.cleanups.push(e)),e}function ne(){if(this.sources&&this.state)if(this.state===S)O(this);else{const e=N;N=null,L(()=>K(this),!1),N=e}if(w){const e=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(e)):(w.sources=[this],w.sourceSlots=[e]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function oe(e,t,n){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&L(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],c=q&&q.running;c&&q.disposed.has(s),(c?!s.tState:!s.state)&&(s.pure?N.push(s):E.push(s),s.observers&&re(s)),c||(s.state=S)}if(N.length>1e6)throw N=[],new Error},!1)),t}function O(e){if(!e.fn)return;R(e);const t=F;pe(e,e.value,t)}function pe(e,t,n){let o;const i=x,s=w;w=x=e;try{o=e.fn(t)}catch(c){return e.pure&&(e.state=S,e.owned&&e.owned.forEach(R),e.owned=null),e.updatedAt=n+1,se(c)}finally{w=s,x=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?oe(e,o):e.value=o,e.updatedAt=n)}function Q(e,t,n,o=S,i){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:x,context:x?x.context:null,pure:n};return x===null||x!==ee&&(x.owned?x.owned.push(s):x.owned=[s]),s}function U(e){if(e.state===0)return;if(e.state===M)return K(e);if(e.suspense&&k(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<F);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===S)O(e);else if(e.state===M){const o=N;N=null,L(()=>K(e,t[0]),!1),N=o}}function L(e,t){if(N)return e();let n=!1;t||(N=[]),E?n=!0:E=[],F++;try{const o=e();return he(n),o}catch(o){n||(E=null),N=null,se(o)}}function he(e){if(N&&(ie(N),N=null),e)return;const t=E;E=null,t.length&&L(()=>Z(t),!1)}function ie(e){for(let t=0;t<e.length;t++)U(e[t])}function ye(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:U(o)}for(t=0;t<n;t++)U(e[t])}function K(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const o=e.sources[n];if(o.sources){const i=o.state;i===S?o!==t&&(!o.updatedAt||o.updatedAt<F)&&U(o):i===M&&K(o,t)}}}function re(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=M,n.pure?N.push(n):E.push(n),n.observers&&re(n))}}function R(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),o=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const s=i.pop(),c=n.observerSlots.pop();o<i.length&&(s.sourceSlots[c]=o,i[o]=s,n.observerSlots[o]=c)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)R(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function ge(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function se(e,t=x){throw ge(e)}const be=Symbol("fallback");function X(e){for(let t=0;t<e.length;t++)e[t]()}function Ce(e,t,n={}){let o=[],i=[],s=[],c=0,r=t.length>1?[]:null;return te(()=>X(s)),()=>{let h=e()||[],y,a;return h[ce],k(()=>{let d=h.length,l,p,u,b,C,g,m,B,T;if(d===0)c!==0&&(X(s),s=[],o=[],i=[],c=0,r&&(r=[])),n.fallback&&(o=[be],i[0]=G(le=>(s[0]=le,n.fallback())),c=1);else if(c===0){for(i=new Array(d),a=0;a<d;a++)o[a]=h[a],i[a]=G(f);c=d}else{for(u=new Array(d),b=new Array(d),r&&(C=new Array(d)),g=0,m=Math.min(c,d);g<m&&o[g]===h[g];g++);for(m=c-1,B=d-1;m>=g&&B>=g&&o[m]===h[B];m--,B--)u[B]=i[m],b[B]=s[m],r&&(C[B]=r[m]);for(l=new Map,p=new Array(B+1),a=B;a>=g;a--)T=h[a],y=l.get(T),p[a]=y===void 0?-1:y,l.set(T,a);for(y=g;y<=m;y++)T=o[y],a=l.get(T),a!==void 0&&a!==-1?(u[a]=i[y],b[a]=s[y],r&&(C[a]=r[y]),a=p[a],l.set(T,a)):s[y]();for(a=g;a<d;a++)a in u?(i[a]=u[a],s[a]=b[a],r&&(r[a]=C[a],r[a](a))):i[a]=G(f);i=i.slice(0,c=d),o=h.slice(0)}return i});function f(d){if(s[a]=d,r){const[l,p]=_(a);return r[a]=p,t(h[a],l)}return t(h[a])}}}function z(e,t){return k(()=>e(t||{}))}const me=e=>`Stale read from <${e}>.`;function V(e){const t="fallback"in e&&{fallback:()=>e.fallback};return $(Ce(()=>e.each,e.children,t||void 0))}function we(e){const t=e.keyed,n=$(()=>e.when,void 0,{equals:(o,i)=>t?o===i:!o==!i});return $(()=>{const o=n();if(o){const i=e.children;return typeof i=="function"&&i.length>0?k(()=>i(t?o:()=>{if(!k(n))throw me("Show");return e.when})):i}return e.fallback},void 0,void 0)}function xe(e,t,n){let o=n.length,i=t.length,s=o,c=0,r=0,h=t[i-1].nextSibling,y=null;for(;c<i||r<s;){if(t[c]===n[r]){c++,r++;continue}for(;t[i-1]===n[s-1];)i--,s--;if(i===c){const a=s<o?r?n[r-1].nextSibling:n[s-r]:h;for(;r<s;)e.insertBefore(n[r++],a)}else if(s===r)for(;c<i;)(!y||!y.has(t[c]))&&t[c].remove(),c++;else if(t[c]===n[s-1]&&n[r]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(n[r++],t[c++].nextSibling),e.insertBefore(n[--s],a),t[i]=n[s]}else{if(!y){y=new Map;let f=r;for(;f<s;)y.set(n[f],f++)}const a=y.get(t[c]);if(a!=null)if(r<a&&a<s){let f=c,d=1,l;for(;++f<i&&f<s&&!((l=y.get(t[f]))==null||l!==a+d);)d++;if(d>a-r){const p=t[c];for(;r<a;)e.insertBefore(n[r++],p)}else e.replaceChild(n[r++],t[c++])}else c++;else t[c++].remove()}}}const J="_$DX_DELEGATE";function Ne(e,t,n,o={}){let i;return G(s=>{i=s,t===document?e():D(t,e(),t.firstChild?null:void 0,n)},o.owner),()=>{i(),t.textContent=""}}function v(e,t,n){let o;const i=()=>{const c=document.createElement("template");return c.innerHTML=e,n?c.content.firstChild.firstChild:c.content.firstChild},s=t?()=>k(()=>document.importNode(o||(o=i()),!0)):()=>(o||(o=i())).cloneNode(!0);return s.cloneNode=s,s}function Be(e,t=window.document){const n=t[J]||(t[J]=new Set);for(let o=0,i=e.length;o<i;o++){const s=e[o];n.has(s)||(n.add(s),t.addEventListener(s,Ae))}}function A(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function D(e,t,n,o){if(n!==void 0&&!o&&(o=[]),typeof t!="function")return j(e,t,o,n);P(i=>j(e,t(),i,n),o)}function Ae(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const o=n[t];if(o&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?o.call(n,i,e):o.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function j(e,t,n,o,i){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,c=o!==void 0;if(e=c&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),c){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=I(e,n,o,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=I(e,n,o);else{if(s==="function")return P(()=>{let r=t();for(;typeof r=="function";)r=r();n=j(e,r,n,o)}),()=>n;if(Array.isArray(t)){const r=[],h=n&&Array.isArray(n);if(W(r,t,n,i))return P(()=>n=j(e,r,n,o,!0)),()=>n;if(r.length===0){if(n=I(e,n,o),c)return n}else h?n.length===0?Y(e,r,o):xe(e,n,r):(n&&I(e),Y(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(c)return n=I(e,n,o,t);I(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function W(e,t,n,o){let i=!1;for(let s=0,c=t.length;s<c;s++){let r=t[s],h=n&&n[s],y;if(!(r==null||r===!0||r===!1))if((y=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=W(e,r,h)||i;else if(y==="function")if(o){for(;typeof r=="function";)r=r();i=W(e,Array.isArray(r)?r:[r],Array.isArray(h)?h:[h])||i}else e.push(r),i=!0;else{const a=String(r);h&&h.nodeType===3&&h.data===a?e.push(h):e.push(document.createTextNode(a))}}return i}function Y(e,t,n=null){for(let o=0,i=t.length;o<i;o++)e.insertBefore(t[o],n)}function I(e,t,n,o){if(n===void 0)return e.textContent="";const i=o||document.createTextNode("");if(t.length){let s=!1;for(let c=t.length-1;c>=0;c--){const r=t[c];if(i!==r){const h=r.parentNode===e;!s&&!c?h?e.replaceChild(i,r):e.insertBefore(i,n):h&&r.remove()}else s=!0}}else e.insertBefore(i,n);return[i]}var $e=v("<div><button id=hidden-focus aria-hidden=true>Pressing Undo</button><button id=switch-focus aria-hidden=true>Switching Parent"),Ee=v("<div><ul id=home tabindex=0></ul><ul id=parents-group tabindex=0><span>Belongs to</span></ul><ul id=children-group tabindex=0><span>Contains"),De=v("<li>None"),ke=v("<li tabindex=0><span aria-hidden=true>"),Se=v("<li><span aria-hidden=true> group"),Pe=v("<li><span aria-hidden=true>");function ze(e){const[t,n]=_(e.nodeGraph[0].id),[o,i]=_(["0"]),[s,c]=_(new Map),r=$(()=>t()!==null?e.nodeGraph[t()]:e.nodeGraph[0]),h=()=>{const f=e.nodeGraph[t()].parents,d=o()[o().length-2];return f.indexOf(d)},y=(f,d)=>{i(l=>[...l,f]),n(d),setTimeout(()=>{const l=document.getElementById(`info-${d}`);l&&(l.hasAttribute("tabindex")||l.setAttribute("tabindex","0"),l.focus())},0)},a=f=>{if(f.key==="ArrowUp"&&f.shiftKey){const d=o();if(d.length>2){d.pop();const l=d[d.length-1],p=d[d.length-2];if(p&&e.nodeGraph[l].parents.includes(p))i([...d]),n(l);else{const b=s().get(l);i([...b??["0"]]),n(l)}const u=document.getElementById(`info-${l}`);u&&u.focus()}else if(d.length>1){d.pop();const l=d[d.length-1];if(l){i([...d]),n(l);const p=document.getElementById(`info-${l}`);p&&p.focus()}}else document.getElementById("parents-group")?.focus();f.preventDefault()}else if(f.key==="ArrowDown"&&f.shiftKey){const d=e.nodeGraph[t()].children[0];if(d){i(p=>[...p,d]),n(d);const l=document.getElementById(`info-${d}`);l&&l.focus()}else{const l=document.getElementById("children-group");l&&l.focus()}f.preventDefault()}else if(f.key==="h"){const d=document.getElementById("home"),l=o()[o().length-1],p=document.getElementById(`info-${l}`);p?p.focus():d?.focus()}else if(f.key==="p"){const d=e.nodeGraph[t()].parents;if(d.length>0){let p=(h()+1)%d.length;const u=d[p];let b=o();const C=b.pop();b.pop(),i(m=>[...b,u,t()]);const g=document.getElementById("switch-focus");g&&(g.innerHTML=`Parent is ${e.nodeGraph[u].displayName}`,g.focus()),setTimeout(()=>{const m=document.getElementById(`info-${C}`);m&&m.focus()},1200)}f.preventDefault()}else if(f.key==="Backspace")i(d=>{const l=[...d];l.pop();const p=l[l.length-1];if(p){const u=document.getElementById("hidden-focus");u&&u.focus(),n(p),setTimeout(()=>{const b=document.getElementById(`info-${p}`);b&&b.focus()},700)}return l});else if(f.key==="ArrowLeft"||f.key==="ArrowRight"||f.key==="ArrowUp"||f.key==="ArrowDown"){const d=document.activeElement,l=d?.id;if(l.startsWith("info-")||l==="home"){const p=Array.from(document.querySelectorAll("#home li")),u=p.indexOf(d);let b=u;(f.key==="ArrowLeft"||f.key==="ArrowUp")&&u>0?b=u-1:(f.key==="ArrowRight"||f.key==="ArrowDown")&&u<p.length-1&&(b=u+1);const C=p[b]?.id.split("info-")[1];if(C){const g=o();g.pop(),i([...g,C]),n(C)}p[b]?.focus(),f.preventDefault()}else f.preventDefault()}else f.preventDefault()};return ue(()=>{const f=Ie(e.nodeGraph);c(f),window.addEventListener("keydown",a)}),te(()=>{window.removeEventListener("keydown",a)}),(()=>{var f=$e(),d=f.firstChild,l=d.nextSibling;return d.style.setProperty("position","absolute"),d.style.setProperty("width","1px"),d.style.setProperty("height","1px"),d.style.setProperty("margin","-1px"),d.style.setProperty("padding","0"),d.style.setProperty("border","0"),d.style.setProperty("clip","rect(0, 0, 0, 0)"),d.style.setProperty("overflow","hidden"),d.style.setProperty("white-space","nowrap"),l.style.setProperty("position","absolute"),l.style.setProperty("width","1px"),l.style.setProperty("height","1px"),l.style.setProperty("margin","-1px"),l.style.setProperty("padding","0"),l.style.setProperty("border","0"),l.style.setProperty("clip","rect(0, 0, 0, 0)"),l.style.setProperty("overflow","hidden"),l.style.setProperty("white-space","nowrap"),D(f,z(we,{get when(){return t()},get children(){return z(Te,{get history(){return o()},get node(){return r()},get nodeGraph(){return e.nodeGraph},onNodeClick:y})}}),null),f})()}function Te(e){function t(r){if(!e.history||e.history.length<2)return[r];{const h=e.history[e.history.length-2];return e.nodeGraph[h].children}}const n=$(()=>e.node.parents.map(r=>e.nodeGraph[r]).sort((r,h)=>r.priority-h.priority)),o=$(()=>n().map(r=>r.descriptionTokens?.label).join(", ")),i=$(()=>e.node.children.map(r=>e.nodeGraph[r]).sort((r,h)=>r.priority-h.priority)),s=$(()=>i().map(r=>r.descriptionTokens?.label).join(", ")),c=$(()=>{const r=t(e.node.id);return Array.from(r).map(y=>e.nodeGraph[y]).sort((y,a)=>{const f=y.priority-a.priority;return f!==0?f:Number(y.id)-Number(a.id)})});return(()=>{var r=Ee(),h=r.firstChild,y=h.nextSibling,a=y.firstChild,f=y.nextSibling,d=f.firstChild;return D(h,z(V,{get each(){return c()},get fallback(){return(()=>{var l=De();return l.style.setProperty("color","grey"),l})()},children:(l,p)=>(()=>{var u=ke(),b=u.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,l.id),D(b,()=>`${l.displayName}; ${l.descriptionTokens?.longDescription}`),P(C=>{var g=`Node ${p()+1} of ${c().length}; ${l.displayName}; ${l.descriptionTokens?.longDescription}`,m=`info-${l.id}`;return g!==C.e&&A(u,"aria-label",C.e=g),m!==C.t&&A(u,"id",C.t=m),C},{e:void 0,t:void 0}),u})()})),a.style.setProperty("font-weight","bold"),D(y,z(V,{get each(){return n()},children:(l,p)=>(()=>{var u=Se(),b=u.firstChild,C=b.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,l.id),D(b,()=>l.displayName,C),P(g=>{var m=`parents-${e.node.id}-${p()}`,B=`${l.displayName} group`;return m!==g.e&&A(u,"id",g.e=m),B!==g.t&&A(u,"aria-label",g.t=B),g},{e:void 0,t:void 0}),u})()}),null),d.style.setProperty("font-weight","bold"),A(d,"aria-hidden",!0),D(f,z(V,{get each(){return i()},children:(l,p)=>(()=>{var u=Pe(),b=u.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,l.id),D(b,()=>l.displayName),P(C=>{var g=`children-${e.node.id}-${p()}`,m=l.displayName;return g!==C.e&&A(u,"id",C.e=g),m!==C.t&&A(u,"aria-label",C.t=m),C},{e:void 0,t:void 0}),u})()}),null),P(l=>{var p=e.node.parents.length==0?`${e.node.displayName} belongs to 0 groups`:`${e.node.displayName} belongs to (${o()})`,u=e.node.children.length===0?`${e.node.displayName} contains no nodes`:`${e.node.displayName} contains (${s()})`;return p!==l.e&&A(y,"aria-label",l.e=p),u!==l.t&&A(f,"aria-label",l.t=u),l},{e:void 0,t:void 0}),r})()}function Ie(e,t="0"){const n=new Map,o=[[t,[t]]];for(;o.length>0;){const[i,s]=o.shift();if(n.has(i))continue;n.set(i,s);const c=e[i].children;for(const r of c)n.has(r)||o.push([r,[...s,r]])}return n}Be(["click"]);const ve={0:{id:"0",displayName:"Aspirin",description:"Chemical diagram for aspirin. Contains benzene, ester, and carboxylic acid.",descriptionTokens:{label:"Aspirin",shortDescription:"Chemical diagram for aspirin. Contains benzene ring, ester, and carboxylic acid.",longDescription:"Chemical diagram for aspirin. Contains benzene ring, ester, and carboxylic acid."},parents:[],children:["1","2","3"],priority:0},1:{id:"1",displayName:"Benzene",description:"Benzene ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid).",descriptionTokens:{label:"Benzene",shortDescription:"Benzene ring with 6 carbons.",longDescription:"Benzene ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid)."},parents:["0"],children:["4","5","6","7","8","9"],priority:1},2:{id:"2",displayName:"Ester",description:"Ester group bonded to C1 of benzene ring.",descriptionTokens:{label:"Ester",shortDescription:"Ester group bonded to C1 of benzene ring.",longDescription:"Ester group bonded to C1 of benzene ring."},parents:["0"],children:["4","10","11","12","13"],priority:2},3:{id:"3",displayName:"Carboxylic acid",description:"Carboxylic acid group bonded to C2 of benzene ring.",descriptionTokens:{label:"Carboxylic acid",shortDescription:"Carboxylic acid group bonded to C2 of benzene ring.",longDescription:"Carboxylic acid group bonded to C2 of benzene ring."},parents:["0"],children:["5","14","15","16"],priority:2},4:{id:"4",displayName:"C1 of benzene",description:"Bonded to C2 and C6 of benzene and O1 of ester.",descriptionTokens:{label:"C1 of benzene",shortDescription:"Bonded to C2 and C6 of benzene and O1 of ester.",longDescription:"Bonded to C2 and C6 of benzene and O1 of ester."},parents:["1","2"],children:[],priority:2},5:{id:"5",displayName:"C2 of benzene",description:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",descriptionTokens:{label:"C2 of benzene",shortDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",longDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid."},parents:["1","3"],children:[],priority:2},6:{id:"6",displayName:"C3 of benzene",description:"Bonded to C2 and C4 of benzene.",descriptionTokens:{label:"C3 of benzene",shortDescription:"Bonded to C2 and C4 of benzene.",longDescription:"Bonded to C2 and C4 of benzene."},parents:["1"],children:[],priority:2},7:{id:"7",displayName:"C4 of benzene",description:"Bonded to C3 and C5 of benzene.",descriptionTokens:{label:"C4 of benzene",shortDescription:"Bonded to C3 and C5 of benzene.",longDescription:"Bonded to C3 and C5 of benzene."},parents:["1"],children:[],priority:2},8:{id:"8",displayName:"C5 of benzene",description:"Bonded to C4 and C6 of benzene.",descriptionTokens:{label:"C5 of benzene",shortDescription:"Bonded to C4 and C6 of benzene.",longDescription:"Bonded to C4 and C6 of benzene."},parents:["1"],children:[],priority:2},9:{id:"9",displayName:"C6 of benzene",description:"Bonded to C1 and C5 of benzene.",descriptionTokens:{label:"C6 of benzene",shortDescription:"Bonded to C1 and C5 of benzene.",longDescription:"Bonded to C1 and C5 of benzene."},parents:["1"],children:[],priority:2},10:{id:"10",displayName:"O1 of ester",description:"Bonded to C1 of benzene and C7 of ester.",descriptionTokens:{label:"O1 of ester",shortDescription:"Bonded to C1 of benzene and C7 of ester.",longDescription:"Bonded to C1 of benzene and C7 of ester."},parents:["2"],children:[],priority:3},11:{id:"11",displayName:"C7 of ester",description:"Bonded to O1, O2, and C8 of ester",descriptionTokens:{label:"C7 of ester",shortDescription:"Bonded to O1, O2, and C8 of ester",longDescription:"Bonded to O1, O2, and C8 of ester"},parents:["2"],children:[],priority:3},12:{id:"12",displayName:"O2 of ester",description:"Bonded to C7 of ester.",descriptionTokens:{label:"O2 of ester",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},13:{id:"13",displayName:"C8 of ester",description:"Bonded to C7 of ester.",descriptionTokens:{label:"C8 of ester",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},14:{id:"14",displayName:"C9 of carboxylic acid",description:"Bonded to O3 and hydroxyl in carboxylic acid.",descriptionTokens:{label:"C9 of carboxylic acid",shortDescription:"Bonded to O3 and hydroxyl in carboxylic acid.",longDescription:"Bonded to O3 and hydroxyl in carboxylic acid."},parents:["3"],children:[],priority:3},15:{id:"15",displayName:"O3 of carboxylic acid",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"O3 of carboxylic acid",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3},16:{id:"16",displayName:"Hydroxyl in carboxylic acid",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"Hydroxyl in carboxylic acid",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3}},Oe=()=>z(ze,{nodeGraph:ve,showHypergraph:!1}),Le=document.getElementById("root");Ne(()=>z(Oe,{}),Le);
