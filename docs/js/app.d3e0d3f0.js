(function(t){function e(e){for(var r,a,o=e[0],c=e[1],l=e[2],f=0,p=[];f<o.length;f++)a=o[f],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={app:0},s=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/tickers_websocket/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"348e":function(t,e,n){"use strict";n("cc78")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,i=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper",attrs:{id:"app"}},[t.tickersAverage.length?n("table",{staticClass:"average-table",attrs:{cellspacing:"1",border:"1",cellpadding:"10"}},[n("caption",[t._v("Среднее значение")]),t._m(0),t._l(t.tickersAverage,(function(e){return n("tr",{key:e.name},[n("th",[t._v(t._s(e.name))]),n("td",[t._v("$"+t._s(e.a.toFixed(4)))]),n("td",[t._v("$"+t._s(e.b.toFixed(4)))])])}))],2):t._e(),n("div",{staticClass:"control-group"},[n("div",{staticClass:"field"},[n("label",{staticClass:"label",attrs:{for:"limit"}},[t._v("Performance: ")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.performanceType,expression:"performanceType"}],attrs:{id:"limit"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.performanceType=e.target.multiple?n:n[0]},t.changePerformanceType]}},t._l(t.PERFORMANCE_TYPES,(function(e){var r=e[0],i=e[1];return n("option",{key:i,domProps:{value:i}},[t._v(t._s(r.toLowerCase()))])})),0)]),n("div",{staticClass:"field"},[n("label",{staticClass:"label",attrs:{for:"performance"}},[t._v("Show:")]),n("select",{directives:[{name:"model",rawName:"v-model",value:t.limit,expression:"limit"}],attrs:{id:"performance"},on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.limit=e.target.multiple?n:n[0]},t.onChangeLimit]}},t._l(t.limits,(function(e,r){return n("option",{key:r,domProps:{value:e}},[t._v(t._s(e))])})),0)])]),n("the-table",{attrs:{value:t.list}})],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td",[t._v("Название")]),n("td",[t._v("a")]),n("td",[t._v("b")])])}],o=(n("13d5"),n("fb6a"),n("4fad"),n("d3b7"),n("25f0"),n("2909")),c=n("3835"),l={methods:{throttle:function(t,e){var n,r,i,s,a,o=function(){t.apply(s,a),r=n};return function(){if(s=this,a=arguments,n=Date.now(),i&&(clearTimeout(i),i=null),r){var t=e-(n-r);t<0?o():i=setTimeout((function(){o()}),t)}else o()}},debounce:function(t,e){var n,r,i;return function(){r=this,i=arguments,n||(t.apply(r,i),n=!0,setTimeout((function(){n=!1}),e))}}}},u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"the-table"},[t.items.length?n("table",{staticClass:"table is-6"},[n("tbody",[t._m(0),t._l(t.items,(function(e,r){return n("tr",{key:r,staticClass:"table--row"},t._l(e,(function(e,i){return n("td",{key:i,class:{"is-selected":t.selected.toString()===[i,r].toString()},on:{click:function(e){return t.select(i,r)}}},[t.selected.toString()===[i,r].toString()?[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.items[r][i],expression:"items[rowIndex][cellIndex]"}],staticClass:"textarea",domProps:{value:t.items[r][i]},on:{input:function(e){e.target.composing||t.$set(t.items[r],i,e.target.value)}}})]:n("span",[t._v(t._s(e))])],2)})),0)}))],2)]):t._e()])},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v("ticker (s)")]),n("th",[t._v("updateId (u)")]),n("th",[t._v("best bid price (b)")]),n("th",[t._v("best bid qty (B)")]),n("th",[t._v("best ask price (a)")]),n("th",[t._v("best ask qty (A)")])])}],p={name:"TheTable",props:{value:{type:Array,default:function(){return[]}}},data:function(){return{items:[],config:{columns:0,rows:0},selected:[-1,-1]}},watch:{value:{immediate:!0,handler:function(t){this.items=t,this.items.length&&(this.config={rows:this.items.length||0,columns:this.items[0].length||0})}}},methods:{select:function(t,e){this.selected=[t,e]}}},h=p,m=(n("348e"),n("2877")),d=Object(m["a"])(h,u,f,!1,null,null,null),v=d.exports,b={NOTHING:0,THROTTLE:1,DEBOUNCE:2},g=localStorage.getItem("performance"),_={name:"App",components:{TheTable:v},mixins:[l],data:function(){return{list:[],limit:10,limits:[10,100,200],tickers:{},PERFORMANCE_TYPES:Object.entries(b),performanceType:g?parseInt(g):b.NOTHING,wait:2e3}},computed:{tickersAverage:function(){var t=[];if(Object.entries(this.tickers).length)for(var e=0,n=Object.entries(this.tickers);e<n.length;e++){var r=Object(c["a"])(n[e],2),i=r[0],s=r[1],a=s.slice(Math.max(s.length-this.limit,0)),o=a.reduce((function(t,e){return t.a+=parseFloat(e.a.toString()),t.b+=parseFloat(e.b.toString()),t}),{a:0,b:0});t.push({name:i,a:o.a/a.length,b:o.b/a.length})}return t}},methods:{changePerformanceType:function(){if(r)switch(this.performanceType){case b.THROTTLE:console.log("IT IS THROTTLE"),r.onmessage=this.throttle(this.onMessage.bind(this),this.wait);break;case b.DEBOUNCE:console.log("IT IS DEBOUNCE"),r.onmessage=this.debounce(this.onMessage.bind(this),this.wait);break;default:r.onmessage=this.onMessage}localStorage.setItem("performance",this.performanceType)},onMessage:function(t){if("string"===typeof t.data){var e=JSON.parse(t.data);e&&e.data&&this.createStatLog(e.data)}},onChangeLimit:function(){this.list.length>this.limit&&(this.list=this.list.slice(Math.max(this.list.length-this.limit,0)))},createStatLog:function(t){this.tickers[t.s]||this.$set(this.tickers,t.s,[]),this.tickers[t.s].length>=Math.max.apply(Math,Object(o["a"])(this.limits))&&this.tickers[t.s].shift(),this.tickers[t.s].push(t),this.list.length===this.limit&&this.list.shift(),this.list.push(t)},init:function(){r||(r=new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@bookTicker/ethusdt@bookTicker/bnbusdt@bookTicker")),r.onclose=function(){return console.log("Connection closed...")},r.onopen=function(){return console.log("Connection opened...")},r.onerror=function(t){return console.error(t)},this.changePerformanceType()}},created:function(){this.init()},beforeDestroy:function(){r.close()}},y=_,T=(n("5c0b"),Object(m["a"])(y,s,a,!1,null,null,null)),k=T.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(k)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){},cc78:function(t,e,n){}});
//# sourceMappingURL=app.d3e0d3f0.js.map