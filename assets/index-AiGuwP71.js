(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const ae=(e,n)=>e===n,fe=Symbol("solid-track"),U={equals:ae};let te=le;const z=1,K=2,oe={owned:null,cleanups:null,context:null,owner:null};var N=null;let V=null,ue=null,x=null,E=null,S=null,q=0;function H(e,n){const t=x,o=N,i=e.length===0,s=n===void 0?o:n,l=i?oe:{owned:null,cleanups:null,context:s?s.context:null,owner:s},r=i?e:()=>e(()=>T(()=>W(l)));N=l,x=null;try{return L(r,!0)}finally{x=t,N=o}}function M(e,n){n=n?Object.assign({},U,n):U;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},o=i=>(typeof i=="function"&&(i=i(t.value)),se(t,i));return[re.bind(t),o]}function v(e,n,t){const o=J(e,n,!1,z);P(o)}function he(e,n,t){te=ge;const o=J(e,n,!1,z);(!t||!t.render)&&(o.user=!0),S?S.push(o):P(o)}function D(e,n,t){t=t?Object.assign({},U,t):U;const o=J(e,n,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=t.equals||void 0,P(o),re.bind(o)}function T(e){if(x===null)return e();const n=x;x=null;try{return e()}finally{x=n}}function pe(e){he(()=>T(e))}function ie(e){return N===null||(N.cleanups===null?N.cleanups=[e]:N.cleanups.push(e)),e}function re(){if(this.sources&&this.state)if(this.state===z)P(this);else{const e=E;E=null,L(()=>F(this),!1),E=e}if(x){const e=this.observers?this.observers.length:0;x.sources?(x.sources.push(this),x.sourceSlots.push(e)):(x.sources=[this],x.sourceSlots=[e]),this.observers?(this.observers.push(x),this.observerSlots.push(x.sources.length-1)):(this.observers=[x],this.observerSlots=[x.sources.length-1])}return this.value}function se(e,n,t){let o=e.value;return(!e.comparator||!e.comparator(o,n))&&(e.value=n,e.observers&&e.observers.length&&L(()=>{for(let i=0;i<e.observers.length;i+=1){const s=e.observers[i],l=V&&V.running;l&&V.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?E.push(s):S.push(s),s.observers&&de(s)),l||(s.state=z)}if(E.length>1e6)throw E=[],new Error},!1)),n}function P(e){if(!e.fn)return;W(e);const n=q;ye(e,e.value,n)}function ye(e,n,t){let o;const i=N,s=x;x=N=e;try{o=e.fn(n)}catch(l){return e.pure&&(e.state=z,e.owned&&e.owned.forEach(W),e.owned=null),e.updatedAt=t+1,ce(l)}finally{x=s,N=i}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?se(e,o):e.value=o,e.updatedAt=t)}function J(e,n,t,o=z,i){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:N,context:N?N.context:null,pure:t};return N===null||N!==oe&&(N.owned?N.owned.push(s):N.owned=[s]),s}function j(e){if(e.state===0)return;if(e.state===K)return F(e);if(e.suspense&&T(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<q);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===z)P(e);else if(e.state===K){const o=E;E=null,L(()=>F(e,n[0]),!1),E=o}}function L(e,n){if(E)return e();let t=!1;n||(E=[]),S?t=!0:S=[],q++;try{const o=e();return be(t),o}catch(o){t||(S=null),E=null,ce(o)}}function be(e){if(E&&(le(E),E=null),e)return;const n=S;S=null,n.length&&L(()=>te(n),!1)}function le(e){for(let n=0;n<e.length;n++)j(e[n])}function ge(e){let n,t=0;for(n=0;n<e.length;n++){const o=e[n];o.user?e[t++]=o:j(o)}for(n=0;n<t;n++)j(e[n])}function F(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const o=e.sources[t];if(o.sources){const i=o.state;i===z?o!==n&&(!o.updatedAt||o.updatedAt<q)&&j(o):i===K&&F(o,n)}}}function de(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=K,t.pure?E.push(t):S.push(t),t.observers&&de(t))}}function W(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),o=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const s=i.pop(),l=t.observerSlots.pop();o<i.length&&(s.sourceSlots[l]=o,i[o]=s,t.observerSlots[o]=l)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)W(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0}function me(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ce(e,n=N){throw me(e)}const Ce=Symbol("fallback");function Z(e){for(let n=0;n<e.length;n++)e[n]()}function we(e,n,t={}){let o=[],i=[],s=[],l=0,r=n.length>1?[]:null;return ie(()=>Z(s)),()=>{let p=e()||[],g,d;return p[fe],T(()=>{let a=p.length,y,m,b,f,c,h,u,C,w;if(a===0)l!==0&&(Z(s),s=[],o=[],i=[],l=0,r&&(r=[])),t.fallback&&(o=[Ce],i[0]=H(A=>(s[0]=A,t.fallback())),l=1);else if(l===0){for(i=new Array(a),d=0;d<a;d++)o[d]=p[d],i[d]=H(B);l=a}else{for(b=new Array(a),f=new Array(a),r&&(c=new Array(a)),h=0,u=Math.min(l,a);h<u&&o[h]===p[h];h++);for(u=l-1,C=a-1;u>=h&&C>=h&&o[u]===p[C];u--,C--)b[C]=i[u],f[C]=s[u],r&&(c[C]=r[u]);for(y=new Map,m=new Array(C+1),d=C;d>=h;d--)w=p[d],g=y.get(w),m[d]=g===void 0?-1:g,y.set(w,d);for(g=h;g<=u;g++)w=o[g],d=y.get(w),d!==void 0&&d!==-1?(b[d]=i[g],f[d]=s[g],r&&(c[d]=r[g]),d=m[d],y.set(w,d)):s[g]();for(d=h;d<a;d++)d in b?(i[d]=b[d],s[d]=f[d],r&&(r[d]=c[d],r[d](d))):i[d]=H(B);i=i.slice(0,l=a),o=p.slice(0)}return i});function B(a){if(s[d]=a,r){const[y,m]=M(d);return r[d]=m,n(p[d],y)}return n(p[d])}}}function O(e,n){return T(()=>e(n||{}))}const xe=e=>`Stale read from <${e}>.`;function Q(e){const n="fallback"in e&&{fallback:()=>e.fallback};return D(we(()=>e.each,e.children,n||void 0))}function Ne(e){const n=e.keyed,t=D(()=>e.when,void 0,{equals:(o,i)=>n?o===i:!o==!i});return D(()=>{const o=t();if(o){const i=e.children;return typeof i=="function"&&i.length>0?T(()=>i(n?o:()=>{if(!T(t))throw xe("Show");return e.when})):i}return e.fallback},void 0,void 0)}function Be(e,n,t){let o=t.length,i=n.length,s=o,l=0,r=0,p=n[i-1].nextSibling,g=null;for(;l<i||r<s;){if(n[l]===t[r]){l++,r++;continue}for(;n[i-1]===t[s-1];)i--,s--;if(i===l){const d=s<o?r?t[r-1].nextSibling:t[s-r]:p;for(;r<s;)e.insertBefore(t[r++],d)}else if(s===r)for(;l<i;)(!g||!g.has(n[l]))&&n[l].remove(),l++;else if(n[l]===t[s-1]&&t[r]===n[i-1]){const d=n[--i].nextSibling;e.insertBefore(t[r++],n[l++].nextSibling),e.insertBefore(t[--s],d),n[i]=t[s]}else{if(!g){g=new Map;let B=r;for(;B<s;)g.set(t[B],B++)}const d=g.get(n[l]);if(d!=null)if(r<d&&d<s){let B=l,a=1,y;for(;++B<i&&B<s&&!((y=g.get(n[B]))==null||y!==d+a);)a++;if(a>d-r){const m=n[l];for(;r<d;)e.insertBefore(t[r++],m)}else e.replaceChild(t[r++],n[l++])}else l++;else n[l++].remove()}}}const ee="_$DX_DELEGATE";function Ee(e,n,t,o={}){let i;return H(s=>{i=s,n===document?e():I(n,e(),n.firstChild?null:void 0,t)},o.owner),()=>{i(),n.textContent=""}}function _(e,n,t){let o;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,t?l.content.firstChild.firstChild:l.content.firstChild},s=n?()=>T(()=>document.importNode(o||(o=i()),!0)):()=>(o||(o=i())).cloneNode(!0);return s.cloneNode=s,s}function Ae(e,n=window.document){const t=n[ee]||(n[ee]=new Set);for(let o=0,i=e.length;o<i;o++){const s=e[o];t.has(s)||(t.add(s),n.addEventListener(s,$e))}}function $(e,n,t){t==null?e.removeAttribute(n):e.setAttribute(n,t)}function I(e,n,t,o){if(t!==void 0&&!o&&(o=[]),typeof n!="function")return R(e,n,o,t);v(i=>R(e,n(),i,t),o)}function $e(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const o=t[n];if(o&&!t.disabled){const i=t[`${n}Data`];if(i!==void 0?o.call(t,i,e):o.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function R(e,n,t,o,i){for(;typeof t=="function";)t=t();if(n===t)return t;const s=typeof n,l=o!==void 0;if(e=l&&t[0]&&t[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(n=n.toString()),l){let r=t[0];r&&r.nodeType===3?r.data!==n&&(r.data=n):r=document.createTextNode(n),t=G(e,t,o,r)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||s==="boolean")t=G(e,t,o);else{if(s==="function")return v(()=>{let r=n();for(;typeof r=="function";)r=r();t=R(e,r,t,o)}),()=>t;if(Array.isArray(n)){const r=[],p=t&&Array.isArray(t);if(X(r,n,t,i))return v(()=>t=R(e,r,t,o,!0)),()=>t;if(r.length===0){if(t=G(e,t,o),l)return t}else p?t.length===0?ne(e,r,o):Be(e,t,r):(t&&G(e),ne(e,r));t=r}else if(n.nodeType){if(Array.isArray(t)){if(l)return t=G(e,t,o,n);G(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}}return t}function X(e,n,t,o){let i=!1;for(let s=0,l=n.length;s<l;s++){let r=n[s],p=t&&t[s],g;if(!(r==null||r===!0||r===!1))if((g=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=X(e,r,p)||i;else if(g==="function")if(o){for(;typeof r=="function";)r=r();i=X(e,Array.isArray(r)?r:[r],Array.isArray(p)?p:[p])||i}else e.push(r),i=!0;else{const d=String(r);p&&p.nodeType===3&&p.data===d?e.push(p):e.push(document.createTextNode(d))}}return i}function ne(e,n,t=null){for(let o=0,i=n.length;o<i;o++)e.insertBefore(n[o],t)}function G(e,n,t,o){if(t===void 0)return e.textContent="";const i=o||document.createTextNode("");if(n.length){let s=!1;for(let l=n.length-1;l>=0;l--){const r=n[l];if(i!==r){const p=r.parentNode===e;!s&&!l?p?e.replaceChild(i,r):e.insertBefore(i,t):p&&r.remove()}else s=!0}}else e.insertBefore(i,t);return[i]}var De=_('<div><ul id=parent-context tabindex=0 aria-label="No context"><span>No context</span></ul><ul id=parents-group tabindex=0><span>Belongs to</span></ul><ul id=home tabindex=0 aria-live=assertive></ul><ul id=children-group tabindex=0><span>Contains</span></ul><ul id=undo-text tabindex=0 aria-label="Pressing Undo"><span>Pressing Undo'),Se=_("<li><span aria-hidden=true> group"),ke=_("<li>None"),Te=_("<li tabindex=0><span aria-hidden=true>"),ze=_("<li><span aria-hidden=true>");function Ie(e){const[n,t]=M(e.nodeGraph[0].id),[o,i]=M(["0"]),[s,l]=M(new Map),r=D(()=>n()!==null?e.nodeGraph[n()]:e.nodeGraph[0]),p=()=>{const a=e.nodeGraph[n()].parents,y=o()[o().length-2];return a.indexOf(y)},g=a=>{const y=e.nodeGraph[a].parents,m=new Set;for(const b of y)for(const f of e.nodeGraph[b].children)m.add(f);return m},d=(a,y)=>{if(a===y)return;if(g(y).has(a)){const b=o();b.pop(),i([...b,y])}else if(e.nodeGraph[a].parents.includes(y)){const b=s().get(y);i([...b??["0"]])}else e.nodeGraph[a].children.includes(y)&&i(b=>[...b,y]);t(y),setTimeout(()=>{const b=document.getElementById(`info-${y}`);b&&(b.hasAttribute("tabindex")||b.setAttribute("tabindex","0"),b.focus())},0)},B=a=>{if(a.key==="ArrowUp"&&a.shiftKey){const b=document.activeElement?.id,f=o();if(b.startsWith("children")){const c=document.getElementById(`info-${n()}`);c&&c.focus()}else if(f.length>2){f.pop();const c=f[f.length-1],h=f[f.length-2];if(h&&e.nodeGraph[c].parents.includes(h))i([...f]),t(c);else{const C=s().get(c);i([...C??["0"]]),t(c)}const u=document.getElementById(`info-${c}`);u&&u.focus()}else if(f.length>1){f.pop();const c=f[f.length-1];if(c){i([...f]),t(c);const h=document.getElementById(`info-${c}`);h&&h.focus()}}else document.getElementById("parents-group")?.focus();a.preventDefault()}else if(a.key==="ArrowDown"&&a.shiftKey){if((document.activeElement?.id).startsWith("parents")){const f=document.getElementById(`info-${n()}`);f&&f.focus()}else{const f=e.nodeGraph[n()].children[0];if(f){i(h=>[...h,f]),t(f);const c=document.getElementById(`info-${f}`);c&&c.focus()}else{const c=document.getElementById("children-group");c&&c.focus()}}a.preventDefault()}else if(a.key==="h"){const m=document.getElementById("home"),b=o()[o().length-1],f=document.getElementById(`info-${b}`);f?f.focus():m?.focus()}else if(a.key==="p"){const m=e.nodeGraph[n()].parents;if(m.length>0){let f=(p()+1)%m.length;const c=m[f];let h=o();const u=h.pop();h.pop(),i(A=>[...h,c,n()]);const C=document.getElementById("parent-context"),w=document.getElementById(`info-${u}`);C&&(C.innerHTML=`Grouping by ${e.nodeGraph[c].displayName}`,C.setAttribute("aria-label",`Grouping by ${e.nodeGraph[c].displayName}`),C.focus()),setTimeout(()=>{w&&w.focus()},1500)}a.preventDefault()}else if(a.key==="Backspace")i(m=>{const b=[...m];b.pop();const f=b[b.length-1];if(f){const c=document.getElementById("undo-text");c&&c.focus(),t(f),setTimeout(()=>{const h=document.getElementById(`info-${f}`);h&&h.focus()},800)}return b});else if(a.key==="ArrowLeft"||a.key==="ArrowRight"||a.key==="ArrowUp"||a.key==="ArrowDown"){const m=document.activeElement,b=m?.id;if(b.startsWith("info-")||b==="home"){const f=Array.from(document.querySelectorAll("#home li")),c=f.indexOf(m);let h=c;(a.key==="ArrowLeft"||a.key==="ArrowUp")&&c>0?h=c-1:(a.key==="ArrowRight"||a.key==="ArrowDown")&&c<f.length-1&&(h=c+1);const u=f[h]?.id.split("info-")[1];if(u){const C=o();C.pop(),i([...C,u]),t(u)}f[h]?.focus(),a.preventDefault()}else a.preventDefault()}else a.preventDefault();const y=document.getElementById("parent-context");y&&(o().length>1?(y.innerHTML=`Grouping by ${e.nodeGraph[o()[o().length-2]].displayName}`,y.setAttribute("aria-label",`Grouping by ${e.nodeGraph[o()[o().length-2]].displayName}`)):(y.innerHTML="No context",y.setAttribute("aria-label","No context")))};return pe(()=>{const a=Oe(e.nodeGraph);l(a),window.addEventListener("keydown",B)}),ie(()=>{window.removeEventListener("keydown",B)}),O(Ne,{get when(){return n()},get children(){return O(ve,{get history(){return o()},get node(){return r()},get nodeGraph(){return e.nodeGraph},onNodeClick:d})}})}function ve(e){function n(r){if(!e.history||e.history.length<2)return[r];{const p=e.history[e.history.length-2];return e.nodeGraph[p].children}}const t=D(()=>e.node.parents.map(r=>e.nodeGraph[r]).sort((r,p)=>r.priority-p.priority)),o=D(()=>t().map(r=>r.descriptionTokens?.label).join(", ")),i=D(()=>e.node.children.map(r=>e.nodeGraph[r]).sort((r,p)=>r.priority-p.priority)),s=D(()=>i().map(r=>r.descriptionTokens?.label).join(", ")),l=D(()=>{const r=n(e.node.id);return Array.from(r).map(g=>e.nodeGraph[g]).sort((g,d)=>{const B=g.priority-d.priority;return B!==0?B:Number(g.id)-Number(d.id)})});return(()=>{var r=De(),p=r.firstChild,g=p.firstChild,d=p.nextSibling,B=d.firstChild,a=d.nextSibling,y=a.nextSibling,m=y.firstChild,b=y.nextSibling,f=b.firstChild;return $(g,"aria-hidden",!0),B.style.setProperty("font-weight","bold"),I(d,O(Q,{get each(){return t()},children:(c,h)=>(()=>{var u=Se(),C=u.firstChild,w=C.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,c.id),I(C,()=>c.displayName,w),v(A=>{var k=`parents-${e.node.id}-${h()}`,Y=`${c.displayName} group`;return k!==A.e&&$(u,"id",A.e=k),Y!==A.t&&$(u,"aria-label",A.t=Y),A},{e:void 0,t:void 0}),u})()}),null),I(a,O(Q,{get each(){return l()},get fallback(){return(()=>{var c=ke();return c.style.setProperty("color","grey"),c})()},children:(c,h)=>(()=>{var u=Te(),C=u.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,c.id),I(C,()=>`${c.displayName}; ${c.descriptionTokens?.longDescription}`),v(w=>{var A=`Node ${h()+1} of ${l().length}; ${c.displayName}; ${c.descriptionTokens?.longDescription}`,k=`info-${c.id}`;return A!==w.e&&$(u,"aria-label",w.e=A),k!==w.t&&$(u,"id",w.t=k),w},{e:void 0,t:void 0}),u})()})),m.style.setProperty("font-weight","bold"),$(m,"aria-hidden",!0),I(y,O(Q,{get each(){return i()},children:(c,h)=>(()=>{var u=ze(),C=u.firstChild;return u.$$click=()=>e.onNodeClick(e.node.id,c.id),I(C,()=>c.displayName),v(w=>{var A=`children-${e.node.id}-${h()}`,k=c.displayName;return A!==w.e&&$(u,"id",w.e=A),k!==w.t&&$(u,"aria-label",w.t=k),w},{e:void 0,t:void 0}),u})()}),null),f.style.setProperty("font-weight","bold"),$(f,"aria-hidden",!0),v(c=>{var h=e.node.parents.length==0?`${e.node.displayName} belongs to 0 groups`:`${e.node.displayName} belongs to (${o()})`,u=e.node.children.length===0?`${e.node.displayName} contains no nodes`:`${e.node.displayName} contains (${s()})`;return h!==c.e&&$(d,"aria-label",c.e=h),u!==c.t&&$(y,"aria-label",c.t=u),c},{e:void 0,t:void 0}),r})()}function Oe(e,n="0"){const t=new Map,o=[[n,[n]]];for(;o.length>0;){const[i,s]=o.shift();if(t.has(i))continue;t.set(i,s);const l=e[i].children;for(const r of l)t.has(r)||o.push([r,[...s,r]])}return t}Ae(["click"]);const Ge={0:{id:"0",displayName:"Aspirin",description:"Chemical diagram for aspirin. Contains benzene, ester, and carboxylic acid.",descriptionTokens:{label:"Aspirin",shortDescription:"Chemical diagram for aspirin. Contains benzene ring, ester, and carboxylic acid.",longDescription:"Chemical diagram for aspirin. Contains benzene ring, ester, and carboxylic acid."},parents:[],children:["1","2","3"],priority:0},1:{id:"1",displayName:"Benzene",description:"Benzene ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid).",descriptionTokens:{label:"Benzene",shortDescription:"Benzene ring with 6 carbons.",longDescription:"Benzene ring with 6 carbons. Substitutions at position 1 (ester) and position 2 (carboxylic acid)."},parents:["0"],children:["4","5","6","7","8","9"],priority:1},2:{id:"2",displayName:"Ester",description:"Ester group bonded to C1 of benzene ring.",descriptionTokens:{label:"Ester",shortDescription:"Ester group bonded to C1 of benzene ring.",longDescription:"Ester group bonded to C1 of benzene ring."},parents:["0"],children:["4","10","11","12","13"],priority:2},3:{id:"3",displayName:"Carboxylic acid",description:"Carboxylic acid group bonded to C2 of benzene ring.",descriptionTokens:{label:"Carboxylic acid",shortDescription:"Carboxylic acid group bonded to C2 of benzene ring.",longDescription:"Carboxylic acid group bonded to C2 of benzene ring."},parents:["0"],children:["5","14","15","16"],priority:2},4:{id:"4",displayName:"C1 of benzene",description:"Bonded to C2 and C6 of benzene and O1 of ester.",descriptionTokens:{label:"C1 of benzene",shortDescription:"Bonded to C2 and C6 of benzene and O1 of ester.",longDescription:"Bonded to C2 and C6 of benzene and O1 of ester."},parents:["1","2"],children:[],priority:2},5:{id:"5",displayName:"C2 of benzene",description:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",descriptionTokens:{label:"C2 of benzene",shortDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid.",longDescription:"Bonded to C1 and C3 of benzene and C9 of carboxylic acid."},parents:["1","3"],children:[],priority:2},6:{id:"6",displayName:"C3 of benzene",description:"Bonded to C2 and C4 of benzene.",descriptionTokens:{label:"C3 of benzene",shortDescription:"Bonded to C2 and C4 of benzene.",longDescription:"Bonded to C2 and C4 of benzene."},parents:["1"],children:[],priority:2},7:{id:"7",displayName:"C4 of benzene",description:"Bonded to C3 and C5 of benzene.",descriptionTokens:{label:"C4 of benzene",shortDescription:"Bonded to C3 and C5 of benzene.",longDescription:"Bonded to C3 and C5 of benzene."},parents:["1"],children:[],priority:2},8:{id:"8",displayName:"C5 of benzene",description:"Bonded to C4 and C6 of benzene.",descriptionTokens:{label:"C5 of benzene",shortDescription:"Bonded to C4 and C6 of benzene.",longDescription:"Bonded to C4 and C6 of benzene."},parents:["1"],children:[],priority:2},9:{id:"9",displayName:"C6 of benzene",description:"Bonded to C1 and C5 of benzene.",descriptionTokens:{label:"C6 of benzene",shortDescription:"Bonded to C1 and C5 of benzene.",longDescription:"Bonded to C1 and C5 of benzene."},parents:["1"],children:[],priority:2},10:{id:"10",displayName:"O1 of ester",description:"Bonded to C1 of benzene and C7 of ester.",descriptionTokens:{label:"O1 of ester",shortDescription:"Bonded to C1 of benzene and C7 of ester.",longDescription:"Bonded to C1 of benzene and C7 of ester."},parents:["2"],children:[],priority:3},11:{id:"11",displayName:"C7 of ester",description:"Bonded to O1, O2, and C8 of ester",descriptionTokens:{label:"C7 of ester",shortDescription:"Bonded to O1, O2, and C8 of ester",longDescription:"Bonded to O1, O2, and C8 of ester"},parents:["2"],children:[],priority:3},12:{id:"12",displayName:"O2 of ester",description:"Bonded to C7 of ester.",descriptionTokens:{label:"O2 of ester",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},13:{id:"13",displayName:"C8 of ester",description:"Bonded to C7 of ester.",descriptionTokens:{label:"C8 of ester",shortDescription:"Bonded to C7 of ester.",longDescription:"Bonded to C7 of ester."},parents:["2"],children:[],priority:3},14:{id:"14",displayName:"C9 of carboxylic acid",description:"Bonded to O3 and hydroxyl in carboxylic acid.",descriptionTokens:{label:"C9 of carboxylic acid",shortDescription:"Bonded to O3 and hydroxyl in carboxylic acid.",longDescription:"Bonded to O3 and hydroxyl in carboxylic acid."},parents:["3"],children:[],priority:3},15:{id:"15",displayName:"O3 of carboxylic acid",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"O3 of carboxylic acid",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3},16:{id:"16",displayName:"Hydroxyl in carboxylic acid",description:"Bonded to C9 of carboxylic acid.",descriptionTokens:{label:"Hydroxyl in carboxylic acid",shortDescription:"Bonded to C9 of carboxylic acid.",longDescription:"Bonded to C9 of carboxylic acid."},parents:["3"],children:[],priority:3}},Pe=()=>O(Ie,{nodeGraph:Ge,showHypergraph:!1}),Le=document.getElementById("root");Ee(()=>O(Pe,{}),Le);
