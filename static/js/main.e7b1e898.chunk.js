(this["webpackJsonpgeops-routing-demo"]=this["webpackJsonpgeops-routing-demo"]||[]).push([[0],{353:function(e,t,a){e.exports=a(568)},563:function(e,t,a){},565:function(e,t,a){},567:function(e,t,a){},568:function(e,t,a){"use strict";a.r(t);a(354),a(363),a(553);var n=a(0),r=a.n(n),o=a(32),c=a.n(o),i=a(78),l=a(134),u=a(315),s=a(136),d={currentMot:"bus",currentStops:["",""],currentStopsGeoJSON:{},clickLocation:null,notificationMessage:"",notificationType:"info",isFieldFocused:!1},p=function(e,t){var a={currentStops:t.currentStops};return Object(s.a)({},e,{},a)},m=function(e,t){var a={currentStopsGeoJSON:t.currentStopsGeoJSON};return Object(s.a)({},e,{},a)},f=function(e,t){var a={currentMot:t.currentMot};return Object(s.a)({},e,{},a)},h=function(e,t){var a={clickLocation:t.clickLocation};return Object(s.a)({},e,{},a)},b=function(e,t){var a={notificationMessage:t.notificationMessage,notificationType:t.notificationType};return Object(s.a)({},e,{},a)},v=function(e,t){var a={isFieldFocused:t.isFieldFocused};return Object(s.a)({},e,{},a)},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_STOPS":return p(e,t);case"SET_CURRENT_STOPS_GEOJSON":return m(e,t);case"SET_CURRENT_MOT":return f(e,t);case"SET_CLICK_LOCATION":return h(e,t);case"SHOW_NOTIFICATION":return b(e,t);case"SET_IS_FIELD_FOCUSED":return v(e,t);default:return e}},g=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.d,y=Object(l.c)({MapReducer:S}),E=Object(l.e)(y,g(Object(l.a)(u.a))),O=a(142),k=a(101),w=a(186),C=a(187),j=a(204),R=a(626),N=a(326),F=a(14),T=a(625),P=a(108),_=a(316),x=a.n(_),M=a(79),A=a.n(M),I=a(206),V=a(630),G=a(313),H=a(203),z=a(634),L=a(60),U=a(615),J=a(611),W=a(631),D=a(628),Z=a(622),q=a(623),K=a(627),B=a(621),X=a(207),$=a(624),Q=a(189),Y=a.n(Q),ee=function(e){return{type:"SET_CURRENT_STOPS",currentStops:e}},te=function(e){return{type:"SET_CURRENT_STOPS_GEOJSON",currentStopsGeoJSON:e}},ae=function(e){return{type:"SET_CURRENT_MOT",currentMot:e}},ne=function(e,t){return{type:"SHOW_NOTIFICATION",notificationMessage:e,notificationType:t}},re=function(e){return{type:"SET_IS_FIELD_FOCUSED",isFieldFocused:e}},oe=(a(563),["rail","bus","foot"]),ce=["tram","subway","gondola","funicular","ferry","car"],ie=[].concat(oe,ce),le=["foot","car"],ue=a(319),se=a.n(ue),de=a(317),pe=a.n(de),me=a(318),fe=a.n(me),he=function(e){var t=null,a=e.charAt(0).toUpperCase()+e.slice(1);switch(e){case"rail":t=r.a.createElement(pe.a,null);break;case"foot":t=r.a.createElement(fe.a,null);break;default:t=r.a.createElement(se.a,null)}return r.a.createElement("span",{title:a},t)},be=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return Object(F.m)(e,"EPSG:3857","EPSG:4326").map((function(e){return e.toFixed(t)}))},ve=a(612),Se=a(569),ge=a(614),ye=a(613),Ee=a(240),Oe=a.n(Ee),ke=function(e,t){return e&&t?"".concat(e," - ").concat(t):e||t?e||t:null};function we(e){var t=e.currentSearchResults,a=e.processClickedResultHandler;return 0===t.length?null:r.a.createElement(J.a,{square:!0,elevation:3},r.a.createElement(ve.a,{component:"nav","aria-label":"search results"},t.map((function(e,t){return 0!==t?r.a.createElement(Se.a,{onClick:function(){a(e)},button:!0,key:Y()()},r.a.createElement(ye.a,null,r.a.createElement(Oe.a,null)),r.a.createElement(ge.a,{primary:e.properties.name,secondary:ke(e.properties.code,e.properties.country_code)})):r.a.createElement(Se.a,{onClick:function(){return a(e)},button:!0,selected:!0,key:"searchResult-".concat(e.properties.name)},r.a.createElement(ye.a,null,r.a.createElement(Oe.a,null)),r.a.createElement(ge.a,{primary:e.properties.name,secondary:ke(e.properties.code,e.properties.country_code)}))}))))}we.defaultProps={currentSearchResults:[]};var Ce=we,je=a(618),Re=a(632),Ne=a(617),Fe=a(636),Te=a(324),Pe=a.n(Te),_e=a(322),xe=a.n(_e),Me=a(241),Ae=a.n(Me),Ie=a(325),Ve=a.n(Ie),Ge=a(321),He=a.n(Ge),ze=a(323),Le=a.n(ze),Ue=a(9),Je=a.n(Ue),We=Je.a.arrayOf(Je.a.number.isRequired).isRequired,De=Je.a.shape({coordinates:We,type:Je.a.string.isRequired}),Ze=Je.a.shape({geometry:De,properties:Je.a.shape({id:Je.a.oneOfType([Je.a.string.isRequired,Je.a.string.isRequired]),type:Je.a.string.isRequired}),type:Je.a.string.isRequired}),qe=Je.a.shape({features:Je.a.shape({0:Je.a.oneOfType([Ze,We]),1:Je.a.oneOfType([Ze,We])}),type:Je.a.string.isRequired}),Ke=(Je.a.shape({0:qe,1:qe}),Je.a.arrayOf(Je.a.oneOfType([Je.a.string.isRequired,We])),Object(U.a)((function(){return{gridContainer:{width:"100%",padding:"0px 0px 0px 20px",boxSizing:"unset"},button:{color:"black","& svg":{height:"20px",width:"20px"}},fieldWrapper:{maxWidth:"75%"},buttonWrapper:{maxWidth:"26px"}}})));function Be(e){var t,a=Ke(),n=Object(i.c)(),o=e.index,c=e.addNewSearchFieldHandler,l=e.currentStops,u=e.removeSearchFieldHandler,s=e.searchStopsHandler,d=e.singleStop,p=e.processHighlightedResultSelectHandler,m=e.onFieldFocusHandler,f=e.onZoomRouteClick,h=e.isActiveRoute,b=e.onPanViaClick,v=null,S=10,g="",y=null;return 0===o?(v=r.a.createElement(Fe.a,{title:"Pan to the feature"},r.a.createElement(Ne.a,{onClick:function(){return b(d,o)},className:a.button,"aria-label":"Pan to the feature",size:"small"},r.a.createElement(He.a,{fontSize:"small",color:"primary"}))),g="Start",y=r.a.createElement(je.a,{item:!0,xs:1,className:a.buttonWrapper},r.a.createElement(Fe.a,{title:"Add Hop"},r.a.createElement(Ne.a,{onClick:function(){return c(l,o+1)},disabled:""===l[o],className:a.button,"aria-label":"Add Hop",size:"small"},r.a.createElement(Ae.a,{fontSize:"small"}))))):o===l.length-1?(v=r.a.createElement(Fe.a,{title:"Pan to the feature"},r.a.createElement(Ne.a,{onClick:function(){return b(d,o)},className:a.button,"aria-label":"Pan to the feature",size:"small"},r.a.createElement(xe.a,{color:"primary"}))),g="End",y=r.a.createElement(je.a,{item:!0,xs:1,className:a.buttonWrapper},r.a.createElement(Fe.a,{title:"Zoom to the route"},r.a.createElement(Ne.a,{onClick:function(){return f()},disabled:!h,className:a.button,"aria-label":"Zoom to the route",size:"small"},r.a.createElement(Le.a,{fontSize:"small"}))))):(v=r.a.createElement(Fe.a,{title:"Pan to the feature"},r.a.createElement(Ne.a,{onClick:function(){return b(d,o)},className:a.button,"aria-label":"Pan to the feature",size:"small"},r.a.createElement(Pe.a,{fontSize:"small",color:"primary"}))),S=9,g="Hop",y=r.a.createElement(r.a.Fragment,null,r.a.createElement(je.a,{item:!0,xs:1,className:a.buttonWrapper},r.a.createElement(Fe.a,{title:"Add Hop"},r.a.createElement(Ne.a,{disabled:""===l[o],onClick:function(){return c(l,o+1)},className:a.button,"aria-label":"addHop",size:"small"},r.a.createElement(Ae.a,{fontSize:"small"})))),r.a.createElement(je.a,{item:!0,xs:1,className:a.buttonWrapper},r.a.createElement(Fe.a,{title:"Remove Hop"},r.a.createElement(Ne.a,{onClick:function(){return u(o)},className:a.button,"aria-label":"removeHop",size:"small"},r.a.createElement(Ve.a,{fontSize:"small"})))))),r.a.createElement(je.a,{container:!0,spacing:1,className:a.gridContainer,alignItems:"flex-end"},r.a.createElement(je.a,{item:!0,xs:1},v),r.a.createElement(je.a,{item:!0,xs:S,className:a.fieldWrapper},r.a.createElement(Re.a,{style:{width:"100%"},label:g,color:"primary",onChange:function(e){return s(e,o)},value:(t=d,Array.isArray(t)?be(t):t),onKeyDown:p,onFocus:function(){n(re(!0)),m(o)},onBlur:function(){return setTimeout((function(){n(re(!1))}),500)},onClick:function(e){e.target.select&&e.target.select()}})),y)}Be.defaultProps={currentStops:[],singleStop:""};var Xe=Be;function $e(e){var t=e.children,a=e.value,n=e.index;return r.a.createElement(X.a,{component:"div",role:"tabpanel",hidden:a!==n,id:Y()(),"aria-labelledby":"simple-tab-".concat(n)},a===n&&t)}var Qe=Object(U.a)((function(){return{tabs:{width:"75%"},tab:{minWidth:"33%",width:"33%"},dropDown:{width:"25%",backgroundColor:"white"},select:{height:"100%"},selectInput:{backgroundColor:"white","&:focus":{backgroundColor:"white"}},checkbox:{padding:"20px 23px"}}})),Ye=new AbortController;function et(e){var t=e.mots,a=e.stationSearchUrl,o=e.APIKey,c=e.isActiveRoute,l=e.onZoomRouteClick,u=e.onPanViaClick,s=Qe(),d=Object(i.c)(),p=function(e,t){var a=[];return e.filter((function(e){return t.includes(e)})).forEach((function(e){var n=t.find((function(t){return t===e}));n&&a.push({name:n,icon:he(n)})})),0===a.length&&a.push({name:ie[0],icon:he(ie[0])}),a},m=p(t,oe),f=p(t,ce),h=Object(i.d)((function(e){return e.MapReducer.clickLocation})),b=Object(i.d)((function(e){return e.MapReducer.currentStops})),v=Object(i.d)((function(e){return e.MapReducer.currentStopsGeoJSON})),S=Object(n.useState)(m),g=Object(L.a)(S,1)[0],y=Object(n.useState)(m[0].name),E=Object(L.a)(y,2),O=E[0],k=E[1],w=Object(n.useState)(f),C=Object(L.a)(w,1)[0],j=Object(n.useState)([]),R=Object(L.a)(j,2),N=R[0],T=R[1],P=r.a.useState(!0),_=Object(L.a)(P,2),x=_[0],M=_[1],I=Object(n.useState)(0),V=Object(L.a)(I,2),G=V[0],H=V[1],z=Object(n.useState)(!1),U=Object(L.a)(z,2),X=U[0],Q=U[1],Y=Object(n.useState)(void 0),ue=Object(L.a)(Y,2),se=ue[0],de=ue[1];Object(n.useEffect)((function(){d(ae(g[0].name))}),[]);var pe=function(e,t,a){d(ee(e)),d(te(t)),H(a)},me=function(e,t){var a=A.a.clone(v),n={type:"FeatureCollection",features:[{type:"Feature",properties:{id:h.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:h}}]};a[G]=n,pe(e,a,t),d(te(a))};Object(n.useEffect)((function(){if(h)if(""===b[G]){b[G]=h,me(b,G+1<b.length?G+1:G)}else{var e=b,t=G;e[G]=h,me(e,G);var a=A.a.clone(v),n={type:"FeatureCollection",features:[{type:"Feature",properties:{id:h.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:h}}]};a[G]=n,pe(e,a,t),d(te(a))}}),[h]);var fe=function(e,t){de(null),k(t),d(ae(t))},be=function(e){H(e),d(re(!0))},ve=function(e,t){var a=A.a.clone(b),n=A.a.clone(v);if(a.splice(t,0,""),n[t]){var r=Object.keys(n).reverse();r.forEach((function(e){parseInt(e,10)>=r.length-1&&(n["".concat(parseInt(e,10)+1)]=n[e])}))}d(ee(a)),d(te(n))},Se=function(e){var t=A.a.clone(b),a=A.a.clone(v);if(t.splice(e,1),a[e]){var n=Object.keys(a);n.forEach((function(t){var n=parseInt(t,10);n===e?delete a[e]:n>e&&(a[n-1]=a[n])})),delete a[n.length-1]}d(ee(t)),d(te(a))},ge=function(e,t){if(!e.target.value){var n=b;return n[t]="",T([]),d(ee(n)),void Q(!1)}var r=A.a.clone(b);r[t]=e.target.value,d(ee(r)),Q(!0),Ye.abort();var c=(Ye=new AbortController).signal,i="".concat(a,"?q=").concat(e.target.value,"&key=").concat(o).concat(le.includes(O)?"":"&mots=".concat(x?O:""));fetch(i,{signal:c}).then((function(e){return e.json()})).then((function(e){e.error?d(ne("Couldn't find stations","warning")):(0===e.features.length&&d(ne("Couldn't find stations","warning")),T(e.features),Q(!1))})).catch((function(e){if("AbortError"!==e.name)throw e;console.warn("Abort ".concat(i))}))},ye=function(e){var t=Object(L.a)(N,1)[0];if("Enter"===e.key&&t){var a=b;pe[G]=t.properties.name;var n=A.a.clone(v);n[G]=t,d(ee(a)),T([]),d(te(n))}if("Backspace"===e.key){var r=[];e.target.value&&(r=N);var o={};Object.keys(v).forEach((function(e){e!==G.toString()&&(o[e]=v[e])})),T(r),d(te(o))}};return l&&u?r.a.createElement("div",{className:"rd-routing-menu"},r.a.createElement(J.a,{square:!0,elevation:3},r.a.createElement("div",{className:"rd-routing-menu-header"},r.a.createElement(D.a,{value:!!oe.includes(O)&&O,className:s.tabs,onChange:function(e,t){fe(0,t)},indicatorColor:"primary",textColor:"primary","aria-label":"mots icons"},g.map((function(e){return r.a.createElement(Z.a,{className:s.tab,key:"mot-".concat(e.name),value:e.name,icon:e.icon,"aria-label":e.name})}))),r.a.createElement(B.a,{className:s.dropDown},r.a.createElement(K.a,{renderValue:function(e){return""!==e?e:"Other MOTs"},className:s.select,classes:{root:s.selectInput},labelId:"rd-other-mot-label",value:se||"",disableUnderline:!se,displayEmpty:!0,onChange:function(e){if(e){var t=e.target.value;fe(0,t),de(t)}else de(null)}},C.map((function(e){return r.a.createElement(q.a,{value:e.name,key:"other-mot-".concat(e.name)},e.name)}))))),r.a.createElement($e,null,b.map((function(e,t){return r.a.createElement(Xe,{key:"searchField-".concat(t),index:t,addNewSearchFieldHandler:ve,currentStops:b,removeSearchFieldHandler:Se,searchStopsHandler:ge,singleStop:e,processHighlightedResultSelectHandler:ye,onFieldFocusHandler:be,onZoomRouteClick:l,onPanViaClick:u,isActiveRoute:c})})),r.a.createElement("div",{className:"rd-mot-checkbox"},r.a.createElement(W.a,{className:s.checkbox,checked:x,onChange:function(){return M(!x)},color:"primary",inputProps:{"aria-label":"use only mot"}}),r.a.createElement("span",null,"Search only selected mode of transport"))),X?r.a.createElement($.a,null):null),r.a.createElement(Ce,{currentSearchResults:N,processClickedResultHandler:function(e){var t=b;t[G]=e.properties.name;var a=A.a.clone(v);a[G]=e,d(ee(t)),T([]),Object.keys(a).forEach((function(e){var t;e===G.toString()&&(a[e].geometry.coordinates=(t=a[e].geometry.coordinates,Object(F.m)(t,"EPSG:4326","EPSG:3857")))})),d(te(a))}})):null}$e.defaultProps={value:null,index:null},et.defaultProps={onZoomRouteClick:void 0,onPanViaClick:void 0};var tt=et,at=a(242),nt=a(168),rt=a(243),ot=a(205),ct=function(e){return e.map((function(e){return new at.b({stroke:new nt.a({color:e[0],width:e[1],lineDash:e[2]})})}))},it=ct([["black",5,[10,10]],["red",3,[10,10]]]),lt=ct([["black",6,[10,10]],["red",4,[10,10]]]),ut=ct([["black",5],["yellow",3]]),st=ct([["black",6],["yellow",4]]),dt=ct([["rgb(173, 216, 230)",3]]),pt=ct([["rgb(173, 216, 230)",5]]),mt=ct([["black",5,[.5,10]]]),ft=ct([["black",6,[.5,10]]]),ht=ct([["black",5],["blue",3]]),bt=ct([["black",6],["blue",4]]),vt=new at.b({image:new rt.a({radius:7,fill:new ot.a({color:"red"}),stroke:new nt.a({color:"black",width:2})})}),St=new at.b({image:new rt.a({radius:7,fill:new ot.a({color:"rgb(173, 216, 230)"})})}),gt=new at.b({image:new rt.a({radius:7,fill:new ot.a({color:"black"})})}),yt=new at.b({image:new rt.a({radius:7,fill:new ot.a({color:"yellow"}),stroke:new nt.a({color:"black",width:2})})}),Et=new at.b({image:new rt.a({radius:7,fill:new ot.a({color:"blue"}),stroke:new nt.a({color:"black",width:2})})}),Ot=function(e,t){return"rail"===e?t?lt:it:"bus"===e?t?st:ut:"foot"===e?t?pt:dt:"car"===e?t?ft:mt:t?bt:ht},kt=(a(565),new AbortController),wt=function(e){function t(e){var a;return Object(O.a)(this,t),(a=Object(w.a)(this,Object(C.a)(t).call(this,e))).drawNewRoute=function(){var e=[],t=a.props,n=t.currentStopsGeoJSON,r=t.routingUrl,o=t.currentMot,c=t.APIKey,i=t.onShowNotification;Object.keys(n).forEach((function(t){if(n[t].features)e.push("".concat(be(n[t].features[0].geometry.coordinates).slice().reverse()));else{var a=le.includes(o)?"name":"uid";e.push("!".concat(n[t].properties[a]))}})),kt.abort();var l=(kt=new AbortController).signal,u="".concat(r,"?via=").concat(e.join("|"),"&mot=").concat(o,"&resolve-hops=false&srs=3857&key=").concat(c);fetch(u,{signal:l}).then((function(e){return e.json()})).then((function(e){if(e.error)i("Couldn't find route","error");else{a.routeVectorSource.clear();var t=le.includes(o)?new I.a({dataProjection:"EPSG:4326",featureProjection:"EPSG:3857"}):new I.a;a.routeVectorSource.addFeatures(t.readFeatures(e)),a.setIsActiveRoute(!!a.routeVectorSource.getFeatures().length),a.routeVectorSource.getFeatures().forEach((function(e){return e.setStyle(Ot(o))}))}})).catch((function(e){if("AbortError"!==e.name)throw e;console.warn("Abort ".concat(u))}))},a.hoveredFeature=null,a.hoveredRoute=null,a.state={hoveredStationOpen:!1,hoveredStationName:"",isActiveRoute:!1},a}return Object(j.a)(t,e),Object(k.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.APIKey,n=t.onSetClickLocation,r=[949042.143189,5899715.591163];this.markerVectorSource=new V.a({}),this.markerVectorLayer=new T.a({zIndex:1,source:this.markerVectorSource}),this.routeVectorSource=new V.a({}),this.routeVectorLayer=new T.a({zIndex:0,source:this.routeVectorSource});var o=new G.a({layers:[this.markerVectorLayer]});o.on("translateend",(function(t){var a,n=e.props,r=n.currentStops,o=n.currentStopsGeoJSON,c=n.onSetCurrentStops,i=n.onSetCurrentStopsGeoJSON,l=A.a.clone(r),u=A.a.clone(o),s=t.features.getArray()[0].getProperties(),d=s.name,p=s.id;l[a=d?r.indexOf(d):function(e,t){for(var a=0;a<e.length;a+=1)if(e[a][0]===t[0]&&e[a][1]===t[1])return a;return-1}(r,p.slice().reverse())]=t.coordinate,u[a]={type:"FeatureCollection",features:[{type:"Feature",properties:{id:t.coordinate.slice().reverse(),type:"coordinates"},geometry:{type:"Point",coordinates:t.coordinate}}]},c(l),i(u)})),this.map=new R.a({target:"map",interactions:Object(H.a)().extend([o]),view:new N.a({projection:"EPSG:3857",center:r,zoom:6})});var c=new x.a.Map({style:"https://maps.geops.io/styles/travic/style.json?key=".concat(a),attributionControl:!1,boxZoom:!1,center:Object(F.j)(r),container:this.map.getTargetElement(),doubleClickZoom:!1,dragPan:!1,dragRotate:!1,interactive:!1,keyboard:!1,pitchWithRotate:!1,scrollZoom:!1,touchZoomRotate:!1}),i=new P.a({render:function(e){var t=c.getCanvas(),a=e.viewState,n=i.getVisible();t.style.display=n?"block":"none";var r=i.getOpacity();t.style.opacity=r;var o=a.rotation;return o&&c.rotateTo(180*-o/Math.PI,{animate:!1}),c.jumpTo({center:Object(F.j)(a.center),zoom:a.zoom-1,animate:!1}),c._frame&&(c._frame.cancel(),c._frame=null),c._render(),t}});[i,this.markerVectorLayer,this.routeVectorLayer].forEach((function(t){return e.map.addLayer(t)})),this.onZoomRouteClick=function(){var t;e.routeVectorSource.getFeatures().length&&(t=e.routeVectorSource.getExtent()),4===t.filter((function(e){return Number.isFinite(e)})).length&&e.map.getView().fit(e.routeVectorSource.getExtent(),{size:e.map.getSize(),duration:500,padding:[200,200,200,200]})},this.onPanViaClick=function(t,a){var n=e.props.currentStopsGeoJSON;if(n&&n[a]){var r=n[a].features?n[a].features[0].geometry.coordinates:n[a].geometry.coordinates;e.map.getView().animate({center:r,duration:500,padding:[100,100,100,100]})}},this.map.on("singleclick",(function(t){var a=e.props,r=a.isFieldFocused;(a.currentStops.includes("")||r)&&n(t.coordinate)})),this.map.on("pointermove",(function(t){var a=e.props.currentMot;e.hoveredFeature&&(e.hoveredFeature=null,e.setState({hoveredStationOpen:!1,hoveredStationName:""})),e.hoveredRoute&&(e.hoveredRoute.setStyle(Ot(a,!1)),e.hoveredRoute=null);var n=e.map.getFeaturesAtPixel(t.pixel);n.length?document.body.classList.add("rd-pointer"):document.body.classList.remove("rd-pointer"),n.forEach((function(t){if("Point"===t.getGeometry().getType()){e.hoveredFeature=t;var n="",r=t.get("country_code");n=t.get("name")?"".concat(t.get("name")).concat(r?" - ".concat(r):""):"".concat(be(t.getGeometry().flatCoordinates)),e.setState({hoveredStationOpen:!0,hoveredStationName:n})}return"LineString"===t.getGeometry().getType()&&(e.hoveredRoute=t,t.setStyle(Ot(a,!0))),!0}))}))}},{key:"componentDidUpdate",value:function(e){var t=this,a=this.props,n=a.currentStopsGeoJSON,r=a.currentMot,o=r&&r!==e.currentMot,c=n&&n!==e.currentStopsGeoJSON;(o||c)&&(this.markerVectorSource.clear(),Object.keys(n).forEach((function(e){t.markerVectorSource.addFeatures((new I.a).readFeatures(n[e])),t.markerVectorSource.getFeatures().forEach((function(e){return e.setStyle("rail"===(t=r)?vt:"bus"===t?yt:"foot"===t?St:"car"===t?gt:Et);var t}));var a=t.markerVectorSource.getFeatures()[0].getGeometry().getCoordinates();t.map.getView().animate({center:a,duration:500})})),this.routeVectorSource.clear(),this.setIsActiveRoute(!1),Object.keys(n).length>1&&this.drawNewRoute())}},{key:"setIsActiveRoute",value:function(e){this.setState({isActiveRoute:e})}},{key:"render",value:function(){var e=this.props,t=e.mots,a=e.APIKey,n=e.stationSearchUrl,o=this.state,c=o.isActiveRoute,i=o.hoveredStationOpen,l=o.hoveredStationName;return r.a.createElement(r.a.Fragment,null,r.a.createElement(tt,{mots:t,stationSearchUrl:n,isActiveRoute:c,onZoomRouteClick:this.onZoomRouteClick,onPanViaClick:this.onPanViaClick,APIKey:a}),r.a.createElement(z.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:i,message:l}),r.a.createElement("div",{id:"map",className:"MapComponent"}))}}]),t}(n.Component);wt.getExtentCenter=function(e){return[e[0]+(e[2]-e[0])/2,e[1]+(e[3]-e[1])/2]};var Ct=Object(i.b)((function(e){return{currentMot:e.MapReducer.currentMot,currentStops:e.MapReducer.currentStops,currentStopsGeoJSON:e.MapReducer.currentStopsGeoJSON,isFieldFocused:e.MapReducer.isFieldFocused}}),(function(e){return{onSetCurrentStops:function(t){return e(ee(t))},onSetCurrentStopsGeoJSON:function(t){return e(te(t))},onSetClickLocation:function(t){return e(function(e){return{type:"SET_CLICK_LOCATION",clickLocation:e}}(t))},onShowNotification:function(t,a){return e(ne(t,a))}}}))(wt),jt=a(629),Rt=function(e){function t(e){var a;return Object(O.a)(this,t),(a=Object(w.a)(this,Object(C.a)(t).call(this,e))).handleOpen=function(){a.setState({open:!0})},a.handleClose=function(){a.setState({open:!1})},a.state={open:!1},a}return Object(j.a)(t,e),Object(k.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.notificationMessage;t&&t!==e.notificationMessage&&this.handleOpen()}},{key:"render",value:function(){var e=this.props,t=e.notificationMessage,a=e.notificationType,n=this.state.open;return r.a.createElement(z.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:n,autoHideDuration:6e3,onClose:this.handleClose},r.a.createElement(jt.a,{onClose:this.handleClose,severity:a,elevation:6,variant:"filled"},t))}}]),t}(r.a.Component),Nt=Object(i.b)((function(e){return{notificationMessage:e.MapReducer.notificationMessage,notificationType:e.MapReducer.notificationType}}))(Rt),Ft={mots:ie,routingUrl:"https://api.geops.io/routing/dev/",stationSearchUrl:"https://api.geops.io/stops/dev/"};function Tt(e){var t=e.mots,a=e.routingUrl,n=e.stationSearchUrl;return r.a.createElement(i.a,{store:E},r.a.createElement(Ct,{mots:t,routingUrl:a,APIKey:"5cc87b12d7c5370001c1d655012b7edc8da1475084e49b84b6ba658e",stationSearchUrl:n}),r.a.createElement(Nt,null))}Tt.defaultProps=Ft;var Pt=Tt;a(567),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Pt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[353,1,2]]]);
//# sourceMappingURL=main.e7b1e898.chunk.js.map