(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b80b56d4"],{"3ca3":function(e,t,s){"use strict";var i=s("6547").charAt,r=s("69f3"),o=s("7dd0"),n="String Iterator",a=r.set,c=r.getterFor(n);o(String,"String",(function(e){a(this,{type:n,string:String(e),index:0})}),(function(){var e,t=c(this),s=t.string,r=t.index;return r>=s.length?{value:void 0,done:!0}:(e=i(s,r),t.index+=e.length,{value:e,done:!1})}))},"53ca":function(e,t,s){"use strict";s.d(t,"a",(function(){return i}));s("a4d3"),s("e01a"),s("d28b"),s("d3b7"),s("3ca3"),s("ddb0");function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}},"862f":function(e,t,s){"use strict";var i=s("c15d"),r=s.n(i);r.a},b0c0:function(e,t,s){var i=s("83ab"),r=s("9bf2").f,o=Function.prototype,n=o.toString,a=/^\s*function ([^ (]*)/,c="name";i&&!(c in o)&&r(o,c,{configurable:!0,get:function(){try{return n.call(this).match(a)[1]}catch(e){return""}}})},c15d:function(e,t,s){},d28b:function(e,t,s){var i=s("746f");i("iterator")},dbaa:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"tab-content-item target-groups"},[e._l(e.offerTargetingList,(function(t,i){return s("div",{key:i,staticClass:"card"},[s("div",{staticClass:"float-right"},[s("button",{staticClass:"btn-close",attrs:{title:"Remove"},on:{click:function(t){return e.removeOfferTargeting(i)}}})]),s("div",{staticClass:"card__body accordion"},[s("div",{staticClass:"accordion-item"},[s("h4",{staticClass:"accordion-item-head",class:{active:e.accordions[i][0]},on:{click:function(t){return e.accordionHandler(i,"0",t)}}},[e._v("General")]),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.accordions[i][0],expression:"accordions[offerindex][0]"}],staticClass:"accordion-item-body"},[s("div",{staticClass:"form-group"},[s("div",{staticClass:"float-right checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.exclusions.countries,expression:"offerTargeting.exclusions.countries"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.exclusions.countries)?e._i(t.exclusions.countries,null)>-1:t.exclusions.countries},on:{change:function(s){var i=t.exclusions.countries,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t.exclusions,"countries",i.concat([n])):a>-1&&e.$set(t.exclusions,"countries",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t.exclusions,"countries",o)}}}),s("span",[e._v("Exclude")])])]),s("div",{staticClass:"form-control-label"},[e._v("Countries"),s("span",{staticClass:"tooltip-block"},[s("span",{staticClass:"info"}),s("span",{staticClass:"tooltip"},[e._v("Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.")]),e._v(":")])]),s("ChipsMultiselect",{class:{"not-functional":t.exclusions.countries},attrs:{items:e.countries,"sorting-property":"name"},model:{value:t.countries,callback:function(s){e.$set(t,"countries",s)},expression:"offerTargeting.countries"}})],1),s("div",{staticClass:"form-group"},[s("div",{staticClass:"float-right checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.exclusions.regions,expression:"offerTargeting.exclusions.regions"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.exclusions.regions)?e._i(t.exclusions.regions,null)>-1:t.exclusions.regions},on:{change:function(s){var i=t.exclusions.regions,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t.exclusions,"regions",i.concat([n])):a>-1&&e.$set(t.exclusions,"regions",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t.exclusions,"regions",o)}}}),s("span",[e._v("Exclude")])])]),s("div",{staticClass:"form-control-label"},[e._v("Regions:")]),s("ChipsMultiselect",{class:{"not-functional":t.exclusions.regions},attrs:{items:e.regions,"sorting-property":"name"},model:{value:t.regions,callback:function(s){e.$set(t,"regions",s)},expression:"offerTargeting.regions"}})],1),s("div",{staticClass:"form-group"},[s("div",{staticClass:"float-right checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.exclusions.cities,expression:"offerTargeting.exclusions.cities"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.exclusions.cities)?e._i(t.exclusions.cities,null)>-1:t.exclusions.cities},on:{change:function(s){var i=t.exclusions.cities,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t.exclusions,"cities",i.concat([n])):a>-1&&e.$set(t.exclusions,"cities",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t.exclusions,"cities",o)}}}),s("span",[e._v("Exclude")])])]),s("div",{staticClass:"form-control-label"},[e._v("Cities:")]),s("ChipsMultiselect",{class:{"not-functional":t.exclusions.cities},attrs:{items:e.cities,"sorting-property":"name"},model:{value:t.cities,callback:function(s){e.$set(t,"cities",s)},expression:"offerTargeting.cities"}})],1),s("div",{staticClass:"form-group wide"},[s("label",{staticClass:"form-control-label"},[e._v("OS:")]),e._l(t.os,(function(t){return s("div",{key:t.name,staticClass:"row"},[s("div",{staticClass:"col-4"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"osm.name"}],staticClass:"form-control form-control-select",on:{change:function(s){var i=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"name",s.target.multiple?i:i[0])}}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Select OS")]),e._l(e.osNames,(function(t){return s("option",{domProps:{value:t}},[e._v(e._s(t))])}))],2)]),s("div",{staticClass:"col-2"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.range,expression:"osm.range"}],staticClass:"form-control form-control-select",on:{change:function(s){var i=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"range",s.target.multiple?i:i[0])}}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Range")]),e._l(e.osRanges,(function(t){return s("option",{domProps:{value:t}},[e._v(e._s(t))])}))],2)]),s("div",{staticClass:"col-3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.version,expression:"osm.version"}],staticClass:"form-control form-control-select",on:{change:function(s){var i=Array.prototype.filter.call(s.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"version",s.target.multiple?i:i[0])}}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Version")]),e._l(e.selectedOsVersions(t.name),(function(t){return s("option",{domProps:{value:t}},[e._v(e._s(t))])}))],2)]),s("div",{staticClass:"col-1"},[s("div",{staticClass:"btn-act remove",attrs:{title:"Remove"},on:{click:function(s){return e.removeOs(i,t.name)}}},[s("span",[e._v("-")])])])])})),s("div",{staticClass:"btn-act",attrs:{title:"Add"},on:{click:function(t){return e.addOs(i)}}},[s("span",[e._v("+")])]),s("div",{staticClass:"checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.antifraud,expression:"offerTargeting.antifraud"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.antifraud)?e._i(t.antifraud,null)>-1:t.antifraud},on:{change:function(s){var i=t.antifraud,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t,"antifraud",i.concat([n])):a>-1&&e.$set(t,"antifraud",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t,"antifraud",o)}}}),s("span",[e._v("Click-level Anti-Fraud")])])]),s("span",{staticClass:"tooltip-block"},[s("span",{staticClass:"info"}),s("span",{staticClass:"tooltip"},[e._v("Это — гигант мысли, отец русской демократии и особа, приближенная к императору. Кто, по-вашему, этот мощный старик? Не говорите, вы не можете этого знать.")]),e._v(":")])],2)])])],1),s("div",{staticClass:"accordion-item"},[s("h4",{staticClass:"accordion-item-head",on:{click:function(t){return e.accordionHandler(i,"1",t)}}},[e._v("Advanced")]),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.accordions[i][1],expression:"accordions[offerindex][1]"}],staticClass:"accordion-item-body"},[s("div",{staticClass:"form-group"},[s("div",{staticClass:"form-control-label"},[e._v("Mobile carriers:")]),s("ChipsMultiselect",{attrs:{items:e.mobileCarriers,"sorting-property":"name"},model:{value:t.mobileCarriers,callback:function(s){e.$set(t,"mobileCarriers",s)},expression:"offerTargeting.mobileCarriers"}})],1),s("div",{staticClass:"form-group"},[s("div",{staticClass:"form-control-label"},[e._v("Devices:")]),s("ChipsMultiselect",{attrs:{items:e.devices,"sorting-property":"name"},model:{value:t.devices,callback:function(s){e.$set(t,"devices",s)},expression:"offerTargeting.devices"}})],1),s("div",{staticClass:"form-group"},[s("div",{staticClass:"float-right checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.exclusions.browsers,expression:"offerTargeting.exclusions.browsers"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.exclusions.browsers)?e._i(t.exclusions.browsers,null)>-1:t.exclusions.browsers},on:{change:function(s){var i=t.exclusions.browsers,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t.exclusions,"browsers",i.concat([n])):a>-1&&e.$set(t.exclusions,"browsers",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t.exclusions,"browsers",o)}}}),s("span",[e._v("Exclude")])])]),s("div",{staticClass:"form-control-label"},[e._v("Browsers")]),s("ChipsMultiselect",{class:{"not-functional":t.exclusions.browsers},attrs:{items:e.browsers,"sorting-property":"name"},model:{value:t.browsers,callback:function(s){e.$set(t,"browsers",s)},expression:"offerTargeting.browsers"}})],1),s("div",{staticClass:"form-group"},[s("div",{staticClass:"float-right checkbox-group"},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.exclusions.ip,expression:"offerTargeting.exclusions.ip"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.exclusions.ip)?e._i(t.exclusions.ip,null)>-1:t.exclusions.ip},on:{change:function(s){var i=t.exclusions.ip,r=s.target,o=!!r.checked;if(Array.isArray(i)){var n=null,a=e._i(i,n);r.checked?a<0&&e.$set(t.exclusions,"ip",i.concat([n])):a>-1&&e.$set(t.exclusions,"ip",i.slice(0,a).concat(i.slice(a+1)))}else e.$set(t.exclusions,"ip",o)}}}),s("span",[e._v("Exclude")])])]),s("div",{staticClass:"form-control-label"},[e._v("IP / IP range"),s("span",{staticClass:"tooltip-block"},[s("span",{staticClass:"info"}),s("span",{staticClass:"tooltip"},[e._v("Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.")]),e._v(":")])]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.ip,expression:"offerTargeting.ip"}],staticClass:"form-control",class:{"not-functional":t.exclusions.ip},attrs:{rows:"5"},domProps:{value:t.ip},on:{input:function(s){s.target.composing||e.$set(t,"ip",s.target.value)}}})]),s("div",{staticClass:"form-group wide"},[s("label",{staticClass:"form-control-label"},[e._v("URLs"),s("span",{staticClass:"tooltip-block"},[s("span",{staticClass:"info"}),s("span",{staticClass:"tooltip"},[e._v("Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java.")]),e._v(":")])]),e._l(t.urls,(function(r,o){return s("div",{key:r.url,staticClass:"row"},[s("div",{staticClass:"col-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.urls[o].url,expression:"offerTargeting.urls[index].url"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.urls[o].url},on:{input:function(s){s.target.composing||e.$set(t.urls[o],"url",s.target.value)}}})]),s("div",{staticClass:"col-1"},[s("div",{staticClass:"btn-act remove",attrs:{title:"Remove"},on:{click:function(t){return e.removeUrl(i,o)}}},[s("span",[e._v("-")])])])])})),s("div",{staticClass:"btn-act",attrs:{title:"Add"},on:{click:function(t){return e.addUrl(i)}}},[s("span",[e._v("+")])])],2)])])],1),s("div",{staticClass:"accordion-item"},[s("h4",{staticClass:"accordion-item-head",on:{click:function(t){return e.accordionHandler(i,"2",t)}}},[e._v("Subs")]),s("transition",{attrs:{name:"fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.accordions[i][2],expression:"accordions[offerindex][2]"}],staticClass:"accordion-item-body"},[s("p",[e._v("Some form fields here . . .")])])])],1)])])})),s("div",{staticClass:"float-right btn-act",attrs:{title:"Add"},on:{click:e.addOfferTargeting}},[s("span",[e._v("+")])])],2)},r=[],o=(s("4de4"),s("4160"),s("b0c0"),s("b64b"),s("d3b7"),s("159b"),s("53ca")),n=s("5530"),a=s("2f62"),c={name:"TabTargetingGroups",props:{saveProcess:{type:Boolean,default:!1,required:!0},osList:{type:Array,default:function(){return[]},required:!0},countries:{type:Array,default:function(){return[]},required:!0},browsers:{type:Array,default:function(){return[]},required:!0},cities:{type:Array,default:function(){return[]},required:!0},regions:{type:Array,default:function(){return[]},required:!0},mobileCarriers:{type:Array,default:function(){return[]},required:!0},devices:{type:Array,default:function(){return[]},required:!0}},components:{ChipsMultiselect:function(){return s.e("chunk-160cb487").then(s.bind(null,"5cf4"))}},data:function(){return{accordions:[[!0,!1,!1]],offerTargetingList:[],osRanges:[">=","<"]}},created:function(){this.offerTargetingList=this.copyArray(this.offerTargeting)},computed:Object(n["a"])(Object(n["a"])({},Object(a["c"])(["offerTargeting"])),{},{osNames:function(){var e=[];return this.osList.forEach((function(t){e.push(t.name)})),e}}),watch:{saveProcess:function(){if(this.saveProcess){var e=this.copyArray(this.offerTargetingList);e.forEach((function(e){e.exclusions.countries||null!==e.countries||(e.countries="All"),e.exclusions.regions||null!==e.regions||(e.regions="All"),e.exclusions.cities||null!==e.cities||(e.cities="All"),e.exclusions.browsers||null!==e.browsers||(e.browsers="All"),e.exclusions.mobileCarriers||null!==e.mobileCarriers||(e.mobileCarriers="All"),e.exclusions.devices||null!==e.devices||(e.devices="All"),e.urls=e.urls.filter((function(e){return""!==e.url}))})),this.addTargetingData(e)}}},methods:Object(n["a"])(Object(n["a"])({},Object(a["b"])(["addTargetingData"])),{},{addOs:function(e){this.offerTargetingList.forEach((function(t,s){s===e&&t.os.push({name:"",range:"",version:""})}))},removeOs:function(e,t){this.offerTargetingList.forEach((function(s,i){i===e&&(s.os=s.os.filter((function(e){return e.name!==t})))}))},addUrl:function(e){this.offerTargetingList.forEach((function(t,s){s===e&&t.urls.push({url:""})}))},removeUrl:function(e,t){this.offerTargetingList.forEach((function(s,i){i===e&&(s.urls=s.urls.filter((function(e,s){return s!==t})))}))},addOfferTargeting:function(){this.offerTargetingList.push({exclusions:{countries:!1,regions:!1,cities:!1,browsers:!1,ip:!1},antifraud:!1,os:[],countries:null,browsers:null,cities:null,regions:null,mobileCarriers:null,devices:null,urls:[]}),this.accordions.push([!1,!1,!1])},removeOfferTargeting:function(e){this.offerTargetingList=this.offerTargetingList.filter((function(t,s){return s!==e}))},accordionHandler:function(e,t,s){var i=this;s.target.classList.toggle("active"),this.accordions.forEach((function(s,r){r===e&&i.$set(s,+t,!s[+t])}))},selectedOsVersions:function(e){var t=[];return this.osList.forEach((function(s){s.name===e&&(t=s.versions)})),t},copyArray:function(e){var t=this,s=[];return e.forEach((function(e){var i={};Object.keys(e).forEach((function(s){Array.isArray(e[s])?i[s]=t.copyArray(e[s]):null===e[s]||"All"===e[s]?i[s]=null:null!==e[s]&&"object"===Object(o["a"])(e[s])?i[s]=Object.assign({},e[s]):i[s]=e[s]})),s.push(i)})),s}})},l=c,u=(s("862f"),s("2877")),d=Object(u["a"])(l,i,r,!1,null,"2c8ae234",null);t["default"]=d.exports},ddb0:function(e,t,s){var i=s("da84"),r=s("fdbc"),o=s("e260"),n=s("9112"),a=s("b622"),c=a("iterator"),l=a("toStringTag"),u=o.values;for(var d in r){var f=i[d],v=f&&f.prototype;if(v){if(v[c]!==u)try{n(v,c,u)}catch(g){v[c]=u}if(v[l]||n(v,l,d),r[d])for(var p in o)if(v[p]!==o[p])try{n(v,p,o[p])}catch(g){v[p]=o[p]}}}},e01a:function(e,t,s){"use strict";var i=s("23e7"),r=s("83ab"),o=s("da84"),n=s("5135"),a=s("861d"),c=s("9bf2").f,l=s("e893"),u=o.Symbol;if(r&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof f?new u(e):void 0===e?u():u(e);return""===e&&(d[t]=!0),t};l(f,u);var v=f.prototype=u.prototype;v.constructor=f;var p=v.toString,g="Symbol(test)"==String(u("test")),m=/^Symbol\((.*)\)[^)]+$/;c(v,"description",{configurable:!0,get:function(){var e=a(this)?this.valueOf():this,t=p.call(e);if(n(d,e))return"";var s=g?t.slice(7,-1):t.replace(m,"$1");return""===s?void 0:s}}),i({global:!0,forced:!0},{Symbol:f})}}}]);
//# sourceMappingURL=chunk-b80b56d4.abe2bc79.js.map