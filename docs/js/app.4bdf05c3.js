(function(){var n={2205:function(n,t,e){"use strict";var r=e(9242),i=e(3396);const u={id:"pixi"};function o(n,t,e,r,o,c){return(0,i.wg)(),(0,i.iD)("canvas",u)}var c=e(1767);const a={linear:function(){return function(n){return n}},inQuad:function(){return function(n){return n*n}},outQuad:function(){return function(n){return n*(2-n)}},inOutQuad:function(){return function(n){return n*=2,n<1?.5*n*n:-.5*(--n*(n-2)-1)}},inCubic:function(){return function(n){return n*n*n}},outCubic:function(){return function(n){return--n*n*n+1}},inOutCubic:function(){return function(n){return n*=2,n<1?.5*n*n*n:(n-=2,.5*(n*n*n+2))}},inQuart:function(){return function(n){return n*n*n*n}},outQuart:function(){return function(n){return 1- --n*n*n*n}},inOutQuart:function(){return function(n){return n*=2,n<1?.5*n*n*n*n:(n-=2,-.5*(n*n*n*n-2))}},inQuint:function(){return function(n){return n*n*n*n*n}},outQuint:function(){return function(n){return--n*n*n*n*n+1}},inOutQuint:function(){return function(n){return n*=2,n<1?.5*n*n*n*n*n:(n-=2,.5*(n*n*n*n*n+2))}},inSine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},outSine:function(){return function(n){return Math.sin(n*Math.PI/2)}},inOutSine:function(){return function(n){return.5*(1-Math.cos(Math.PI*n))}},inExpo:function(){return function(n){return 0===n?0:Math.pow(1024,n-1)}},outExpo:function(){return function(n){return 1===n?1:1-Math.pow(2,-10*n)}},inOutExpo:function(){return function(n){return 0===n?0:1===n?1:(n*=2,n<1?.5*Math.pow(1024,n-1):.5*(2-Math.pow(2,-10*(n-1))))}},inCirc:function(){return function(n){return 1-Math.sqrt(1-n*n)}},outCirc:function(){return function(n){return Math.sqrt(1- --n*n)}},inOutCirc:function(){return function(n){return n*=2,n<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-2)*(n-2))+1)}},inElastic:function(n=.1,t=.4){return function(e){let r;return 0===e?0:1===e?1:(!n||n<1?(n=1,r=t/4):r=t*Math.asin(1/n)/(2*Math.PI),-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r)*(2*Math.PI)/t))}},outElastic:function(n=.1,t=.4){return function(e){let r;return 0===e?0:1===e?1:(!n||n<1?(n=1,r=t/4):r=t*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*e)*Math.sin((e-r)*(2*Math.PI)/t)+1)}},inOutElastic:function(n=.1,t=.4){return function(e){let r;return 0===e?0:1===e?1:(!n||n<1?(n=1,r=t/4):r=t*Math.asin(1/n)/(2*Math.PI),e*=2,e<1?n*Math.pow(2,10*(e-1))*Math.sin((e-1-r)*(2*Math.PI)/t)*-.5:n*Math.pow(2,-10*(e-1))*Math.sin((e-1-r)*(2*Math.PI)/t)*.5+1)}},inBack:function(n){return function(t){let e=n||1.70158;return t*t*((e+1)*t-e)}},outBack:function(n){return function(t){let e=n||1.70158;return--t*t*((e+1)*t+e)+1}},inOutBack:function(n){return function(t){let e=1.525*(n||1.70158);return t*=2,t<1?t*t*((e+1)*t-e)*.5:.5*((t-2)*(t-2)*((e+1)*(t-2)+e)+2)}},inBounce:function(){return function(n){return 1-a.outBounce()(1-n)}},outBounce:function(){return function(n){return n<1/2.75?7.5625*n*n:n<2/2.75?(n-=1.5/2.75,7.5625*n*n+.75):n<2.5/2.75?(n-=2.25/2.75,7.5625*n*n+.9375):(n-=2.625/2.75,7.5625*n*n+.984375)}},inOutBounce:function(){return function(n){return n<.5?.5*a.inBounce()(2*n):.5*a.outBounce()(2*n-1)+.5}},customArray:function(n){return n?function(n){return n}:a.linear()}};var h=a,f=(e(5464),{name:"App",components:{},methods:{getAngle:function(n,t,e,r){var i=n-e,u=t-r,o=Math.atan2(u,-i);return o*=180/Math.PI,o<0&&(o+=360),o},rotateAngle:function(n,t){return(n+t)%360},generateEven:function(n,t,e,r,i,u,o){let a=0,h=0,f=[];while(a<u&&h<o){h++;let u=new c.E9j(this.uniform(n,t),this.uniform(e,r));f.some((n=>this.getDistance(u,n)<i))||(a++,f.push(u))}return f},getDistance:function(n,t){return Math.sqrt(Math.pow(n.x-t.x,2)+Math.pow(n.y-t.y,2))},randomNumber:function(n,t){return Math.round(Math.random()*(t-n+1)+n)},uniform:function(n,t){return Math.random()*(t-n)+n},randomChoice:function(n){return n.length<1?null:n[this.randomNumber(0,n.length-1)]},drawPixi:function(){var n=document.getElementById("pixi");const t=new c.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundColor:1513239,view:n}),r=t.screen.width,i=t.screen.height,u=-r/2,o=r/2,a=-i/2,f=i/2,s={topLeft:new c.E9j(-r/2,i/2),topRight:new c.E9j(r/2,i/2),bottomLeft:new c.E9j(-r/2,-i/2),bottomRight:new c.E9j(r/2,-i/2),center:new c.E9j(0,0)},l=["heart_with_arrow","heart_with_ribbon","heavy_heart_exclamation_mark_ornament","revolving_hearts","sparkles","sparkling_heart"];let p=l.map((n=>c.xEZ.from(e(4807)(`./${n}.png`)))),g=Math.round((t.screen.width+t.screen.height)/2*.03),d=[],w=this.generateEven(-t.screen.width/2+g,t.screen.width/2-g,-t.screen.height/2+g,t.screen.height/2-g,50,200,1e4);t.stage.x=t.screen.width/2,t.stage.y=t.screen.height/2;let m=n=>{let t=new c.jyi(this.randomChoice(p));t.anchor.set(.5,.5),t.x=n.x,t.y=n.y,t.baselineScale=this.uniform(.03,.07);let e=this.getAngle(0,0,n.x,n.y);e*=Math.PI/180;const r=5;return t.velocityX=Math.cos(e)*r,t.velocityY=Math.sin(e)*r*-1,t.totalTime=0,t};w.forEach((n=>{let e=m(n);d.push(e),t.stage.addChild(e)}));const v=300,M=h.outCirc(),x=this.getDistance(s.topLeft,s.center),b=.65,y=Math.max(d.length,150);let _=new c.pn8({fill:"pink",stroke:"white",strokeThickness:1}),k=new c.xvT("Love you forever, Cris.",_);k.anchor.set(.5,.5),k.x=0,t.ticker.add((n=>{let e=0;while(e<d.length){let h=d[e],l=this.getDistance(s.center,new c.E9j(h.x,h.y))/x;l=Math.max(1,l+.3);let p=M(l);h.baselineScale<b&&(h.baselineScale=Math.min(b,h.baselineScale+.1*n*.09)),h.x+=h.velocityX*n*p,h.y+=h.velocityY*n*p;let g=h.baselineScale*Math.log(l+1);if(h.scale.set(g,g),(h.x+v<u||h.x-v>o||h.y-v>f||h.y+v<a)&&(d.splice(e,1),t.stage.removeChild(h)),e++,d.length<y){let n=new c.E9j(this.uniform(-r/2,r/2),this.uniform(-i/2,i/2)),e=m(n);d.push(e),t.stage.addChild(e),console.log(e)}}}))}},mounted(){this.drawPixi()}}),s=e(89);const l=(0,s.Z)(f,[["render",o]]);var p=l;(0,r.ri)(p).mount("#app")},4807:function(n,t,e){var r={"./heart_with_arrow.png":9042,"./heart_with_ribbon.png":4641,"./heavy_heart_exclamation_mark_ornament.png":3965,"./revolving_hearts.png":2363,"./sparkles.png":3848,"./sparkling_heart.png":8514};function i(n){var t=u(n);return e(t)}function u(n){if(!e.o(r,n)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return r[n]}i.keys=function(){return Object.keys(r)},i.resolve=u,n.exports=i,i.id=4807},9042:function(n,t,e){"use strict";n.exports=e.p+"img/heart_with_arrow.bc5c601e.png"},4641:function(n,t,e){"use strict";n.exports=e.p+"img/heart_with_ribbon.668edd68.png"},3965:function(n,t,e){"use strict";n.exports=e.p+"img/heavy_heart_exclamation_mark_ornament.4343928d.png"},2363:function(n,t,e){"use strict";n.exports=e.p+"img/revolving_hearts.5f8b5e19.png"},3848:function(n,t,e){"use strict";n.exports=e.p+"img/sparkles.c1c50487.png"},8514:function(n,t,e){"use strict";n.exports=e.p+"img/sparkling_heart.0c60d55a.png"}},t={};function e(r){var i=t[r];if(void 0!==i)return i.exports;var u=t[r]={id:r,loaded:!1,exports:{}};return n[r].call(u.exports,u,u.exports,e),u.loaded=!0,u.exports}e.m=n,function(){var n=[];e.O=function(t,r,i,u){if(!r){var o=1/0;for(f=0;f<n.length;f++){r=n[f][0],i=n[f][1],u=n[f][2];for(var c=!0,a=0;a<r.length;a++)(!1&u||o>=u)&&Object.keys(e.O).every((function(n){return e.O[n](r[a])}))?r.splice(a--,1):(c=!1,u<o&&(o=u));if(c){n.splice(f--,1);var h=i();void 0!==h&&(t=h)}}return t}u=u||0;for(var f=n.length;f>0&&n[f-1][2]>u;f--)n[f]=n[f-1];n[f]=[r,i,u]}}(),function(){e.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(t,{a:t}),t}}(),function(){e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){e.nmd=function(n){return n.paths=[],n.children||(n.children=[]),n}}(),function(){e.p="/lovely/"}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,r){var i,u,o=r[0],c=r[1],a=r[2],h=0;if(o.some((function(t){return 0!==n[t]}))){for(i in c)e.o(c,i)&&(e.m[i]=c[i]);if(a)var f=a(e)}for(t&&t(r);h<o.length;h++)u=o[h],e.o(n,u)&&n[u]&&n[u][0](),n[u]=0;return e.O(f)},r=self["webpackChunklovely"]=self["webpackChunklovely"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(2205)}));r=e.O(r)})();
//# sourceMappingURL=app.4bdf05c3.js.map