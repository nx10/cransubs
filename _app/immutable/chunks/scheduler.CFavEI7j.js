function x(){}function k(t,n){for(const e in n)t[e]=n[e];return t}function v(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function w(t){return t()}function A(){return Object.create(null)}function j(t){t.forEach(w)}function D(t){return typeof t=="function"}function F(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function P(t){return Object.keys(t).length===0}function E(t,...n){if(t==null){for(const o of n)o(void 0);return x}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t,n,e){t.$$.on_destroy.push(E(n,e))}function U(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function B(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],l=Math.max(n.dirty.length,r.length);for(let u=0;u<l;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function C(t,n,e,o,r,a){if(r){const l=y(n,e,o,a);t.p(l,r)}}function G(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}let f;function _(t){f=t}function p(){if(!f)throw new Error("Function called outside component initialization");return f}function H(t){p().$$.on_mount.push(t)}function I(t){p().$$.after_update.push(t)}function J(t){p().$$.on_destroy.push(t)}const i=[],b=[];let s=[];const g=[],m=Promise.resolve();let h=!1;function O(){h||(h=!0,m.then(z))}function K(){return O(),m}function q(t){s.push(t)}const d=new Set;let c=0;function z(){if(c!==0)return;const t=f;do{try{for(;c<i.length;){const n=i[c];c++,_(n),M(n.$$)}}catch(n){throw i.length=0,c=0,n}for(_(null),i.length=0,c=0;b.length;)b.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];d.has(e)||(d.add(e),e())}s.length=0}while(i.length);for(;g.length;)g.pop()();h=!1,d.clear(),_(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function L(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{E as A,U as a,B as b,S as c,I as d,H as e,b as f,G as g,A as h,D as i,z as j,P as k,q as l,L as m,x as n,J as o,f as p,_ as q,j as r,F as s,K as t,C as u,w as v,i as w,O as x,v as y,p as z};