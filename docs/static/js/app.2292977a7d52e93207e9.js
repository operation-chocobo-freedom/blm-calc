webpackJsonp([1],{21:function(e,t,a){"use strict";function n(e){r&&--e.umbralHearts,r=!1}var s=function(e){return 0},c=function(e){return function(t){return"ice"===t.element&&3===t.stacks?e/2:e}},r=!1,i=function(e){return function(t){return r=!1,"fire"===t.element?t.umbralHearts?(r=!0,e):2*e:"ice"===t.element?1===t.stacks?e/2:e/4:e}},l=function(e){return function(t){if("fire"===t.element)switch(t.stacks){case 1:return 1.4*e;case 2:return 1.6*e;case 3:return 1.8*e}else{if("ice"!==t.element)return e;switch(t.stacks){case 1:return.9*e;case 2:return.8*e;case 3:return.7*e}}}},o=function(e){return function(t){return"fire"===t.element&&3===t.stacks?e/2:e}},u=function(e){return function(t){return"fire"===t.element?1===t.stacks?e/2:e/4:e}},p=function(e){return function(t){if("fire"!==t.element)return e;switch(t.stacks){case 1:return.9*e;case 2:return.8*e;case 3:return.7*e}}};t.a={fire1:{type:"gcd",name:"Fire",cast:c(2.4),recast:2.4,mp:i(1200),potency:l(180),mutate:function(e){return n(e),"fire"===e.element?(e.stacks++,e.stacks>3&&(e.stacks=3),e.aspectTimer=13):"ice"===e.element?(e.element="none",e.stacks=0,e.aspectTimer=0):(e.element="fire",e.stacks=1,e.aspectTimer=13),e}},fire3:{type:"gcd",name:"Fire 3",cast:c(3.3),recast:2.4,mp:i(2400),potency:l(240),mutate:function(e){return n(e),e.element="fire",e.stacks=3,e.aspectTimer=13,e}},blizzard1:{type:"gcd",name:"Blizzard",cast:o(2.4),recast:2.4,mp:u(960),potency:p(180),mutate:function(e){return"ice"===e.element?(e.stacks++,e.aspectTimer=13,e.stacks>3&&(e.stacks=3)):"fire"===e.element?(e.element="none",e.stacks=0,e.aspectTimer=0):(e.element="ice",e.stacks=1,e.aspectTimer=13),e}},blizzard3:{type:"gcd",name:"Blizzard 3",cast:o(3.3),recast:2.4,mp:u(1440),potency:p(240),mutate:function(e){return e.element="ice",e.stacks=3,e.aspectTimer=13,e}},enochian:{type:"ogcd",name:"Enochian",cooldown:30,mp:s,potency:s,mutate:function(e){return e.enochian=!0,e},validate:function(e){return"none"===e.element?"Requires astral/umbral state":""}},transpose:{type:"ogcd",name:"Transpose",cooldown:12,mp:s,potency:s,mutate:function(e){return"fire"===e.element?(e.element="ice",e.stacks=1):"ice"===e.element&&(e.element="fire",e.stacks=1),e},validate:function(e){return"none"===e.element?"Has no effect with no aspected state":""}},convert:{type:"ogcd",name:"Convert",cooldown:180,mp:s,potency:s,mutate:function(e){return console.log(e.maxMp),e.mp+=.3*e.maxMp,e}},fire4:{type:"gcd",name:"Fire 4",cast:c(2.8),recast:2.4,mp:i(1200),potency:l(260),mutate:function(e){return n(e),e},validate:function(e){return"fire"!==e.element||!0!==e.enochian?"Requires astral + enochian":""}},blizzard4:{type:"gcd",name:"Blizzard 4",cast:o(2.8),recast:2.4,mp:u(1440),potency:p(260),mutate:function(e){return e.umbralHearts=3,e},validate:function(e){return"ice"!==e.element||!0!==e.enochian?"Requires umbral + enochian":""}}}},32:function(e,t,a){"use strict";var n=a(20),s=a(99),c=a(90),r=a.n(c);n.a.use(s.a),t.a=new s.a({routes:[{path:"/",name:"Hello",component:r.a}]})},33:function(e,t,a){function n(e){a(79)}var s=a(3)(a(35),a(94),n,null,null);e.exports=s.exports},35:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},36:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["element","count","timer"]}},37:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["state"]}},38:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(43),s=a.n(n),c=a(42),r=a.n(c),i=a(44),l=a.n(i),o=a(91),u=a.n(o),p=a(88),m=a.n(p),d=a(89),f=a.n(d),v=a(92),_=a.n(v),h=a(21),g=a(101),y=a.n(g),C=a(84);t.default={data:function(){return{palette:l()(h.a),spells:h.a,queue:["blizzard3","enochian","blizzard4","fire3","fire4","fire4","fire4","fire4","fire1"],trash:[],stats:{mp:15480},flags:{mpPercentage:!1},sortableOptions:{group:{name:"rotation"},handle:".spellcast"},paletteOptions:{group:{name:"rotation",pull:"clone",put:!1},sort:!1,handle:".spellcast"},trashOptions:{group:{name:"rotation"}}}},computed:{calculated:function(){var e={element:"none",stacks:0,enochian:!1,mp:this.stats.mp,maxMp:this.stats.mp},t=[],a=!0,n=!1,c=void 0;try{for(var i,l=r()(this.queue);!(a=(i=l.next()).done);a=!0){var o=i.value,u={},p=h.a[o];e=s()({},e),p.cast&&e.aspectTimer<p.cast(e)&&(e.aspectTimer=0,e.element="none",e.enochian=!1);var m=e.mp;e.mp=e.mp-(p.mp?p.mp(e):0),"gcd"===p.type?(u={type:"gcd",spell:o,cast:p.cast(e),recast:p.recast,potency:p.potency(e),warning:p.validate?p.validate(e):""},e.aspectTimer>0&&(e.aspectTimer-=C.max([u.cast,u.recast]),e.aspectTimer<0&&(e.aspectTimer=0))):"ogcd"===p.type&&(u={type:"ogcd",spell:o,cast:"weave",recast:p.recast,potency:p.potency(e),warning:p.validate?p.validate(e):""}),e=p.mutate(e),u.mpChange=e.mp-m,u.state=s()({},e),t.push(u)}}catch(e){n=!0,c=e}finally{try{!a&&l.return&&l.return()}finally{if(n)throw c}}return t},totalPotency:function(){return this.calculated.reduce(function(e,t){return e+t.potency},0).toFixed(2)},totalDuration:function(){return this.calculated.filter(function(e){return"gcd"===e.type}).reduce(function(e,t){return e+t.cast+t.recast},0).toFixed(2)},potencyPerSecond:function(){return(this.totalPotency/this.totalDuration).toFixed(4)}},methods:{emptyTrash:function(){this.trash=[]},clear:function(){this.queue=[]}},components:{spellcast:u.a,draggable:y.a,"aspect-stack":m.a,enochian:f.a,"umbral-heart":_.a}}},39:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(21);t.default={props:{spell:String,warning:{type:String,default:""}},data:function(){return{spells:n.a}},computed:{icon:function(){return"./static/"+this.spell+".png"}}}},40:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["count"]}},41:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(20),s=a(33),c=a.n(s),r=a(32),i=a(34);a.n(i);n.a.config.productionTip=!1,new n.a({el:"#app",router:r.a,template:"<App/>",components:{App:c.a}})},78:function(e,t){},79:function(e,t){},80:function(e,t){},81:function(e,t){},82:function(e,t){},83:function(e,t){},88:function(e,t,a){function n(e){a(81)}var s=a(3)(a(36),a(96),n,"data-v-a7839e44",null);e.exports=s.exports},89:function(e,t,a){function n(e){a(80)}var s=a(3)(a(37),a(95),n,"data-v-a2a9cb66",null);e.exports=s.exports},90:function(e,t,a){function n(e){a(83)}var s=a(3)(a(38),a(98),n,"data-v-f6b2f7c0",null);e.exports=s.exports},91:function(e,t,a){function n(e){a(78)}var s=a(3)(a(39),a(93),n,"data-v-160f1396",null);e.exports=s.exports},92:function(e,t,a){function n(e){a(82)}var s=a(3)(a(40),a(97),n,"data-v-d02a017e",null);e.exports=s.exports},93:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"spellcast",staticStyle:{position:"relative"}},[a("img",{staticClass:"spell-icon",attrs:{src:e.icon,alt:""}}),e._v(" "),a("span",{staticClass:"spell-name"},[e._v("\n        "+e._s(e.spells[e.spell].name)+"\n    ")]),e._v(" "),e.warning?a("span",[e._v("— "),a("span",{staticClass:"warning"},[e._v(e._s(e.warning))])]):e._e()])},staticRenderFns:[]}},94:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},staticRenderFns:[]}},95:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"enochian",class:{active:e.state}})},staticRenderFns:[]}},96:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[e._l(e.count,function(t){return"ice"===e.element?a("div",{staticClass:"ice-diamond active"}):e._e()}),e._v(" "),e._l(3-e.count,function(t){return"ice"===e.element?a("div",{staticClass:"ice-diamond"}):e._e()}),e._v(" "),e._l(e.count,function(t){return"fire"===e.element?a("div",{staticClass:"fire-diamond active"}):e._e()}),e._v(" "),e._l(3-e.count,function(t){return"fire"===e.element?a("div",{staticClass:"fire-diamond"}):e._e()}),e._v(" "),a("small",{staticClass:"timer"},[e._v(e._s(e.timer.toFixed(1)))])],2)},staticRenderFns:[]}},97:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"umbral-stacks"},e._l(e.count,function(e){return a("div",{staticClass:"umbral-heart"})}))},staticRenderFns:[]}},98:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"simulator"},[a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Max MP")]),e._v(" "),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.stats.mp,expression:"stats.mp"}],staticClass:"input",attrs:{type:"text",placeholder:"MP"},domProps:{value:e.stats.mp},on:{input:function(t){t.target.composing||(e.stats.mp=t.target.value)}}})])])]),e._v(" "),a("div",{staticClass:"column"},[a("div",{staticClass:"field"},[a("label",{staticClass:"label"},[e._v("Show MP as Percentage")]),e._v(" "),a("div",{staticClass:"control"},[a("label",{staticClass:"radio"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.flags.mpPercentage,expression:"flags.mpPercentage"}],attrs:{type:"radio",name:"question"},domProps:{value:!0,checked:e._q(e.flags.mpPercentage,!0)},on:{__c:function(t){e.flags.mpPercentage=!0}}}),e._v("\n                            Yes\n                        ")]),e._v(" "),a("label",{staticClass:"radio"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.flags.mpPercentage,expression:"flags.mpPercentage"}],attrs:{type:"radio",name:"question"},domProps:{value:!1,checked:e._q(e.flags.mpPercentage,!1)},on:{__c:function(t){e.flags.mpPercentage=!1}}}),e._v("\n                            No\n                        ")])])])]),e._v(" "),a("div",{staticClass:"column"})]),e._v(" "),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("div",{staticClass:"notification"},[a("draggable",{attrs:{options:e.paletteOptions},model:{value:e.palette,callback:function(t){e.palette=t},expression:"palette"}},e._l(e.palette,function(e){return a("spellcast",{key:e,attrs:{spell:e}})}))],1)]),e._v(" "),a("div",{staticClass:"column"},[a("div",{staticClass:"notification"},[a("draggable",{attrs:{options:e.trashOptions},on:{add:function(t){e.emptyTrash()}},model:{value:e.trash,callback:function(t){e.trash=t},expression:"trash"}},[a("p",{staticClass:"trashbag"},[e._v("\n                            Drag here to delete.\n                        ")])])],1),e._v(" "),a("a",{staticClass:"button is-danger",on:{click:function(t){e.clear()}}},[e._v("Clear All")])])]),e._v(" "),a("table",{staticClass:"table is-fullwidth"},[e._m(0),e._v(" "),e._m(1),e._v(" "),a("draggable",{attrs:{options:e.sortableOptions,element:"tbody"},model:{value:e.queue,callback:function(t){e.queue=t},expression:"queue"}},[e._l(e.queue,function(t,n){return[a("tr",{class:{warning:e.calculated[n].warning}},[a("td",{staticClass:"spell-handle"},[a("spellcast",{attrs:{spell:t,warning:e.calculated[n].warning}})],1),e._v(" "),a("td",{},[0===e.calculated[n].potency?a("span"):e._e(),e._v(" "),0!==e.calculated[n].potency?a("span",[e._v("\n                                "+e._s(e.calculated[n].potency.toFixed())+"\n                            ")]):e._e()]),e._v(" "),a("td",{},[a("enochian",{attrs:{state:e.calculated[n].state.enochian}}),e._v(" "),"fire"===e.calculated[n].state.element?[a("aspect-stack",{attrs:{element:"fire",count:e.calculated[n].state.stacks,timer:e.calculated[n].state.aspectTimer}})]:e._e(),e._v(" "),"ice"===e.calculated[n].state.element?[a("aspect-stack",{attrs:{element:"ice",count:e.calculated[n].state.stacks,timer:e.calculated[n].state.aspectTimer}})]:e._e(),e._v(" "),a("umbral-heart",{attrs:{count:e.calculated[n].state.umbralHearts}})],2),e._v(" "),a("td",["gcd"===e.calculated[n].type?a("small",[e._v(e._s(e.calculated[n].cast)+"s")]):e._e(),e._v(" "),"ogcd"===e.calculated[n].type?a("small"):e._e()]),e._v(" "),a("td",{},["ice"===e.calculated[n].state.element?a("span",{staticClass:"up"}):e._e(),e._v(" "),e.flags.mpPercentage?a("small",[e._v(e._s((e.calculated[n].state.mp/e.stats.mp*100).toFixed(2))+"%")]):e._e(),e._v(" "),e.flags.mpPercentage?e._e():a("small",[e._v(e._s(e.calculated[n].state.mp))]),e._v(" "),e.calculated[n].mpChange>0?a("small",{staticClass:"mp-delta mp-increase"},[e._v("+ "+e._s(e.calculated[n].mpChange))]):e._e(),e._v(" "),e.calculated[n].mpChange<0?a("small",{staticClass:"mp-delta mp-decrease"},[e._v(e._s(e.calculated[n].mpChange))]):e._e()])])]}),e._v(" "),0===e.queue.length?a("tr",[a("td",{staticClass:"empty-queue",attrs:{colspan:"500"}},[a("em",[e._v("Build your rotation here! Drag spells from the box above.")])])]):e._e()],2)],1),e._v(" "),a("div",{staticClass:"content"},[a("h1",[e._v(e._s(e.potencyPerSecond)+" p/s")]),e._v(" "),a("p",[e._v("\n                "+e._s(e.totalPotency)+" Potency over "+e._s(e.totalDuration)+" Seconds ")])])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th"),e._v(" "),a("th",[e._v("Potency")]),e._v(" "),a("th",[e._v("Stacks")]),e._v(" "),a("th",[e._v("Cast")]),e._v(" "),a("th",[e._v("MP")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tfoot",[a("tr",[a("th"),e._v(" "),a("th",[e._v("Potency")]),e._v(" "),a("th",[e._v("Stacks")]),e._v(" "),a("th",[e._v("Cast")]),e._v(" "),a("th",[e._v("MP")])])])}]}}},[41]);
//# sourceMappingURL=app.2292977a7d52e93207e9.js.map