import{s as se,n as T,c as B,o as ne,i as ae}from"../chunks/scheduler.CFavEI7j.js";import{S as ie,i as oe,s as S,e as E,p as F,k as re,d as p,f as U,c as I,a as V,l as z,q as O,m as _,g as A,h as f,r as G,u as te,t as q,b as D,n as ue,j,v as le,o as J}from"../chunks/index.PlDuVgLQ.js";import{h as K,u as ce,s as fe,i as H,p as Q}from"../chunks/stores.DllaMEqT.js";import{b as L}from"../chunks/paths.DPiXgNYY.js";import{p as W}from"../chunks/stores.hAGKZ7W-.js";function R(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function X(n,e,t){const a=n.slice();return a[9]=e[t],a}function Y(n,e,t){const a=n.slice();return a[12]=e[t],a[14]=t,a}function he(n){let e,t=n[15].message+"",a;return{c(){e=E("p"),a=q(t),this.h()},l(c){e=I(c,"P",{style:!0});var r=V(e);a=D(r,t),r.forEach(p),this.h()},h(){ue(e,"color","red")},m(c,r){A(c,e,r),f(e,a)},p(c,r){r&4&&t!==(t=c[15].message+"")&&j(a,t)},d(c){c&&p(e)}}}function de(n){let e,t,a,c=`<a href="${L}/about" class="my-4">About this page</a>`,r,s,u,g=H(n[8].capture_time)+"",k,h,b=n[8].capture_duration/1e3+"",C,N,y=n[8].update_interval/60+"",v,x,d=R(n[8].queues),i=[];for(let l=0;l<d.length;l+=1)i[l]=ee(X(n,d,l));let o=null;return d.length||(o=Z()),{c(){for(let l=0;l<i.length;l+=1)i[l].c();o&&o.c(),e=S(),t=E("div"),a=E("span"),a.innerHTML=c,r=S(),s=E("span"),u=q("Updated "),k=q(g),h=q(" in "),C=q(b),N=q(` seconds. Updating
				every `),v=q(y),x=q(" minutes."),this.h()},l(l){for(let P=0;P<i.length;P+=1)i[P].l(l);o&&o.l(l),e=U(l),t=I(l,"DIV",{class:!0});var w=V(t);a=I(w,"SPAN",{class:!0,"data-svelte-h":!0}),z(a)!=="svelte-90mfgm"&&(a.innerHTML=c),r=U(w),s=I(w,"SPAN",{class:!0});var m=V(s);u=D(m,"Updated "),k=D(m,g),h=D(m," in "),C=D(m,b),N=D(m,` seconds. Updating
				every `),v=D(m,y),x=D(m," minutes."),m.forEach(p),w.forEach(p),this.h()},h(){_(a,"class","hover:underline text-slate-600"),_(s,"class","float-right text-sm font-light"),_(t,"class","text-slate-500 my-4")},m(l,w){for(let m=0;m<i.length;m+=1)i[m]&&i[m].m(l,w);o&&o.m(l,w),A(l,e,w),A(l,t,w),f(t,a),f(t,r),f(t,s),f(s,u),f(s,k),f(s,h),f(s,C),f(s,N),f(s,v),f(s,x)},p(l,w){if(w&14){d=R(l[8].queues);let m;for(m=0;m<d.length;m+=1){const P=X(l,d,m);i[m]?i[m].p(P,w):(i[m]=ee(P),i[m].c(),i[m].m(e.parentNode,e))}for(;m<i.length;m+=1)i[m].d(1);i.length=d.length,!d.length&&o?o.p(l,w):d.length?o&&(o.d(1),o=null):(o=Z(),o.c(),o.m(e.parentNode,e))}w&4&&g!==(g=H(l[8].capture_time)+"")&&j(k,g),w&4&&b!==(b=l[8].capture_duration/1e3+"")&&j(C,b),w&4&&y!==(y=l[8].update_interval/60+"")&&j(v,y)},d(l){l&&(p(e),p(t)),le(i,l),o&&o.d(l)}}}function Z(n){let e,t="No submissions match the search query.";return{c(){e=E("p"),e.textContent=t,this.h()},l(a){e=I(a,"P",{class:!0,"data-svelte-h":!0}),z(e)!=="svelte-14j46sp"&&(e.textContent=t),this.h()},h(){_(e,"class","text-slate-800")},m(a,c){A(a,e,c)},p:T,d(a){a&&p(e)}}}function pe(n){let e,t,a,c=n[9].queue.length-10+"",r,s,u,g;return{c(){e=E("div"),t=E("div"),a=q("Show "),r=q(c),s=q(" more..."),this.h()},l(k){e=I(k,"DIV",{class:!0});var h=V(e);t=I(h,"DIV",{class:!0});var b=V(t);a=D(b,"Show "),r=D(b,c),s=D(b," more..."),b.forEach(p),h.forEach(p),this.h()},h(){_(t,"class","text-slate-600 py-1"),_(e,"class","flex flex-row space-x-1 items-center justify-center hover:bg-slate-200 odd:bg-white even:bg-slate-50 cursor-pointer")},m(k,h){A(k,e,h),f(e,t),f(t,a),f(t,r),f(t,s),u||(g=te(e,"click",function(){ae(n[3](n[9]))&&n[3](n[9]).apply(this,arguments)},{once:!0}),u=!0)},p(k,h){n=k,h&4&&c!==(c=n[9].queue.length-10+"")&&j(r,c)},d(k){k&&p(e),u=!1,g()}}}function ve(n){let e,t,a,c=n[14]+1+"",r,s,u,g=n[12].pkg_name+"",k,h,b,C=n[12].pkg_version+"",N,y,v,x=H(n[12].file_time)+"",d,i;return{c(){e=E("a"),t=E("div"),a=q("#"),r=q(c),s=S(),u=E("div"),k=q(g),h=S(),b=E("div"),N=q(C),y=S(),v=E("div"),d=q(x),this.h()},l(o){e=I(o,"A",{href:!0,class:!0});var l=V(e);t=I(l,"DIV",{class:!0});var w=V(t);a=D(w,"#"),r=D(w,c),w.forEach(p),s=U(l),u=I(l,"DIV",{class:!0});var m=V(u);k=D(m,g),m.forEach(p),h=U(l),b=I(l,"DIV",{class:!0});var P=V(b);N=D(P,C),P.forEach(p),y=U(l),v=I(l,"DIV",{class:!0});var M=V(v);d=D(M,x),M.forEach(p),l.forEach(p),this.h()},h(){_(t,"class","font-light text-sm w-14 text-slate-500"),_(u,"class","text-slate-900"),_(b,"class","text-sm text-slate-500 flex-auto"),_(v,"class","text-sm font-light"),_(e,"href",i=L+Q(n[12])),_(e,"class","flex flex-row space-x-1 items-center hover:bg-slate-200 odd:bg-white even:bg-slate-50 px-2 py-1 first:rounded-t-md last:rounded-b-md")},m(o,l){A(o,e,l),f(e,t),f(t,a),f(t,r),f(e,s),f(e,u),f(u,k),f(e,h),f(e,b),f(b,N),f(e,y),f(e,v),f(v,d)},p(o,l){l&4&&g!==(g=o[12].pkg_name+"")&&j(k,g),l&4&&C!==(C=o[12].pkg_version+"")&&j(N,C),l&4&&x!==(x=H(o[12].file_time)+"")&&j(d,x),l&4&&i!==(i=L+Q(o[12]))&&_(e,"href",i)},d(o){o&&p(e)}}}function $(n){let e,t;function a(s,u){if(u&6&&(e=null),e==null&&(e=s[1].indexOf(s[9])!==-1||s[14]<5||s[14]>s[9].queue.length-6),e)return ve;if(s[14]==5)return pe}let c=a(n,-1),r=c&&c(n);return{c(){r&&r.c(),t=J()},l(s){r&&r.l(s),t=J()},m(s,u){r&&r.m(s,u),A(s,t,u)},p(s,u){c===(c=a(s,u))&&r?r.p(s,u):(r&&r.d(1),r=c&&c(s),r&&(r.c(),r.m(t.parentNode,t)))},d(s){s&&p(t),r&&r.d(s)}}}function ee(n){let e,t,a=n[9].info.name+"",c,r,s,u=n[9].queue.length+"",g,k,h,b,C=n[9].info.description+"",N,y,v,x=R(n[9].queue),d=[];for(let i=0;i<x.length;i+=1)d[i]=$(Y(n,x,i));return{c(){e=E("div"),t=E("div"),c=q(a),r=S(),s=E("div"),g=q(u),k=q(" packages"),h=S(),b=E("p"),N=q(C),y=S(),v=E("div");for(let i=0;i<d.length;i+=1)d[i].c();this.h()},l(i){e=I(i,"DIV",{class:!0});var o=V(e);t=I(o,"DIV",{class:!0});var l=V(t);c=D(l,a),l.forEach(p),r=U(o),s=I(o,"DIV",{class:!0});var w=V(s);g=D(w,u),k=D(w," packages"),w.forEach(p),o.forEach(p),h=U(i),b=I(i,"P",{class:!0});var m=V(b);N=D(m,C),m.forEach(p),y=U(i),v=I(i,"DIV",{class:!0});var P=V(v);for(let M=0;M<d.length;M+=1)d[M].l(P);P.forEach(p),this.h()},h(){_(t,"class","flex-auto text-2xl font-bold"),_(s,"class","text-slate-500"),_(e,"class","flex flex-row space-x-1 items-end pt-3 mb-1"),_(b,"class","italic text-sm text-slate-600"),_(v,"class","flex flex-col border border-slate-300 rounded-md mt-2")},m(i,o){A(i,e,o),f(e,t),f(t,c),f(e,r),f(e,s),f(s,g),f(s,k),A(i,h,o),A(i,b,o),f(b,N),A(i,y,o),A(i,v,o);for(let l=0;l<d.length;l+=1)d[l]&&d[l].m(v,null)},p(i,o){if(o&4&&a!==(a=i[9].info.name+"")&&j(c,a),o&4&&u!==(u=i[9].queue.length+"")&&j(g,u),o&4&&C!==(C=i[9].info.description+"")&&j(N,C),o&14){x=R(i[9].queue);let l;for(l=0;l<x.length;l+=1){const w=Y(i,x,l);d[l]?d[l].p(w,o):(d[l]=$(w),d[l].c(),d[l].m(v,null))}for(;l<d.length;l+=1)d[l].d(1);d.length=x.length}},d(i){i&&(p(e),p(h),p(b),p(y),p(v)),le(d,i)}}}function _e(n){let e,t="Fetching snapshot...";return{c(){e=E("p"),e.textContent=t},l(a){e=I(a,"P",{"data-svelte-h":!0}),z(e)!=="svelte-13nyggy"&&(e.textContent=t)},m(a,c){A(a,e,c)},p:T,d(a){a&&p(e)}}}function me(n){let e,t,a,c='<div class="text-3xl font-bold pr-2 text-slate-600 text-center mb-5 mt-4">CRAN submission tracker</div>',r,s,u,g,k,h,b,C,N,y,v={ctx:n,current:null,token:null,hasCatch:!0,pending:_e,then:de,catch:he,value:8,error:15};return K(C=n[2],v),{c(){e=S(),t=E("main"),a=E("a"),a.innerHTML=c,r=S(),s=E("div"),u=F("svg"),g=F("path"),k=S(),h=E("input"),b=S(),v.block.c(),this.h()},l(x){re("svelte-1i7kshk",document.head).forEach(p),e=U(x),t=I(x,"MAIN",{class:!0});var i=V(t);a=I(i,"A",{href:!0,"data-svelte-h":!0}),z(a)!=="svelte-4zpjwh"&&(a.innerHTML=c),r=U(i),s=I(i,"DIV",{class:!0});var o=V(s);u=O(o,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0,stroke:!0});var l=V(u);g=O(l,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),V(g).forEach(p),l.forEach(p),k=U(o),h=I(o,"INPUT",{type:!0,placeholder:!0,class:!0}),o.forEach(p),b=U(i),v.block.l(i),i.forEach(p),this.h()},h(){document.title="CRAN sub tracker",_(a,"href",L+"/"),_(g,"stroke-linecap","round"),_(g,"stroke-linejoin","round"),_(g,"stroke-width",2),_(g,"d","M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"),_(u,"xmlns","http://www.w3.org/2000/svg"),_(u,"class","absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"),_(u,"fill","none"),_(u,"viewBox","0 0 24 24"),_(u,"stroke","currentColor"),_(h,"type","text"),_(h,"placeholder","Search"),_(h,"class","w-full py-3 pl-12 pr-4 text-slate-500 border rounded-md outline-none bg-gray-50 focus:text-slate-900 focus:bg-white focus:border-slate-500"),_(s,"class","relative mt-3"),_(t,"class","my-0 mx-auto max-w-3xl px-2")},m(x,d){A(x,e,d),A(x,t,d),f(t,a),f(t,r),f(t,s),f(s,u),f(u,g),f(s,k),f(s,h),G(h,n[0]),f(t,b),v.block.m(t,v.anchor=null),v.mount=()=>t,v.anchor=null,N||(y=te(h,"input",n[5]),N=!0)},p(x,[d]){n=x,d&1&&h.value!==n[0]&&G(h,n[0]),v.ctx=n,d&4&&C!==(C=n[2])&&K(C,v)||ce(v,n,d)},i:T,o:T,d(x){x&&(p(e),p(t)),v.block.d(),v.token=null,v=null,N=!1,y()}}}function ge(n,e,t){let a,c,r;B(n,fe,h=>t(4,c=h)),B(n,W,h=>t(6,r=h));let s=decodeURIComponent(r.url.hash.substring(1))||"";ne(W.subscribe(h=>{t(0,s=decodeURIComponent(h.url.hash.substring(1))||s)}));let u=[];function g(h){return()=>{u.push(h),t(1,u)}}function k(){s=this.value,t(0,s)}return n.$$.update=()=>{n.$$.dirty&17&&t(2,a=c.then(h=>h.filter(s)))},[s,u,a,g,c,k]}class Ie extends ie{constructor(e){super(),oe(this,e,ge,me,se,{})}}export{Ie as component};
