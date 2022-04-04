(function(){var t={2398:function(t,n,i){"use strict";var e=i(9242),r=i(3396);const o={id:"pixi"};function s(t,n,i,e,s,u){return(0,r.wg)(),(0,r.iD)("canvas",o)}var u=i(1767),h=i(2482);const c={linear:function(){return function(t){return t}},inQuad:function(){return function(t){return t*t}},outQuad:function(){return function(t){return t*(2-t)}},inOutQuad:function(){return function(t){return t*=2,t<1?.5*t*t:-.5*(--t*(t-2)-1)}},inCubic:function(){return function(t){return t*t*t}},outCubic:function(){return function(t){return--t*t*t+1}},inOutCubic:function(){return function(t){return t*=2,t<1?.5*t*t*t:(t-=2,.5*(t*t*t+2))}},inQuart:function(){return function(t){return t*t*t*t}},outQuart:function(){return function(t){return 1- --t*t*t*t}},inOutQuart:function(){return function(t){return t*=2,t<1?.5*t*t*t*t:(t-=2,-.5*(t*t*t*t-2))}},inQuint:function(){return function(t){return t*t*t*t*t}},outQuint:function(){return function(t){return--t*t*t*t*t+1}},inOutQuint:function(){return function(t){return t*=2,t<1?.5*t*t*t*t*t:(t-=2,.5*(t*t*t*t*t+2))}},inSine:function(){return function(t){return 1-Math.cos(t*Math.PI/2)}},outSine:function(){return function(t){return Math.sin(t*Math.PI/2)}},inOutSine:function(){return function(t){return.5*(1-Math.cos(Math.PI*t))}},inExpo:function(){return function(t){return 0===t?0:Math.pow(1024,t-1)}},outExpo:function(){return function(t){return 1===t?1:1-Math.pow(2,-10*t)}},inOutExpo:function(){return function(t){return 0===t?0:1===t?1:(t*=2,t<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1))))}},inCirc:function(){return function(t){return 1-Math.sqrt(1-t*t)}},outCirc:function(){return function(t){return Math.sqrt(1- --t*t)}},inOutCirc:function(){return function(t){return t*=2,t<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-2)*(t-2))+1)}},inElastic:function(t=.1,n=.4){return function(i){let e;return 0===i?0:1===i?1:(!t||t<1?(t=1,e=n/4):e=n*Math.asin(1/t)/(2*Math.PI),-t*Math.pow(2,10*(i-1))*Math.sin((i-1-e)*(2*Math.PI)/n))}},outElastic:function(t=.1,n=.4){return function(i){let e;return 0===i?0:1===i?1:(!t||t<1?(t=1,e=n/4):e=n*Math.asin(1/t)/(2*Math.PI),t*Math.pow(2,-10*i)*Math.sin((i-e)*(2*Math.PI)/n)+1)}},inOutElastic:function(t=.1,n=.4){return function(i){let e;return 0===i?0:1===i?1:(!t||t<1?(t=1,e=n/4):e=n*Math.asin(1/t)/(2*Math.PI),i*=2,i<1?t*Math.pow(2,10*(i-1))*Math.sin((i-1-e)*(2*Math.PI)/n)*-.5:t*Math.pow(2,-10*(i-1))*Math.sin((i-1-e)*(2*Math.PI)/n)*.5+1)}},inBack:function(t){return function(n){let i=t||1.70158;return n*n*((i+1)*n-i)}},outBack:function(t){return function(n){let i=t||1.70158;return--n*n*((i+1)*n+i)+1}},inOutBack:function(t){return function(n){let i=1.525*(t||1.70158);return n*=2,n<1?n*n*((i+1)*n-i)*.5:.5*((n-2)*(n-2)*((i+1)*(n-2)+i)+2)}},inBounce:function(){return function(t){return 1-c.outBounce()(1-t)}},outBounce:function(){return function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?(t-=1.5/2.75,7.5625*t*t+.75):t<2.5/2.75?(t-=2.25/2.75,7.5625*t*t+.9375):(t-=2.625/2.75,7.5625*t*t+.984375)}},inOutBounce:function(){return function(t){return t<.5?.5*c.inBounce()(2*t):.5*c.outBounce()(2*t-1)+.5}},customArray:function(t){return t?function(t){return t}:c.linear()}};var a=c,f={getDistanceSimple(t,n,i,e){return Math.sqrt(Math.pow(t-i,2)+Math.pow(n-e,2))},getDistance(t,n){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))},getAngle(t,n,i,e){let r=t-i,o=n-e,s=Math.atan2(o,-r);return s*=180/Math.PI,s<0&&(s+=360),s},toRadians(t){return t/180*Math.PI},toDegrees(t){return t/Math.PI*180},generateSections(t){let n=[],i=2*Math.PI/t;for(let e=0;e<t;e++){let t=i*e,r=t+i,o=t+i/2,s=new u.E9j(-Math.cos(o),Math.sin(o));n.push({startAngle:t,centerAngle:o,endAngle:r,velocityPoint:s})}return n}},l=i(5464),p={randInt(t,n){return Math.floor(Math.random()*(n-t+1)+t)},uniform(t,n){return Math.random()*(n-t)+t},choice:function(t){return t.length<1?null:1===t.length?t[0]:t[this.randInt(0,t.length-1)]},pointInRectangle(t,n,i){let e=i/2,r=n/2;return new u.E9j(this.uniform(t.x-e,t.y+e),this.uniform(t.y-r,t.y+r))},pointInCircle(t,n,i){const e=this.uniform(n,i),r=this.uniform(0,2*Math.PI);return new u.E9j(Math.cos(r)*e+t.x,Math.sin(r)*e+t.y)},spacedPointsInRectangle(t,n,i,e,r){const o=t.x,s=t.y,h=n.x,c=n.y;let a=0,f=0,l=[];while(a<e&&f<r){f++;let t=new u.E9j(this.uniform(o,h),this.uniform(s,c));l.some((n=>this.getDistance(t,n)<i))||(a++,l.push(t))}return l}};class E{constructor(t,n){(0,h.Z)(this,"REMOVAL_BUFFER",100),(0,h.Z)(this,"MAX_BASELINE_SCALE",.65),(0,h.Z)(this,"MAX_SPRITE_COUNT",200),(0,h.Z)(this,"EASING_FUNCTION",a.outExpo()),(0,h.Z)(this,"MOTION_BLUR_KERNEL_SIZE",3),(0,h.Z)(this,"MOTION_BLUR_SCALE",7),(0,h.Z)(this,"VELOCITY_SCALE",3),(0,h.Z)(this,"TIME_PERIOD",60),(0,h.Z)(this,"EDGE_BUFFER",.15),(0,h.Z)(this,"MIN_RADIUS",30),(0,h.Z)(this,"TIME_SCALE",2.3),(0,h.Z)(this,"tick",(t=>{t*=this.TIME_SCALE;for(const[n,i]of this.sections.entries())for(const[e,r]of this.sectionSprites[n].entries()){r.totalTime+=t;let i=r.totalTime/this.TIME_PERIOD,o=this.EASING_FUNCTION(i);r.baselineScale<this.MAX_BASELINE_SCALE&&(r.baselineScale=Math.min(this.MAX_BASELINE_SCALE,r.baselineScale+.1*t*.25));let s=r.baselineScale*Math.log(i+1);r.scale.set(s,s),r.x+=r.velocityX*t*o,r.y+=r.velocityY*t*o,this.outside(r)&&(r.visible=!1,this.sprite_trash.push(r),this.sectionSprites[n].splice(e,1),this.total_sprites--)}this.total_sprites<this.MAX_SPRITE_COUNT&&this.generatePoint()})),this.app=t,this.sectionCount=n,this.sections=f.generateSections(n).map((n=>{const i=new u.W20;let e=n.velocityPoint.x*this.MOTION_BLUR_SCALE,r=n.velocityPoint.y*this.MOTION_BLUR_SCALE;return i.filters=[new l.R([e,r],this.MOTION_BLUR_KERNEL_SIZE)],t.stage.addChild(i),i})),this.sectionSprites=Array.from(Array(n),(()=>new Array(0))),this.BASE_ANGLE_DEG=360/this.sectionCount,this.BASE_ANGLE_RAD=2*Math.PI/this.sectionCount,this.WIDTH=t.screen.width,this.HEIGHT=t.screen.height,this.LEFT=-this.WIDTH/2,this.RIGHT=this.WIDTH/2,this.TOP=-this.HEIGHT/2,this.BOTTOM=this.HEIGHT/2,this.POSITIONS={topLeft:new u.E9j(-this.WIDTH/2,this.HEIGHT/2),topRight:new u.E9j(this.WIDTH/2,this.HEIGHT/2),bottomLeft:new u.E9j(-this.WIDTH/2,-this.HEIGHT/2),bottomRight:new u.E9j(this.WIDTH/2,-this.HEIGHT/2),center:new u.E9j(0,0)},this.emojiList=["heart_with_arrow","heart_with_ribbon","heavy_heart_exclamation_mark_ornament","revolving_hearts","sparkles","sparkling_heart"],this.textures=this.emojiList.map((t=>u.xEZ.from(i(4807)(`./${t}.png`)))),this.BUFFER_LEFT=this.LEFT-this.REMOVAL_BUFFER,this.BUFFER_RIGHT=this.RIGHT+this.REMOVAL_BUFFER,this.BUFFER_TOP=this.TOP-this.REMOVAL_BUFFER,this.BUFFER_BOTTOM=this.BOTTOM+this.REMOVAL_BUFFER,this.MAX_DISTANCE=f.getDistance(this.POSITIONS.topLeft,this.POSITIONS.center),this.total_sprites=0,this.MAX_RADIUS=Math.min(this.app.screen.width,this.app.screen.height)*(1-this.EDGE_BUFFER),this.sprite_trash=[]}generatePoint(){let t=p.pointInCircle(new u.E9j(0,0),this.MIN_RADIUS,this.MAX_RADIUS),n=null;this.sprite_trash.length<1?n=new u.jyi(p.choice(this.textures)):(n=this.sprite_trash.shift(),n.visible=!0),n.anchor.set(.5,.5),n.x=t.x,n.y=t.y,n.baselineScale=p.uniform(.05,.12),n.scale.set(0,0);const i=f.getAngle(0,0,t.x,t.y)*Math.PI/180,e=Math.floor(i/this.BASE_ANGLE_RAD),r=this.VELOCITY_SCALE*p.uniform(.8,1.2);return n.velocityX=Math.cos(i)*r,n.velocityY=Math.sin(i)*r*-1,n.totalTime=0,this.sections[e].addChild(n),this.sectionSprites[e].push(n),this.total_sprites++,n}outside(t){return t.x<this.BUFFER_LEFT||t.x>this.BUFFER_RIGHT||t.y>this.BUFFER_BOTTOM||t.y<this.BUFFER_TOP}}var _=E,M={name:"App",components:{},methods:{drawPixi:function(){const t=document.getElementById("pixi"),n=new u.MxU({width:window.innerWidth,height:window.innerHeight,antialias:!0,backgroundColor:1513239,view:t});n.stage.x=n.screen.width/2,n.stage.y=n.screen.height/2;let i=new u.pn8({fill:"pink",stroke:"white",strokeThickness:1}),e=new u.xvT("Love you forever, Cris.",i);e.anchor.set(.5,.5),e.x=0;const r=new _(n,16);n.ticker.add(r.tick)}},mounted(){this.drawPixi()}},I=i(89);const g=(0,I.Z)(M,[["render",s]]);var O=g;(0,e.ri)(O).mount("#app")},4807:function(t,n,i){var e={"./heart_with_arrow.png":9042,"./heart_with_ribbon.png":4641,"./heavy_heart_exclamation_mark_ornament.png":3965,"./revolving_hearts.png":2363,"./sparkles.png":3848,"./sparkling_heart.png":8514};function r(t){var n=o(t);return i(n)}function o(t){if(!i.o(e,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e[t]}r.keys=function(){return Object.keys(e)},r.resolve=o,t.exports=r,r.id=4807},9042:function(t,n,i){"use strict";t.exports=i.p+"img/heart_with_arrow.bc5c601e.png"},4641:function(t,n,i){"use strict";t.exports=i.p+"img/heart_with_ribbon.668edd68.png"},3965:function(t,n,i){"use strict";t.exports=i.p+"img/heavy_heart_exclamation_mark_ornament.4343928d.png"},2363:function(t,n,i){"use strict";t.exports=i.p+"img/revolving_hearts.5f8b5e19.png"},3848:function(t,n,i){"use strict";t.exports=i.p+"img/sparkles.c1c50487.png"},8514:function(t,n,i){"use strict";t.exports=i.p+"img/sparkling_heart.0c60d55a.png"}},n={};function i(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={id:e,loaded:!1,exports:{}};return t[e].call(o.exports,o,o.exports,i),o.loaded=!0,o.exports}i.m=t,function(){var t=[];i.O=function(n,e,r,o){if(!e){var s=1/0;for(a=0;a<t.length;a++){e=t[a][0],r=t[a][1],o=t[a][2];for(var u=!0,h=0;h<e.length;h++)(!1&o||s>=o)&&Object.keys(i.O).every((function(t){return i.O[t](e[h])}))?e.splice(h--,1):(u=!1,o<s&&(s=o));if(u){t.splice(a--,1);var c=r();void 0!==c&&(n=c)}}return n}o=o||0;for(var a=t.length;a>0&&t[a-1][2]>o;a--)t[a]=t[a-1];t[a]=[e,r,o]}}(),function(){i.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(n,{a:n}),n}}(),function(){i.d=function(t,n){for(var e in n)i.o(n,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){i.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){i.p="/lovely/"}(),function(){var t={143:0};i.O.j=function(n){return 0===t[n]};var n=function(n,e){var r,o,s=e[0],u=e[1],h=e[2],c=0;if(s.some((function(n){return 0!==t[n]}))){for(r in u)i.o(u,r)&&(i.m[r]=u[r]);if(h)var a=h(i)}for(n&&n(e);c<s.length;c++)o=s[c],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(a)},e=self["webpackChunklovely"]=self["webpackChunklovely"]||[];e.forEach(n.bind(null,0)),e.push=n.bind(null,e.push.bind(e))}();var e=i.O(void 0,[998],(function(){return i(2398)}));e=i.O(e)})();
//# sourceMappingURL=app.725c4757.js.map