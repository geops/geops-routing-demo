(this["webpackJsonpgeops-routing-demo"]=this["webpackJsonpgeops-routing-demo"]||[]).push([[0],{553:function(e,t,n){e.exports=n(961)},763:function(e,t,n){},765:function(e,t,n){},952:function(e,t,n){},953:function(e,t,n){},960:function(e,t,n){},961:function(e,t,n){"use strict";n.r(t);n(554),n(563),n(753);var r=n(0),a=n.n(r),o=n(28),c=n.n(o),i=n(25),u=n(95),l=n(466),s=n(66),d=n(214),p={center:[949042.143189,5899715.591163],currentMot:"rail",currentStops:["",""],currentStopsGeoJSON:{},clickLocation:null,notificationMessage:"",notificationType:"info",isFieldFocused:!1,showLoadingBar:!1,selectedRoutes:[],isRouteInfoOpen:!1,dialogPosition:{x:10,y:275},olMap:new d.a({controls:[]}),routingElevation:1,resolveHops:!1,tracks:[null,null]},f=function(e,t){var n={center:t.center};return Object(s.a)({},e,{},n)},m=function(e,t){var n={currentStops:t.currentStops};return Object(s.a)({},e,{},n)},h=function(e,t){var n={currentStopsGeoJSON:t.currentStopsGeoJSON};return Object(s.a)({},e,{},n)},g=function(e,t){var n={currentMot:t.currentMot};return Object(s.a)({},e,{},n)},b=function(e,t){var n={clickLocation:t.clickLocation};return Object(s.a)({},e,{},n)},v=function(e,t){var n={notificationMessage:t.notificationMessage,notificationType:t.notificationType};return Object(s.a)({},e,{},n)},O=function(e,t){var n={isFieldFocused:t.isFieldFocused};return Object(s.a)({},e,{},n)},S=function(e,t){var n={showLoadingBar:t.showLoadingBar};return Object(s.a)({},e,{},n)},y=function(e,t){var n={selectedRoutes:t.selectedRoutes};return Object(s.a)({},e,{},n)},E=function(e,t){var n={isRouteInfoOpen:t.isRouteInfoOpen};return Object(s.a)({},e,{},n)},j=function(e,t){var n={dialogPosition:t.dialogPosition};return Object(s.a)({},e,{},n)},k=function(e,t){var n={routingElevation:t.routingElevation};return Object(s.a)({},e,{},n)},R=function(e,t){var n={resolveHops:t.resolveHops};return Object(s.a)({},e,{},n)},w=function(e,t){var n={tracks:t.tracks};return Object(s.a)({},e,{},n)},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CENTER":return f(e,t);case"SET_CURRENT_STOPS":return m(e,t);case"SET_CURRENT_STOPS_GEOJSON":return h(e,t);case"SET_CURRENT_MOT":return g(e,t);case"SET_CLICK_LOCATION":return b(e,t);case"SHOW_NOTIFICATION":return v(e,t);case"SET_IS_FIELD_FOCUSED":return O(e,t);case"SET_SHOW_LOADING_BAR":return S(e,t);case"SET_SELECTED_ROUTES":return y(e,t);case"SET_IS_ROUTE_INFO_OPEN":return E(e,t);case"SET_DIALOG_POSITION":return j(e,t);case"SET_ROUTING_ELEVATION":return k(e,t);case"SET_RESOLVE_HOPS":return R(e,t);case"SET_TRACKS":return w(e,t);default:return e}},N=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.d,x=Object(u.c)({MapReducer:C}),M=Object(u.e)(x,N(Object(u.a)(l.a))),P=n(42),T=n(178),I=n(120),F=n(255),_=n(256),L=n(121),A=n(272),H=n(493),V=n(262),G=n(82),U=n(495),D=n(257),z=n(269),B=n(67),J=n.n(B),W=n(130),K=n(132),q=n(270),Z=n(458),$=n(459),X=n(185),Y=n(1023),Q=n(43),ee=n(1006),te=n(1002),ne=n(1020),re=n(1018),ae=n(1014),oe=n(1011),ce=n(1017),ie=n(1007),ue=n(278),le=n(1016),se=n(1015),de=n(1024),pe=n(1013),fe=n(478),me=n.n(fe),he=n(479),ge=n.n(he),be=n(277),ve=n(263),Oe=n.n(ve),Se=function(e){return{type:"SET_CENTER",center:e}},ye=function(e){return{type:"SET_CURRENT_STOPS",currentStops:e}},Ee=function(e){return{type:"SET_CURRENT_STOPS_GEOJSON",currentStopsGeoJSON:e}},je=function(e){return{type:"SET_CURRENT_MOT",currentMot:e}},ke=function(e,t){return{type:"SHOW_NOTIFICATION",notificationMessage:e,notificationType:t}},Re=function(e){return{type:"SET_IS_FIELD_FOCUSED",isFieldFocused:e}},we=function(e){return{type:"SET_SHOW_LOADING_BAR",showLoadingBar:e}},Ce=function(e){return{type:"SET_SELECTED_ROUTES",selectedRoutes:e}},Ne=function(e){return{type:"SET_IS_ROUTE_INFO_OPEN",isRouteInfoOpen:e}},xe=function(e){return{type:"SET_TRACKS",tracks:e}},Me=(n(763),["rail","bus","foot"]),Pe=["tram","subway","gondola","funicular","ferry","car"],Te=[].concat(Me,Pe),Ie=["foot","car"],Fe=n(472),_e=n.n(Fe),Le=n(470),Ae=n.n(Le),He=n(471),Ve=n.n(He),Ge=n(8),Ue=function(e){var t=null,n=e.charAt(0).toUpperCase()+e.slice(1);switch(e){case"rail":t=a.a.createElement(Ae.a,null);break;case"foot":t=a.a.createElement(Ve.a,null);break;default:t=a.a.createElement(_e.a,null)}return a.a.createElement("span",{title:n},t)},De=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return Object(Ge.n)(e,"EPSG:3857","EPSG:4326").map((function(e){return e.toFixed(t)}))},ze=function(e){return Object(Ge.n)(e,"EPSG:4326","EPSG:3857")},Be=n(1003),Je=n(962),We=n(1005),Ke=n(1004),qe=n(335),Ze=n.n(qe),$e=n(71),Xe=(n(765),function(e,t,n,r){var a=[];return n?a.push("".concat(n).concat(e||t?":":"").concat(e?" ".concat(e):"").concat(t?" ".concat(t):"")):a.push("".concat(e?"".concat(e):"").concat(e&&t?" ":"").concat(t?"".concat(t):"")),r&&a.push("ifopt: ".concat(r)),a.filter((function(e){return""!==e})).join(", ")});function Ye(e){var t=e.currentSearchResults,n=e.processClickedResultHandler,o=Object(i.d)((function(e){return e.MapReducer.olMap})),c=Object(r.useState)(null),u=Object(Q.a)(c,2),l=u[0],s=u[1],d=Object(r.useRef)(),p=Object(r.useCallback)((function(){var e;d.current&&(e=o.getTarget().getBoundingClientRect().bottom-d.current.getBoundingClientRect().top-35);e>=0&&s(e)}),[o]);return Object(r.useEffect)((function(){var e=o.on("change:size",(function(){return p()}));return function(){Object($e.b)(e)}}),[]),Object(r.useEffect)((function(){p()}),[p,t]),0===t.length?null:a.a.createElement(te.a,{square:!0,elevation:3,ref:d},a.a.createElement(Be.a,{component:"nav",className:"rd-result-list","aria-label":"search results",style:{maxHeight:l,overflowY:"scroll",paddingBottom:0,paddingTop:0}},t.map((function(e,t){return 0!==t?a.a.createElement(Je.a,{onClick:function(){n(e)},button:!0,key:Oe()()},a.a.createElement(Ke.a,null,a.a.createElement(Ze.a,null)),a.a.createElement(We.a,{primary:e.properties.name,secondary:Xe(e.properties.id,e.properties.code,e.properties.country_code,e.properties.ifopt)})):a.a.createElement(Je.a,{onClick:function(){return n(e)},button:!0,selected:!0,key:"searchResult-".concat(e.properties.name)},a.a.createElement(Ke.a,null,a.a.createElement(Ze.a,null)),a.a.createElement(We.a,{primary:e.properties.name,secondary:Xe(e.properties.id,e.properties.code,e.properties.country_code,e.properties.ifopt)}))}))))}Ye.defaultProps={currentSearchResults:[]};var Qe=Ye,et=n(1022),tt=n(1012),nt=n(476),rt=n.n(nt),at=n(475),ot=n.n(at),ct=n(336),it=n.n(ct),ut=n(477),lt=n.n(ut),st=n(474),dt=n.n(st),pt=Object(ee.a)((function(){return{wrapper:{width:"12%",padding:"0 10px 4px 10px"}}})),ft=Object(ee.a)((function(){return{select:{paddingRight:"17px !important"},icon:{width:"0.8em",height:"0.8em"}}}));var mt=function(e){var t=e.index,n=e.disabled,o=pt(),c=ft(),u=Object(i.c)(),l=Object(i.d)((function(e){return e.MapReducer.tracks})),s=Object(i.d)((function(e){return e.MapReducer.currentMot})),d=Object(i.d)((function(e){return e.MapReducer.currentStopsGeoJSON})),p=Object(r.useMemo)((function(){return l[t]}),[t,l]),f=Object(r.useMemo)((function(){return d[t]&&d[t].properties&&d[t].properties.platforms&&d[t].properties.platforms[s]?[""].concat(Object(P.a)(d[t].properties.platforms[s].sort((function(e,t){return parseInt(e,10)-parseInt(t,10)})))):[]}),[t,s,d]);return a.a.createElement(ie.a,{className:o.wrapper},a.a.createElement(ce.a,{classes:c,renderValue:function(e){return""===e?"-":e},labelId:"rd-track-select-label",value:p,displayEmpty:!0,disabled:n||!f.length,onChange:function(e){var n=Object(P.a)(l),r=e.target.value;n[t]=r,u(xe(n))}},f.map((function(e){return a.a.createElement(oe.a,{value:e,key:"track-".concat(e)},""===e?"-":e)}))))},ht=n(1),gt=n.n(ht),bt=gt.a.arrayOf(gt.a.number.isRequired).isRequired,vt=gt.a.shape({propTypeCoordinates:bt,type:gt.a.string.isRequired}),Ot=gt.a.shape({geometry:vt,properties:gt.a.shape({id:gt.a.oneOfType([gt.a.string.isRequired,gt.a.string.isRequired]),type:gt.a.string.isRequired}),type:gt.a.string.isRequired}),St=gt.a.shape({features:gt.a.shape({0:gt.a.oneOfType([Ot,bt]),1:gt.a.oneOfType([Ot,bt])}),type:gt.a.string.isRequired}),yt=(gt.a.shape({0:St,1:St}),gt.a.arrayOf(gt.a.oneOfType([gt.a.string.isRequired,bt])),Object(ee.a)((function(){return{gridContainer:{width:"100%",padding:"0px 0px 0px 20px",boxSizing:"unset"},button:{color:"black","& svg":{height:"20px",width:"20px"}},fieldWrapper:{maxWidth:"58%"},buttonWrapper:{maxWidth:"26px"}}})));function Et(e){var t,n=yt(),o=Object(i.c)(),c=e.index,u=e.addNewSearchFieldHandler,l=e.currentStops,s=e.removeSearchFieldHandler,d=e.searchStopsHandler,p=e.singleStop,f=e.processHighlightedResultSelectHandler,m=e.onFieldFocusHandler,h=e.onPanViaClick,g=e.inputReference,b=null,v=10,O="",S=null,y=Object(r.useMemo)((function(){return"string"===typeof p&&""!==p}),[p]),E=""===l[c]||l.length>2&&""===l[c+1];return 0===c?(b=a.a.createElement(de.a,{title:"Pan to the feature"},a.a.createElement(tt.a,{onClick:function(){return h(p,c)},className:n.button,"aria-label":"Pan to the feature",size:"small"},a.a.createElement(dt.a,{fontSize:"small",color:"primary"}))),O="Start",S=a.a.createElement(pe.a,{item:!0,xs:1,className:n.buttonWrapper},a.a.createElement(de.a,{title:"Add Hop"},a.a.createElement(tt.a,{onClick:function(){return u(l,c+1)},disabled:E,className:n.button,"aria-label":"Add Hop",size:"small"},a.a.createElement(it.a,{fontSize:"small"}))))):c===l.length-1?(b=a.a.createElement(de.a,{title:"Pan to the feature"},a.a.createElement(tt.a,{onClick:function(){return h(p,c)},className:n.button,"aria-label":"Pan to the feature",size:"small"},a.a.createElement(ot.a,{color:"primary"}))),O="End"):(b=a.a.createElement(de.a,{title:"Pan to the feature"},a.a.createElement(tt.a,{onClick:function(){return h(p,c)},className:n.button,"aria-label":"Pan to the feature",size:"small"},a.a.createElement(rt.a,{fontSize:"small",color:"primary"}))),v=9,O="Hop",S=a.a.createElement(a.a.Fragment,null,a.a.createElement(pe.a,{item:!0,xs:1,className:n.buttonWrapper},a.a.createElement(de.a,{title:"Add Hop"},a.a.createElement(tt.a,{disabled:E,onClick:function(){return u(l,c+1)},className:n.button,"aria-label":"addHop",size:"small"},a.a.createElement(it.a,{fontSize:"small"})))),a.a.createElement(pe.a,{item:!0,xs:1,className:n.buttonWrapper},a.a.createElement(de.a,{title:"Remove Hop"},a.a.createElement(tt.a,{onClick:function(){return s(c)},className:n.button,"aria-label":"removeHop",size:"small"},a.a.createElement(lt.a,{fontSize:"small"})))))),a.a.createElement(pe.a,{container:!0,spacing:1,className:n.gridContainer,alignItems:"flex-end"},a.a.createElement(pe.a,{item:!0,xs:1},b),a.a.createElement(pe.a,{item:!0,xs:v,className:n.fieldWrapper},a.a.createElement(et.a,{style:{width:"100%"},inputRef:g,label:O,color:"primary",onChange:function(e){return d(e,c)},value:(t=p,Array.isArray(t)?De(t):t),onKeyDown:f,onFocus:function(){o(Re(!0)),m(c)},onBlur:function(){return setTimeout((function(){o(Re(!1))}),500)},onClick:function(e){e.target.select&&e.target.select()}})),a.a.createElement(mt,{index:c,disabled:!y}),S)}Et.defaultProps={currentStops:[],singleStop:""};var jt=Et;function kt(e){var t=e.children,n=e.value,r=e.index;return a.a.createElement(ue.a,{component:"div",role:"tabpanel",hidden:n!==r,id:Oe()(),"aria-labelledby":"simple-tab-".concat(r)},n===r&&t)}var Rt=Object(ee.a)((function(){return{tabs:{width:"75%"},tab:{minWidth:"33%",width:"33%"},dropDown:{width:"25%",backgroundColor:"white"},select:{height:"100%"},selectInput:{backgroundColor:"white","&:focus":{backgroundColor:"white"}},checkbox:{margin:"0px 5px 0px 13px"}}})),wt=new AbortController;function Ct(e){var t=e.mots,n=e.stationSearchUrl,o=e.APIKey,c=e.isActiveRoute,u=e.onZoomRouteClick,l=e.onPanViaClick,d=Rt(),p=Object(i.c)(),f=function(e,t){var n=[];return e.filter((function(e){return t.includes(e)})).forEach((function(e){var r=t.find((function(t){return t===e}));r&&n.push({name:r,icon:Ue(r)})})),0===n.length&&n.push({name:Te[0],icon:Ue(Te[0])}),n},m=f(t,Me),h=f(t,Pe),g=Object(i.d)((function(e){return e.MapReducer.center})),b=Object(i.d)((function(e){return e.MapReducer.tracks})),v=Object(i.d)((function(e){return e.MapReducer.clickLocation})),O=Object(i.d)((function(e){return e.MapReducer.currentStops})),S=Object(i.d)((function(e){return e.MapReducer.showLoadingBar})),y=Object(i.d)((function(e){return e.MapReducer.isRouteInfoOpen})),E=Object(i.d)((function(e){return e.MapReducer.currentStopsGeoJSON})),j=Object(i.d)((function(e){return e.MapReducer.currentMot})),k=a.a.useRef([]);k.current.length!==O.length&&(k.current=Array(O.length).fill().map((function(e,t){return k.current[t]||a.a.createRef()})));var R=Object(r.useState)(m),w=Object(Q.a)(R,1)[0],C=Object(r.useState)(h),N=Object(Q.a)(C,1)[0],x=Object(r.useState)(null),M=Object(Q.a)(x,2),T=M[0],I=M[1],F=Object(r.useState)([]),_=Object(Q.a)(F,2),L=_[0],A=_[1],H=a.a.useState(!0),V=Object(Q.a)(H,2),G=V[0],U=V[1],D=Object(r.useState)(0),z=Object(Q.a)(D,2),B=z[0],W=z[1],K=Object(r.useState)(void 0),q=Object(Q.a)(K,2),Z=q[0],$=q[1];Object(r.useEffect)((function(){y&&p(Ce([]))}),[O]);var X=function(e,t,n){p(ye(e)),p(Ee(t)),W(n)},Y=function(e,t){var n=J.a.clone(E),r={type:"FeatureCollection",features:[{type:"Feature",properties:{id:v.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:v}}]},a=Object(P.a)(b);a[t-1]="",n[B]=r,X(e,n,t),p(xe(a)),p(Ee(n))};Object(r.useEffect)((function(){if(v)if(""===O[B]){O[B]=v,Y(O,B+1<O.length?B+1:B)}else{var e=O,t=B;e[B]=v,Y(e,B);var n=J.a.clone(E),r={type:"FeatureCollection",features:[{type:"Feature",properties:{id:v.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:v}}]};n[B]=r,X(e,n,t),p(Ee(n))}}),[v]);var ee=function(e,t,n){var r=Object(P.a)(n).map((function(){return""}));$(null),p(xe(r)),p(je(t))},fe=function(e){W(e),p(Re(!0))},he=function(e,t){var n=J.a.clone(O),r=J.a.clone(E);(n.splice(t,0,""),r[t])&&Object.keys(r).filter((function(e){return e>=t})).reverse().forEach((function(e){r["".concat(parseInt(e,10)+1)]=r[e]}));var a=Object(P.a)(b);a.splice(t,0,""),p(xe(a)),p(ye(n)),p(Ee(r))},ve=function(e){var t=J.a.clone(O),n=J.a.clone(E);if(t.splice(e,1),n[e]){var r=Object.keys(n);r.forEach((function(t){var r=parseInt(t,10);r===e?delete n[e]:r>e&&(n[r-1]=n[r])})),delete n[r.length-1]}var a=Object(P.a)(b);a.splice(e,1),p(xe(a)),p(ye(t)),p(Ee(n))},Oe=function(e,t){if(I(t),!e.target.value){var r=O;r[t]="",A([]),p(ye(r));var a=Object(P.a)(b);return a[t]="",p(xe(a)),void p(we(!1))}var c=J.a.clone(O);c[t]=e.target.value,p(ye(c)),p(we(!0)),wt.abort();var i=(wt=new AbortController).signal,u="".concat(n,"?q=").concat(e.target.value,"&key=").concat(o).concat(Ie.includes(j)?"":"&mots=".concat(G?j:""),"&ref_location=").concat(De(g).reverse().join(","),"&limit=10");fetch(u,{signal:i}).then((function(e){return e.json()})).then((function(e){e.error?p(ke("Couldn't find stations","warning")):(0===e.features.length&&p(ke("Couldn't find stations","warning")),A(e.features),p(we(!1)))})).catch((function(e){if("AbortError"!==e.name)throw e;console.warn("Abort ".concat(u))}))},Se=function(e){var t=Object(Q.a)(L,1)[0];if("Enter"===e.key&&t){var n=O;X[B]=t.properties.name;var r=J.a.clone(E);r[B]=t,p(ye(n)),A([]),p(Ee(r))}if("Backspace"===e.key){var a=[];e.target.value&&(a=L);var o={};Object.keys(E).forEach((function(e){e!==B.toString()&&(o[e]=E[e])})),A(a),p(Ee(o))}};return u&&l?a.a.createElement("div",{className:"rd-routing-menu"},a.a.createElement(te.a,{square:!0,elevation:3},a.a.createElement("div",{className:"rd-routing-menu-header"},a.a.createElement(re.a,{value:!!Me.includes(j)&&j,className:d.tabs,onChange:function(e,t){ee(0,t,b)},indicatorColor:"primary",textColor:"primary","aria-label":"mots icons"},w.map((function(e){return a.a.createElement(ae.a,{className:d.tab,key:"mot-".concat(e.name),value:e.name,icon:e.icon,"aria-label":e.name})}))),a.a.createElement(ie.a,{className:d.dropDown},a.a.createElement(ce.a,{renderValue:function(e){return""!==e?e:"Other MOTs"},className:d.select,classes:{root:d.selectInput},labelId:"rd-other-mot-label",value:Z||"",disableUnderline:!Z,displayEmpty:!0,onChange:function(e){if(e){var t=e.target.value;ee(0,t,b),$(t)}else $(null)}},N.map((function(e){return a.a.createElement(oe.a,{value:e.name,key:"other-mot-".concat(e.name)},e.name)}))))),a.a.createElement(kt,null,a.a.createElement(be.a,{onDragEnd:function(e){if(e.destination){var t=J.a.clone(O),n=t.splice(e.source.index,1),r=Object(Q.a)(n,1)[0];t.splice(e.destination.index,0,r);var a=J.a.clone(E),o=Object(s.a)({},a[e.source.index]);if(e.destination.index<e.source.index)Object.keys(a).filter((function(t){return parseInt(t,10)>=e.destination.index&&parseInt(t,10)<e.source.index})).reverse().forEach((function(e){a["".concat(parseInt(e,10)+1)]=a[e]})),a[e.destination.index]=o;else if(e.destination.index>e.source.index){Object.keys(a).filter((function(t){return parseInt(t,10)>=e.source.index&&parseInt(t,10)<=e.destination.index})).forEach((function(t){parseInt(t,10)===e.destination.index?a[e.destination.index]=o:a[t]=a["".concat(parseInt(t,10)+1)]}))}var c=Object(P.a)(b);!function(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}(c,e.source.index,e.destination.index),p(xe(c)),p(ye(t)),p(Ee(a))}}},a.a.createElement(be.c,{droppableId:"droppable"},(function(e){return a.a.createElement("div",Object.assign({className:"stopsContainer"},e.droppableProps,{ref:e.innerRef,style:{background:"white"}}),O.map((function(e,t){return a.a.createElement(be.b,{key:"searchField-".concat(t),draggableId:"searchField-".concat(t),index:t},(function(n,r){return a.a.createElement("div",Object.assign({ref:n.innerRef},n.draggableProps,n.dragHandleProps,{style:(o=r.isDragging,c=n.draggableProps.style,Object(s.a)({userSelect:"none",background:o?"#ededed":"white"},c))}),a.a.createElement(jt,{key:"searchField-".concat(t),index:t,inputReference:k.current[t],addNewSearchFieldHandler:he,currentStops:O,removeSearchFieldHandler:ve,searchStopsHandler:Oe,singleStop:e,processHighlightedResultSelectHandler:Se,onFieldFocusHandler:fe,onPanViaClick:l}));var o,c}))})),e.placeholder)}))),a.a.createElement("div",{className:"rd-mot-checkbox"},a.a.createElement(ne.a,{className:d.checkbox,checked:G,onChange:function(){U(!G),null!==T&&Oe({target:{value:k.current[T].current.value}},T)},color:"primary",inputProps:{"aria-label":"use only mot"}}),a.a.createElement("span",null,"Search only selected mode of transport")),a.a.createElement("div",{className:"rd-route-buttons"},a.a.createElement(pe.a,{item:!0,xs:6},a.a.createElement(de.a,{title:"Zoom to the route"},a.a.createElement(se.a,{onClick:function(){return u()},"aria-label":"Zoom to the route",disabled:!c,variant:"contained",color:"default",classes:{root:"rd-button-root",disabled:"rd-button-disabled"},startIcon:a.a.createElement(me.a,{fontSize:"small"})},a.a.createElement(ue.a,null,"Zoom to the route")))),a.a.createElement(pe.a,{item:!0,xs:6},a.a.createElement(de.a,{title:"Route information"},a.a.createElement(se.a,{onClick:function(){p(Ne(!y))},"aria-label":"Route information",disabled:!c,variant:"contained",color:"default",className:y?"rd-button-active":"",classes:{root:"rd-button-root",disabled:"rd-button-disabled"},startIcon:a.a.createElement(ge.a,{fontSize:"small"})},a.a.createElement(ue.a,null,"Route information")))))),S?a.a.createElement(le.a,null):null),a.a.createElement(Qe,{currentSearchResults:L,processClickedResultHandler:function(e){var t=O;t[B]=e.properties.name;var n=J.a.clone(E);n[B]=e,p(ye(t));var r=Object(P.a)(b);r[B]="",p(xe(r)),A([]),Object.keys(n).forEach((function(e){e===B.toString()&&(n[e].geometry.coordinates=ze(n[e].geometry.coordinates))})),p(Ee(n))}})):null}kt.defaultProps={value:null,index:null},Ct.defaultProps={onZoomRouteClick:void 0,onPanViaClick:void 0};var Nt=Ct,xt=n(158),Mt=n(480),Pt=n.n(Mt),Tt=n(481),It=n.n(Tt),Ft=n(468),_t=n(494),Lt=n(115),At=(n(952),function(e,t){return"".concat(t?Math.round(100*e)/100:Math.round(e/1e3*100)/100)}),Ht=function(e,t,n){for(var r=[],a=n||0;a<e.length;a+=t||1)r.push(e[a]);return r},Vt=function(e,t){var n=e/t*300;return n>=80?n:80};function Gt(e){var t,n,o=e.routes,c=e.hoveredCoords,u=e.onHighlightPoint,l=e.clearHighlightPoint,s=Object(i.c)(),d=Object(r.useState)(null),p=Object(Q.a)(d,2),f=p[0],m=p[1],h=Object(r.useState)(null),g=Object(Q.a)(h,2),b=g[0],v=g[1],O=Object(r.useState)(null),S=Object(Q.a)(O,2),y=S[0],E=S[1],j=Object(r.useState)([]),k=Object(Q.a)(j,2),R=k[0],w=k[1],C=Object(r.useState)(null),N=Object(Q.a)(C,2),x=N[0],M=N[1],T=Object(r.useState)(null),I=Object(Q.a)(T,2),F=I[0],_=I[1],L=Object(i.d)((function(e){return e.MapReducer.dialogPosition}));return Object(r.useEffect)((function(){var e,t=[],n=(e=[]).concat.apply(e,Object(P.a)(o.map((function(e){return e.getGeometry().getFlatCoordinates()})))),r=new Ft.a(o.map((function(e){return e.getGeometry()}))),a=Object(xt.b)(r);v(a),M(a>1e3?"km":"m"),_("m"===x);var c=Ht(n,3,0),i=Ht(n,3,1),u=Ht(n,3,2);E(Math.max.apply(Math,Object(P.a)(u))),u.forEach((function(e,n){t.push({alt:e,xVal:c[n],yVal:i[n],distance:a*(n/(u.length-1))})})),w(t)}),[o]),a.a.createElement(_t.a,{isOpen:!0,title:a.a.createElement("span",null,"Route information"),isDraggable:!0,onDragStop:function(e,t){s(function(e){return{type:"SET_DIALOG_POSITION",dialogPosition:e}}({x:t.lastX,y:t.lastY}))},className:"rd-dialog-container",classNameHeader:"rd-dialog-header",classNameCloseBt:"rd-dialog-close-bt",cancelDraggable:".tm-dialog-body",position:L,onClose:function(){return s(Ne(!1))}},a.a.createElement(Lt.d,{width:450,height:220,data:R,onMouseLeave:l},a.a.createElement(Lt.i,{axisLine:!1,tickLine:!1},a.a.createElement(Lt.b,{value:"m",offset:10,position:"top"})),a.a.createElement(Lt.h,{type:"number",dataKey:"distance",tickFormatter:function(e){return At(e,F)}},a.a.createElement(Lt.b,{value:x,offset:10,position:"right"})),a.a.createElement(Lt.a,{vertical:!1}),a.a.createElement(Lt.c,{type:"monotone",dataKey:"alt",dot:!1,stroke:"#3f51b5",strokeWidth:2}),c&&f&&a.a.createElement(Lt.f,{x:f.distance,stroke:"lightgrey"}),c&&f&&a.a.createElement(Lt.e,{r:4,x:f.distance,y:f.alt,fill:"#3f51b5",stroke:"white"}),a.a.createElement(Lt.g,{cursor:!!f||"auto",position:f?{x:Vt(f.distance,b),y:(t=f.alt,n=y,t/n>.5?110:20)}:"auto",content:function(e){return c?function(e,t,n){for(var r=new K.a,o=It()(r.writeFeaturesObject(n,{dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"})).features[0],c=new D.a({geometry:new W.a(e)}),i=r.writeFeatureObject(c,{dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"}),u=Pt()(o,i),l=o.geometry.coordinates,s=l.map((function(e){return e[u.properties.index]})),d=s.reduce((function(e,t){var n=u.geometry.coordinates[0];return e?t&&e&&Math.abs(t[0]-n)<Math.abs(e[0]-n)?t:e:t})),p=s.indexOf(d),f=u.properties.index,h=0;h<p;h+=1)f+=l[h].length;var g=t[f];return m(g),g?a.a.createElement("div",{className:"rd-tootip-wrapper"},a.a.createElement("div",null,"altitude: ",g.alt," m"),a.a.createElement("div",null,"distance: ",At(g.distance,F),F?" m":" km")):null}(c,R,o):function(e){if(f&&m(null),e.payload.length){var t=e.payload[0].payload,n=t.xVal,r=t.yVal,o=t.alt,c=t.distance;return u([n,r]),a.a.createElement("div",{className:"rd-tootip-wrapper"},a.a.createElement("div",null,"altitude: ",o," m"),a.a.createElement("div",null,"distance: ",At(c,F),F?" m":" km"))}}(e)}})))}Gt.defaultProps={hoveredCoords:null};var Ut=a.a.memo(Gt),Dt=n(210),zt=n(216),Bt=n(339),Jt=n(274),Wt=function(e){return e.map((function(e){return new Dt.c({stroke:new zt.a({color:e[0],width:e[1],lineDash:e[2]})})}))},Kt=Wt([["darkred",6],["red",3]]),qt=Wt([["darkred",7],["red",4]]),Zt=Wt([["rgb(153,153,0)",6],["yellow",3]]),$t=Wt([["rgb(153,153,0)",7],["yellow",4]]),Xt=Wt([["rgb(96, 186, 219)",6],["rgb(173, 216, 230)",3]]),Yt=Wt([["rgb(96, 186, 219)",7],["rgb(173, 216, 230)",4]]),Qt=Wt([["grey",6],["darkgrey",3]]),en=Wt([["grey",7],["darkgrey",4]]),tn=Wt([["darkblue",6],["blue",3]]),nn=Wt([["darkblue",7],["blue",4]]),rn=new Dt.c({image:new Bt.a({radius:7,fill:new Jt.a({color:"red"}),stroke:new zt.a({color:"darkred",width:2})})}),an=new Dt.c({image:new Bt.a({radius:3,fill:new Jt.a({color:"rgb(173, 216, 230)"}),stroke:new zt.a({color:"rgb(96, 186, 219)",width:2})})}),on=new Dt.c({image:new Bt.a({radius:3,fill:new Jt.a({color:"darkgrey"}),stroke:new zt.a({color:"grey",width:2})})}),cn=new Dt.c({image:new Bt.a({radius:7,fill:new Jt.a({color:"yellow"}),stroke:new zt.a({color:"rgb(153,153,0)",width:2})})}),un=new Dt.c({image:new Bt.a({radius:7,fill:new Jt.a({color:"blue"}),stroke:new zt.a({color:"darkblue",width:2})})}),ln=function(e){return"rail"===e?rn:"bus"===e?cn:"foot"===e?an:"car"===e?on:un},sn=function(e,t){return"rail"===e?t?qt:Kt:"bus"===e?t?$t:Zt:"foot"===e?t?Yt:Xt:"car"===e?t?en:Qt:t?nn:tn},dn=(n(953),new AbortController),pn=function(e){function t(e){var n;Object(T.a)(this,t),(n=Object(F.a)(this,Object(_.a)(t).call(this,e))).onMapMoved=function(e){var t=n.props,r=t.center,a=t.onSetCenter,o=e.map.getView().getCenter();r[0]===o[0]&&r[1]===o[1]||a(o)},n.drawNewRoute=function(){var e=[],t=n.props,r=t.currentStopsGeoJSON,a=t.routingUrl,o=t.currentMot,c=t.APIKey,i=t.routingElevation,u=t.resolveHops,l=t.onShowNotification,s=t.onSetShowLoadingBar,d=t.onSetSelectedRoutes,p=t.tracks;s(!0),Object.keys(r).forEach((function(t,n){r[t].features?e.push("".concat(De(r[t].features[0].geometry.coordinates).slice().reverse())):Ie.includes(o)?e.push("".concat(r[t].properties.name)):e.push("!".concat(r[t].properties.uid).concat(null!==p[n]?"".concat(p[n]?"$".concat(p[n]):""):""))})),dn.abort();var f=(dn=new AbortController).signal,m="".concat(a,"?via=").concat(e.join("|"),"&mot=").concat(o,"&resolve-hops=").concat(u,"&key=").concat(c,"&elevation=").concat(i,"&coord-radius=100.0&coord-punish=1000.0");fetch(m,{signal:f}).then((function(e){return e.json()})).then((function(e){if(s(!1),e.error)return l("Couldn't find route","error"),void d([]);n.routeVectorSource.clear();var t=new K.a({dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"});n.routeVectorSource.addFeatures(t.readFeatures(e)),n.setIsActiveRoute(!!n.routeVectorSource.getFeatures().length),d(n.routeVectorSource.getFeatures()),n.routeVectorLayer.olLayer.setStyle(sn(o,!1))})).catch((function(e){if("AbortError"!==e.name)throw s(!1),d([]),e;console.warn("Abort ".concat(m))}))};var a=n.props,o=a.APIKey,c=a.onSetClickLocation,i=a.olMap;n.map=i,n.mapRef=Object(r.createRef)(),n.hoveredFeature=null,n.hoveredRoute=null,n.initialRouteDrag=null,n.state={hoveredStationOpen:!1,hoveredStationName:"",isActiveRoute:!1,hoveredPoint:null},n.onHighlightPoint=n.onHighlightPoint.bind(Object(L.a)(n)),n.projection="EPSG:3857";var u=new V.a(H.a.readConfig([{name:"Basemap",visible:!0,isBaseLayer:!0,data:{type:"mapbox",url:"https://maps.geops.io/styles/travic/style.json?key=".concat(o)}}]));n.routeVectorSource=new q.a({features:[]}),u.addLayer(new G.a({key:"routeLayer",name:"routeLayer",olLayer:new z.a({zIndex:1,source:n.routeVectorSource})})),n.highlightVectorSource=new q.a({}),u.addLayer(new G.a({key:"highlightLayer",name:"highlightLayer",olLayer:new z.a({zIndex:1,source:n.highlightVectorSource})})),n.markerVectorSource=new q.a({}),u.addLayer(new G.a({key:"markerLayer",name:"markerLayer",olLayer:new z.a({zIndex:1,source:n.markerVectorSource})})),n.markerVectorLayer=u.getLayer("markerLayer"),n.routeVectorLayer=u.getLayer("routeLayer"),n.layers=Object(P.a)(u.getLayers());var l=new Z.a({layers:[n.markerVectorLayer.olLayer],hitTolerance:3});l.on("translateend",(function(e){var t,r=n.props,a=r.tracks,o=r.onSetTracks,c=r.currentStops,i=r.currentStopsGeoJSON,u=r.onSetCurrentStops,l=r.onSetCurrentStopsGeoJSON,s=J.a.clone(a),d=J.a.clone(c),p=J.a.clone(i),f=e.features.getArray()[0].getProperties(),m=f.name,h=f.id;if(m)t=c.indexOf(m);else{t=c.findIndex((function(e){if(!Array.isArray(e))return!1;var t=h.slice().reverse();return e[0]===t[0]&&e[1]===t[1]}))}-1!==t&&(s[t]="",d[t]=e.coordinate,p[t]={type:"FeatureCollection",features:[{type:"Feature",properties:{id:e.coordinate.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:e.coordinate}}]},o(s),u(d),l(p))}));var s=new $.a({source:n.routeVectorSource,pixelTolerance:4,condition:function(){var e=n.props.currentMot;return!Ie.includes(e)},style:function(){var e=n.props.currentMot;return ln(e)}});return s.on("modifystart",(function(e){n.initialRouteDrag={features:e.features.getArray(),coordinate:e.mapBrowserEvent.coordinate}})),s.on("modifyend",(function(e){var t=n.initialRouteDrag.features,r=n.props,a=r.tracks,o=r.currentMot,c=r.currentStops,i=r.currentStopsGeoJSON,u=r.onSetTracks,l=r.onSetCurrentStops,s=r.onSetCurrentStopsGeoJSON,d=Object(P.a)(a),p=J.a.clone(c),f=J.a.clone(i),m=-1;if(!Ie.includes(o)){var h=t.map((function(e){return e.getGeometry()})).map((function(e){return[].concat(Object(P.a)(e.getFirstCoordinate()),Object(P.a)(e.getLastCoordinate()))})),g=n.routeVectorSource.getClosestFeatureToCoordinate(n.initialRouteDrag.coordinate).getGeometry(),b=[].concat(Object(P.a)(g.getFirstCoordinate()),Object(P.a)(g.getLastCoordinate()));h.forEach((function(e,t){e.length===b.length&&e.every((function(e,t){return e===b[t]}))&&(m=t+1)}))}if(m>=0){if(p.splice(m,0,e.mapBrowserEvent.coordinate),d.splice(m,0,""),f[m])Object.keys(f).reverse().forEach((function(t){parseInt(t,10)>=m&&(f["".concat(parseInt(t,10)+1)]=f[t]),parseInt(t,10)===m&&(f[m]={type:"FeatureCollection",features:[{type:"Feature",properties:{id:e.mapBrowserEvent.coordinate.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:e.mapBrowserEvent.coordinate}}]})}));u(d),l(p),s(f)}n.initialRouteDrag=null})),Object(X.a)().extend([l,s]).getArray().forEach((function(e){n.map.addInteraction(e)})),n.onZoomRouteClick=function(){var e;n.routeVectorSource.getFeatures().length&&(e=n.routeVectorSource.getExtent()),4===e.filter((function(e){return Number.isFinite(e)})).length&&n.map.getView().fit(n.routeVectorSource.getExtent(),{size:n.map.getSize(),duration:500,padding:[200,200,200,200]})},n.onPanViaClick=function(e,t){var r=n.props.currentStopsGeoJSON;if(r&&r[t]){var a=r[t].features?r[t].features[0].geometry.coordinates:r[t].geometry.coordinates;n.map.getView().animate({center:a,duration:500,padding:[100,100,100,100]})}},n.map.on("singleclick",(function(e){var t=n.props,r=t.isFieldFocused;(t.currentStops.includes("")||r)&&c(e.coordinate)})),n.map.on("pointermove",(function(e){var t=n.props.currentMot;n.hoveredFeature&&(n.hoveredFeature=null,n.setState({hoveredStationOpen:!1,hoveredStationName:""})),n.hoveredRoute&&(n.routeVectorLayer.olLayer.setStyle(sn(t,!1)),n.hoveredRoute=null,n.setState({hoveredPoint:null})),n.map.getFeaturesAtPixel(e.pixel,{hitTolerance:2}).forEach((function(t){if("Point"===t.getGeometry().getType()){n.hoveredFeature=t;var r="",a=t.get("country_code");r=t.get("name")?"".concat(t.get("name")).concat(a?" - ".concat(a):""):"".concat(De(t.getGeometry().flatCoordinates)),n.setState({hoveredStationOpen:!0,hoveredStationName:r})}return"LineString"===t.getGeometry().getType()&&(n.hoveredRoute=t,n.setState({hoveredPoint:e.coordinate})),!0}))})),n}return Object(A.a)(t,e),Object(I.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this,n=this.props,r=n.currentStopsGeoJSON,a=n.currentMot,o=n.tracks,c=a&&a!==e.currentMot,i=o!==e.tracks,u=r&&r!==e.currentStopsGeoJSON;(c||u||i)&&(this.markerVectorSource.clear(),Object.keys(r).forEach((function(e){t.markerVectorSource.addFeatures((new K.a).readFeatures(r[e])),t.markerVectorSource.getFeatures().forEach((function(e){return e.setStyle(ln(a))}))})),this.routeVectorSource.clear(),this.setIsActiveRoute(!1),Object.keys(r).length>1&&this.drawNewRoute())}},{key:"onHighlightPoint",value:function(e){var t=this.props.currentMot;this.highlightVectorSource.clear();var n=new D.a({geometry:new W.a(e)});n.setStyle(ln(t)),this.highlightVectorSource.addFeatures([n])}},{key:"onFeaturesHover",value:function(e){this.mapRef&&(this.mapRef.current.node.current.style.cursor=e.length?"pointer":"inherit")}},{key:"setIsActiveRoute",value:function(e){this.setState({isActiveRoute:e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.center,r=t.mots,o=t.APIKey,c=t.selectedRoutes,i=t.isRouteInfoOpen,u=t.stationSearchUrl,l=this.state,s=l.isActiveRoute,d=l.hoveredPoint,p=l.hoveredStationOpen,f=l.hoveredStationName;return a.a.createElement(a.a.Fragment,null,a.a.createElement(Nt,{mots:r,stationSearchUrl:u,isActiveRoute:s,onZoomRouteClick:this.onZoomRouteClick,onPanViaClick:this.onPanViaClick,APIKey:o}),a.a.createElement(Y.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:p,message:f}),a.a.createElement(U.a,{ref:this.mapRef,center:n,layers:this.layers,onMapMoved:function(t){return e.onMapMoved(t)},onFeaturesHover:function(t){return e.onFeaturesHover(t)},zoom:6,tabIndex:null,map:this.map,viewOptions:{projection:this.projection}}),i&&c.length?a.a.createElement(Ut,{routes:c,hoveredCoords:d,onHighlightPoint:this.onHighlightPoint,clearHighlightPoint:function(){e.highlightVectorSource.clear()}}):null)}}]),t}(r.Component);pn.getExtentCenter=function(e){return[e[0]+(e[2]-e[0])/2,e[1]+(e[3]-e[1])/2]},pn.indexInGeom=function(e,t){return e.indexOf(t[0])===e.indexOf(t[1])-1};var fn=Object(i.b)((function(e){return{center:e.MapReducer.center,selectedRoutes:e.MapReducer.selectedRoutes,isRouteInfoOpen:e.MapReducer.isRouteInfoOpen,currentMot:e.MapReducer.currentMot,currentStops:e.MapReducer.currentStops,currentStopsGeoJSON:e.MapReducer.currentStopsGeoJSON,isFieldFocused:e.MapReducer.isFieldFocused,routingElevation:e.MapReducer.routingElevation,resolveHops:e.MapReducer.resolveHops,olMap:e.MapReducer.olMap,tracks:e.MapReducer.tracks}}),(function(e){return{onSetCenter:function(t){return e(Se(t))},onSetTracks:function(t){return e(xe(t))},onSetCurrentStops:function(t){return e(ye(t))},onSetCurrentStopsGeoJSON:function(t){return e(Ee(t))},onSetClickLocation:function(t){return e(function(e){return{type:"SET_CLICK_LOCATION",clickLocation:e}}(t))},onShowNotification:function(t,n){return e(ke(t,n))},onSetShowLoadingBar:function(t){return e(we(t))},onSetSelectedRoutes:function(t){return e(Ce(t))}}}))(pn),mn=n(496),hn=n(492),gn=n.n(hn),bn=(new AbortController).signal,vn=function(e,t,n){if(e.split(",").length>1){var r,a=e.split(",").filter((function(e){return!isNaN(e)})).map((function(e){return parseFloat(e)}));if(2===a.length&&function(e){return!!(isFinite(e[1])&&Math.abs(e[1])<=90&&isFinite(e[0])&&Math.abs(e[0])<=180)}(a)){var o=ze(a);r={type:"FeatureCollection",features:[{type:"Feature",properties:{id:o,type:"coordinates"},geometry:{type:"Point",coordinates:o}}]}}return Promise.resolve(r)}var c;return c=/^![a-zA-Z0-9]{16}$/.test(e)?"".concat(n,"lookup/").concat(e.replace("!",""),"/?key=").concat(t):"".concat(n,"?q=").concat(e.replace("!",""),"&key=").concat(t),fetch(c,{signal:bn}).then((function(e){return e.json()})).then((function(e){var t=e.features[0];return t.geometry.coordinates=ze(e.features[0].geometry.coordinates),t})).catch((function(){return console.error("Failed to fetch geoJson"),null}))};var On=function(e){var t=e.mots,n=e.APIKey,o=e.stationSearchUrl,c=Object(i.c)(),u=gn.a.parse(window.location.search),l=Object(i.d)((function(e){return e.MapReducer.center})),s=Object(i.d)((function(e){return e.MapReducer.tracks})),d=Object(i.d)((function(e){return e.MapReducer})),p=Object(i.d)((function(e){return e.MapReducer.currentMot})),f=Object(i.d)((function(e){return e.MapReducer.currentStops})),m=Object(i.d)((function(e){return e.MapReducer.currentStopsGeoJSON})),h=Object(i.d)((function(e){return e.MapReducer.routingElevation})),g=Object(i.d)((function(e){return e.MapReducer.resolveHops})),b=d.olMap,v=Object(r.useState)({}),O=Object(Q.a)(v,2),S=O[0],y=O[1];return Object(r.useEffect)((function(){var e={};if(u){if(u.z&&!isNaN(parseFloat(u.z))&&b.getView().setZoom(u.z),u.x&&!isNaN(parseFloat(u.x))&&u.y&&!isNaN(parseFloat(u.y))&&c(Se([parseFloat(u.x),parseFloat(u.y)])),u.mot){var r=t.find((function(e){return e===u.mot}))||t[0];e.mot=r,c(je(r))}if(u.via){e.via=u.via;var a=u.via.split("|"),i=a.map((function(e){return vn(e.split("$")[0],n,o)}));c(xe(a.map((function(e){return e.split("$")[1]||""})))),Promise.all(i).then((function(e){c(ye(e.map((function(e){return e?"FeatureCollection"===e.type?e.features[0].geometry.coordinates:e.properties.name:""}))));var t={};e.filter((function(e){return!!e})).forEach((function(e,n){return t["".concat(n)]=e})),c(Ee(t))}))}u.elevation&&c(function(e){return{type:"SET_ROUTING_ELEVATION",routingElevation:e}}(parseInt(u.elevation,10))),u["resolve-hops"]&&c(function(e){return{type:"SET_RESOLVE_HOPS",resolveHops:e}}("true"===u["resolve-hops"]))}y(e)}),[]),Object(r.useEffect)((function(){var e={};e.z=b.getView().getZoom();var t=Object(Q.a)(l,1);e.x=t[0];var n=Object(Q.a)(l,2);e.y=n[1],e.mot=p,e.elevation=parseInt(h,10),e["resolve-hops"]=g,0!==Object.keys(m).length&&(e.via=function(e,t){return!e||Object.keys(e).length<2?null:Object.keys(e).map((function(n,r){return e[n].features?"".concat(De(e[n].features[0].geometry.coordinates)):"!".concat(e[n].properties.uid).concat(t[r]?"$".concat(t[r]):"")})).join("|")}(m,s)),y(e)}),[p,f,m,l,h,g,b,s]),a.a.createElement(mn.a,{map:b,params:S})},Sn=n(1019),yn=function(e){function t(e){var n;return Object(T.a)(this,t),(n=Object(F.a)(this,Object(_.a)(t).call(this,e))).handleOpen=function(){n.setState({open:!0})},n.handleClose=function(){var e=n.props.onShowNotification;n.setState({open:!1}),e(null,"error")},n.state={open:!1},n}return Object(A.a)(t,e),Object(I.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.notificationMessage;t&&t!==e.notificationMessage&&this.handleOpen()}},{key:"render",value:function(){var e=this.props,t=e.notificationMessage,n=e.notificationType,r=this.state.open;return a.a.createElement(Y.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:r,autoHideDuration:6e3,onClose:this.handleClose},a.a.createElement(Sn.a,{onClose:this.handleClose,severity:n,elevation:6,variant:"filled"},t))}}]),t}(a.a.Component),En=Object(i.b)((function(e){return{notificationMessage:e.MapReducer.notificationMessage,notificationType:e.MapReducer.notificationType}}),(function(e){return{onShowNotification:function(t,n){return e(ke(t,n))}}}))(yn),jn={mots:Te,routingUrl:"https://api.geops.io/routing/v1/",stationSearchUrl:"https://api.geops.io/stops/v1/"};function kn(e){var t=e.mots,n=e.routingUrl,r=e.stationSearchUrl,o="5cc87b12d7c5370001c1d655012b7edc8da1475084e49b84b6ba658e";return a.a.createElement(i.a,{store:M},a.a.createElement(On,{mots:t,APIKey:o,stationSearchUrl:r}),a.a.createElement(fn,{mots:t,routingUrl:n,APIKey:o,stationSearchUrl:r}),a.a.createElement(En,null))}kn.defaultProps=jn;var Rn=kn;n(960),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(Rn,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[553,1,2]]]);
//# sourceMappingURL=main.c2dde2c6.chunk.js.map