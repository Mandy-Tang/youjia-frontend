"use strict";function appConfig(e,t){"ngInject";e.factory("ErrorHttpInterceptor",["$q","$injector",function(e,t){return{requestError:function(t){return e.reject(t)},responseError:function(a){var r=t.get("toastr");switch(a.status){case 400:r.error("错误请求",a.statusText,{closeButton:!0});break;case 401:r.error("未授权",a.statusText,{closeButton:!0});break;case 403:r.error("服务器拒绝请求",a.statusText,{closeButton:!0});break;case 404:r.error("未找到",a.statusText,{closeButton:!0});break;case 500:r.error("服务器内部错误",a.statusText,{closeButton:!0});break;default:r.error("请求超时","",{closeButton:!0})}return e.reject(a)}}}]),t.interceptors.push("ErrorHttpInterceptor"),t.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",t.defaults.headers.put["Content-Type"]="application/json",t.defaults.headers["delete"]={"Content-Type":"application/json"}}appConfig.$inject=["$provide","$httpProvider"],function(){function e(e,t){"ngInject";e.state("app",{"abstract":!0,views:{root:{templateUrl:"/app/layout/index.html",controller:"layoutCtrl"}}}),t.otherwise("/overall")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("app.layout",["ui.router"]).config(e)}(),function(){function e(e){"ngInject";e.state("app.overall",{url:"/overall",views:{"content@app":{templateUrl:"/app/overall/index.html",controller:"overallCtrl"}}})}e.$inject=["$stateProvider"],angular.module("app.overall",["ui.router"]).config(e)}();var urlConfig=window.urlConfig||{};urlConfig.API_ROOT="/situaware/v1",urlConfig.IC="http://110.185.210.152:10086",urlConfig.IC_RISK_GRADE=urlConfig.IC+"/api/stable-v1/riskGrade/province/辽宁省",urlConfig.IC_DEVICE_TYPE_TOP5=urlConfig.IC+"/api/stable-v1/top5Type/province/辽宁省",urlConfig.IC_DEVICE_COUNT=urlConfig.IC+"",urlConfig.IC_DISTRIBUTION=urlConfig.IC+"/api/stable-v1/distribution/province/辽宁省",urlConfig.IC_RISK_DEVICE_TOP5=urlConfig.IC+"/api/stable-v1/top5Device/province/辽宁省",urlConfig.IC_RECENTLY_RISK_DEVICE=urlConfig.IC+"/ic_recently_risk.json",urlConfig.IC_MAP=urlConfig.IC+"/api/stable-v1/map/province/辽宁省",urlConfig.WEB="/data",urlConfig.WEB_GRADE=urlConfig.WEB+"/web_grade.json",urlConfig.WEB_DISTRIBUTION=urlConfig.WEB+"/distribution.json",urlConfig.WEB_RECENTLY_RISK=urlConfig.WEB+"/recently_risk.json",urlConfig.WEB_USER_RISK_TOP5=urlConfig.WEB+"/user_risk_top5.json",urlConfig.WEB_RISK_TOP5=urlConfig.WEB+"/web_risk_top5.json",urlConfig.WEB_MAP=urlConfig.WEB+"/web_map.json",urlConfig.ALERT="/data",urlConfig.ALERT_THREATEN=urlConfig.ALERT+"/threaten.json",urlConfig.ALERT_THREATEN_DETAIL=urlConfig.ALERT+"/threaten_detail.json",urlConfig.ALERT_INCIDENTS="/situaware/v1/reportWarning/bar",urlConfig.ALERT_INCIDENTS_DETAIL="/situaware/v1/reportWarning/table",urlConfig.ALERT_COMMANY="/situaware/v1/reportWarning/depQuery",urlConfig.ALERT_INFORMATION=urlConfig.ALERT+"/information.json",urlConfig.ALERT_POLICIES=urlConfig.ALERT+"/policies.json",urlConfig.ALERT_NEWS="/intelligence/v1/analysis/security/news",urlConfig.ALERT_NEWSSUMMARY="/intelligence/v1/analysis/security/summary",urlConfig.ALERT_REPORTS="/situaware/v1/reportWarning/batchReport",urlConfig.ALERT_REPORT="/situaware/v1/reportWarning/report",urlConfig.EMERGENCY=urlConfig.API_ROOT+"/urgencyDeal",urlConfig.EMERGENCY_TOTAL=urlConfig.EMERGENCY+"/bar/totalCount",urlConfig.EMERGENCY_DETAIL=urlConfig.EMERGENCY+"/bar/detailCount",urlConfig.EMERGENCY_TOP=urlConfig.EMERGENCY+"/bar/topCount",urlConfig.EMERGENCY_DEAL=urlConfig.EMERGENCY+"/deal",urlConfig.EMERGENCY_TABLE=urlConfig.EMERGENCY+"/table",urlConfig.MAP="/styles/js/map/json/",window.urlConfig=urlConfig,angular.module("app",["ngCookies","ui.router","ui.bootstrap","toastr","ngFileUpload","app.layout","app.overall"]).config(appConfig).constant("URL_CONFIG",window.urlConfig).run(),angular.module("app").directive("ngCompileHtml",["$compile",function(e){return function(t,a,r){var i=t.$watch(function(e){return e.$eval(r.ngCompileHtml)},function(r){a.html(r),e(a.contents())(t)});t.$on("$destroy",function(){i()})}}]),function(){function e(e,t){"ngInject";function a(){e.now=moment().format("YYYY年MM月DD日"),e.time=moment().format("HH:mm:ss")+" "+moment().format("dddd"),r&&t.cancel(r),r=t(function(){a()},1e3)}e.remote=!1,e.active=1,e.now="";var r;a()}e.$inject=["$scope","$timeout"],angular.module("app.layout").controller("layoutCtrl",e)}(),function(){function e(){"ngInject"}angular.module("app.overall").controller("overallCtrl",e)}(),function(){function e(e,t,a){"ngInject";function r(){var r=a.defer();return e.get(t.ALERT_NEWSSUMMARY).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function i(r){var i=a.defer();return e.get(t.ALERT_NEWS,{params:r}).success(function(e){i.resolve(e)}).error(function(e){i.reject(e)}),i.promise}function n(){var r=a.defer();return e.get(t.ALERT_INCIDENTS).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function o(r){var i=a.defer();return e.get(t.ALERT_INCIDENTS_DETAIL,{params:r}).success(function(e){i.resolve(e)}).error(function(e){i.reject(e)}),i.promise}function s(){var r=a.defer();return e.get(t.ALERT_INFORMATION).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function l(){var r=a.defer();return e.get(t.ALERT_POLICIES).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function c(){var r=a.defer();return e.get(t.ALERT_COMMANY).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function d(r,i){var n=a.defer(),o=i?t.ALERT_REPORTS:t.ALERT_REPORT;return e.post(o,$.param(r)).success(function(e){n.resolve(e)}).error(function(e){n.reject(e)}),n.promise}this.getSummary=r,this.getCommany=c,this.postReport=d,this.getNews=i,this.getIncidents=n,this.getIncidentsDetail=o,this.getInformation=s,this.getPolicies=l}e.$inject=["$http","URL_CONFIG","$q"],angular.module("app").service("Alert",e)}(),function(){function e(e,t,a){"ngInject";function r(r){var i=t.defer();return e.get(a.MAP+r+".json?r="+Math.random()).success(function(e){i.resolve(e)}).error(function(e){i.reject(e)}),i.promise}this.getAreaColorByLevel=function(e){var t,a;switch(e){case"h":t="rgba(152,32,41,0.6)",a="rgba(152,32,41,0.9)";break;case"m":t="rgba(173,87,24,0.6)",a="rgba(173,87,24,0.9)";break;case"l":t="rgba(173,144,24,0.6)",a="rgba(173,144,24,0.9)";break;case"s":t="rgba(46,102,41,0.6)",a="rgba(46,102,41,0.9)";break;default:t="rgba(0,42,75,0.6)",a="rgba(0,42,75,0.9)"}return[t,a]},this.drawMap=function(e,t,a,i){function n(e,r){var n,o,s,l,u,p;0==e?(n=a[r],o=c(n.value[4])):1==e&&(n=i[r],o=c(n.value[5])),s=[n.value[0],n.value[1]],s[0]>="122.73208"?(l=[(parseFloat(n.value[0])+.4).toFixed(6).replace(/0+$/,""),n.value[1]],u=[(parseFloat(n.value[0])+.8).toFixed(6).replace(/0+$/,""),(parseFloat(n.value[1])+.3).toFixed(6).replace(/0+$/,"")]):(l=[(parseFloat(n.value[0])-.4).toFixed(6).replace(/0+$/,""),n.value[1]],u=[(parseFloat(n.value[0])-.8).toFixed(6).replace(/0+$/,""),(parseFloat(n.value[1])+.3).toFixed(6).replace(/0+$/,"")]),d.series[2].lineStyle.normal.color=o,d.series[2].lineStyle.normal.shadowColor=o,d.series[3].lineStyle.normal.color=o,d.series[3].lineStyle.normal.shadowColor=o,d.series[2].data=[{coords:[s,l]}],d.series[3].data=[{coords:[l,u]}];var f;s[0]>="122.73208"?(p=t.convertToPixel("geo",u),f=[parseInt(p[0]),parseInt(p[1])-80]):(p=t.convertToPixel("geo",u),f=[parseInt(p[0])-$(".echart-tooltip").parent().innerWidth(),parseInt(p[1])-80]),t.setOption(d),t.dispatchAction({type:"showTip",seriesIndex:e,dataIndex:r,position:f}),s[0]<"122.73208"&&(f=[parseInt(p[0])-$(".echart-tooltip").parent().innerWidth(),parseInt(p[1])-80],t.dispatchAction({type:"showTip",seriesIndex:e,dataIndex:r,position:f}))}var o=function(e){var t="";switch(e){case"h":t="高危";break;case"m":t="中危";break;case"l":t="低危";break;case"s":t="安全"}return t},s=function(e){var t;switch(e){case"h":t="#d21e06";break;case"m":t="#da9200";break;case"l":t="#63e80f";break;case"s":t="#06d2c5"}return t},l=function(e){var t,a;switch(e){case"h":t="bg-red",a="red";break;case"m":t="bg-orange",a="orange";break;case"l":t="bg-green",a="green";break;case"s":t="bg-blue",a="blue"}return[t,a]},c=function(e){var t;switch(e){case"h":t="#d90900";break;case"m":t="#ffab00";break;case"l":t="#79ae58";break;case"s":t="#06d2c5"}return t},d={tooltip:{trigger:"item",backgroundColor:"rgba(255,255,255,0.1)",padding:[10,20],enterable:!0,triggerOn:"none",alwaysShowContent:!0,formatter:function(e){if(0==e.seriesIndex&&e.data.value){var t=o(e.data.value[4]),a=l(e.data.value[4]);return'<div class="echart-tooltip"><div class="header '+a[0]+'"><span class="iconfont icon-web mr10"></span>'+e.seriesName+'</div>地域：<span class="'+a[1]+'">'+e.data.name+'</span><br/>用户：<span class="'+a[1]+'">'+e.data.value[3]+'</span><br/>风险网站：<span class="'+a[1]+'">'+e.data.value[2]+'</span><br/>风险等级：<span class="'+a[1]+'">'+t+"</span></div>"}if(1==e.seriesIndex){var t=o(e.data.value[5]),a=l(e.data.value[5]);return'<div class="echart-tooltip"><div class="header '+a[0]+'"><span class="iconfont icon-ic mr10"></span>'+e.seriesName+'</div>地域：<span class="'+a[1]+'">'+e.data.name+'</span><br/>IP：<span class="'+a[1]+'">'+e.data.value[2]+'</span><br/>设备类型：<span class="'+a[1]+'">'+e.data.value[3]+'</span><br/>漏洞总数：<span class="'+a[1]+'">'+e.data.value[4]+'</span><br/>风险等级：<span class="'+a[1]+'">'+t+"</span></div>"}}},geo:{map:e,roam:!0,zoom:1.2,label:{normal:{show:!1},emphasis:{show:!1}},itemStyle:{normal:{areaColor:"rgba(2,5,5,0.69)",borderColor:"rgba(0,223,176,0.9)",borderWidth:2,shadowColor:"rgba(4, 5, 6, 0.9)",shadowBlur:10,shadowOffsetY:10,shadowOffsetX:2},emphasis:{areaColor:"rgba(2,5,5,0.8)",borderWidth:3}}},series:[{name:"网站",type:"effectScatter",coordinateSystem:"geo",data:a,symbol:"path://M114.83 432.995C172.707 235.374 299.485 94.42 531.3 74.33c15.964-1.399 38.314-0.132 56.54-3.592 15.698-3.06 34.854-14.367 52.948-21.818 73.435-30.065 235.738-82.881 317.687-18.093 71.105 56.343 58.005 193.3 14.103 282.632 35.057 70.578 60.995 168.891 45.898 278.98-205.94 8.445-445.935 1.128-645.986 3.657 6.716 106.295 73.668 187.712 172.98 199.217 97.048 11.244 164.166-43.434 208.267-105.03h247.047c-64.188 183.856-227.358 326.47-479.992 307.978-57.473-4.257-102.236-20.956-151.828-39.91-82.783 45.167-265.967 112.217-338.842 18.092-55.343-71.44-19.788-201.417 10.579-286.16 61.461-171.684 178.465-341.767 292.979-438.416 0.66-2.997 3.523-3.662 3.523-7.254-90.465 46.033-151.46 122.326-222.372 188.382z m868.328-268.067c-3.396-123.324-162.905-111.217-247.116-61.595 94.055 37.515 162.701 101.107 218.842 177.469 12.24-38.714 29.535-70.844 28.274-115.874zM372.49 465.588h391.82c-11.372-251.969-379.517-231.615-391.82 0zM83.04 907.665c19.655 111.552 176.301 79.092 247.111 29.003-92.957-52.018-150.863-139.885-197.691-239.2-21.72 53.746-62.394 136.495-49.42 210.197z",symbolSize:20,showEffectOn:"emphasis",rippleEffect:{period:4,scale:3,brushType:"stroke"},label:{normal:{show:!0,position:"bottom",formatter:"{b}",textStyle:{color:"#fff"}}},itemStyle:{normal:{color:function(e){var t=s(e.data.value[4]);return t}}},zlevel:1},{name:"工控系统",type:"effectScatter",coordinateSystem:"geo",data:i,symbol:"path://M199.796,86.625h-47.713l-7.187-26.371L88.994,86.625H76.216l-7.188-26.371L10.731,86.625H0.212v33.163h199.584V86.625z M66.233,0.087H33.491v68.958l32.742-14.784V0.087z M139.705,0.087h-32.743v70.955l32.743-16.781V0.087z M0.02,126.979V200h199.979v-73.021H0.02zM40.279,172.529H20.713v-33.163h19.566V172.529z M79.41,172.529H59.845v-33.163H79.41V172.529z M118.742,172.529H99.175v-33.163h19.567V172.529z",symbolSize:20,showEffectOn:"emphasis",rippleEffect:{period:4,scale:3,brushType:"stroke"},label:{normal:{show:!0,position:"bottom",formatter:"{b}",textStyle:{color:"#fff"}}},itemStyle:{normal:{color:function(e){var t=s(e.data.value[5]);return t}}},zlevel:1},{name:"line1",type:"lines",zlevel:2,effect:{show:!0,period:6,trailLength:0,color:"transparent",symbolSize:0},lineStyle:{normal:{width:1,opacity:1,shadowBlur:10,curveness:0}},data:[]},{name:"line2",type:"lines",zlevel:2,effect:{show:!0,period:6,trailLength:0,color:"transparent",symbolSize:0},lineStyle:{normal:{width:1,opacity:1,shadowBlur:10,curveness:0}},data:[]}]};r(e).then(function(r){if(echarts.registerMap(e,r),t.setOption(d),0!==a.length||0!==i.length){var o=setInterval(function(){var e,t=Math.random(),r=Math.floor(2*t);0==r?e=Math.floor(a.length*t):1==r&&(e=Math.floor(i.length*t)),n(r,e)},5e3);t.on("mouseover",function(e){0!=e.geoIndex&&(clearInterval(o),n(e.seriesIndex,e.dataIndex))}),t.on("mouseout",function(){clearInterval(o),o=setInterval(function(){var e,t=Math.random(),r=Math.floor(2*t);0==r?e=Math.floor(a.length*t):1==r&&(e=Math.floor(i.length*t)),n(r,e)},5e3)})}})},this.drawMap2=function(e,t,a,i,n,o){var s,l="image://styles/image/";switch(o){case"orange":l+="cover-box-orange.png",s="#ffa800";break;case"green":l+="cover-box-green.png",s="#7bc612"}var c={backgroundColor:"transparent",tooltip:{trigger:"item"},geo:{map:e,zoom:5,label:{emphasis:{show:!1}},roam:!0,itemStyle:{normal:{areaColor:"transparent",borderColor:"#00ffc9",borderWidth:1,shadowColor:"rgba(0, 255, 201, 0.5)",shadowBlur:10},emphasis:{areaColor:"rgba(7,9,10,0.3)",borderWidth:2}}},series:[{name:n,type:"effectScatter",coordinateSystem:"geo",showEffectOn:"emphasis",symbol:l,silent:!0,zlevel:1,label:{normal:{show:!0,position:"insideTop",formatter:"{b}",textStyle:{color:s,fontSize:16,fontWeight:"bold"}}},symbolSize:[40,80],data:a},{name:n,type:"effectScatter",coordinateSystem:"geo",showEffectOn:"emphasis",silent:!0,zlevel:1,label:{normal:{show:!0,position:"inside",formatter:"{b}",textStyle:{color:"#fff"}}},itemStyle:{normal:{color:"transparent"}},data:i}]};r(e).then(function(r){echarts.registerMap(e,r),t.setOption(c),setInterval(function(){var e=Math.random();c.series[0].data=[a[Math.floor(a.length*e)]],c.series[1].data=[i[Math.floor(i.length*e)]],t.setOption(c)},1500)})},this.drawPie=function(e,t,a,r,i){e.setOption({title:{show:!0,text:i,left:"28%",top:"30%",textStyle:{color:"#fff",fontSize:14}},tooltip:{trigger:"item",padding:10,formatter:function(e){return 1==e.dataIndex?e.name+"总数："+e.data.value+"（"+e.percent+"%）":void 0}},series:[{name:"访问来源",type:"pie",radius:["60%","85%"],avoidLabelOverlap:!0,hoverAnimation:!1,labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){var t=["rgba(12,50,60,0.8)",r];return t[e.dataIndex]}}},data:[{value:a-t,name:i,tooltip:{show:!1},label:{normal:{show:!1,position:"center",formatter:"{b}",textStyle:{color:"transparent",fontSize:22}}}},{value:t,name:i,label:{normal:{show:!0,position:"center",formatter:"{c}",textStyle:{color:"#fff",fontSize:24,fontFamily:"pirulen"}}}}]}]})},this.drawNewPie=function(e,t){e.setOption({tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:[{name:"安全咨询来源",type:"pie",radius:"90%",data:t.sort(function(e,t){return e.value-t.value}),roseType:"angle",label:{normal:{textStyle:{color:"rgb(255, 255, 255)"}}},labelLine:{normal:{lineStyle:{color:"rgba(255, 255, 255, 0.3)"},smooth:.2,length:10,length2:20}},itemStyle:{normal:{color:"#c23531",shadowBlur:200,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})},this.drawTrend=function(e,t){e.setOption({title:{text:t.title,textStyle:{color:"#01cca1"}},tooltip:{trigger:"axis"},legend:{orient:"horizontal",x:"right",textStyle:{color:"#fff"},data:t.legend},xAxis:{type:"category",zlevel:1,splitNumber:2,boundaryGap:!1,axisLine:{lineStyle:{color:"#00e1aa"}},axisLabel:{show:!0,textStyle:{color:"#fff"}},splitLine:{show:!0,lineStyle:{width:2,type:"dotted",color:"#14342d"}},data:t.xAxis},yAxis:{type:"value",zlevel:1,axisLine:{lineStyle:{color:"#00e1aa"}},axisLabel:{show:!0,textStyle:{color:"#fff"}},splitLine:{show:!0,lineStyle:{width:2,type:"dotted",color:"#14342d"}}},grid:{left:"6%",right:"6%",bottom:"8%",backgroundColor:"rgb(7,9,11)",show:!0,containLabel:!0},series:[{name:"已完成",type:"line",stack:"总量",lineStyle:{normal:{color:"#1d5316"}},data:t.series.done},{name:"下发任务",type:"line",stack:"总量",lineStyle:{normal:{color:"#008ac6"}},data:t.series.total}]})},this.drawTop10=function(e,t){e.setOption({title:{text:t.title,textStyle:{color:"#01cca1"}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{orient:"horizontal",x:"right",textStyle:{color:"#fff"},data:t.legend},grid:{left:"5%",right:"5%",bottom:"1%",containLabel:!0},xAxis:[{type:"value",axisTick:{show:!1},axisLabel:{show:!1},axisLine:{show:!1},splitLine:{show:!1}}],yAxis:[{type:"category",axisTick:{show:!1},axisLine:{show:!1},axisLabel:{show:!0,margin:30,textStyle:{color:"#fff"}},data:t.yAxis}],series:[{name:"未完成",type:"bar",barWidth:10,barMinHeight:30,itemStyle:{normal:{barBorderRadius:[5,0,0,5],color:"#b10a12"}},stack:"Top10",data:t.series.undone},{name:"已完成",type:"bar",barWidth:10,barMinHeight:30,itemStyle:{normal:{barBorderRadius:[0,5,5,0],color:"#eb9b06"}},stack:"Top10",data:t.series.done}]})}}e.$inject=["$http","$q","URL_CONFIG"],angular.module("app").service("Chart",e)}(),function(){function e(e,t,a){"ngInject";function r(){var r=a.defer();return e.get(t.EMERGENCY_TOTAL).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function i(){var r=a.defer();return e.get(t.EMERGENCY_DETAIL).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function n(){var r=a.defer();return e.get(t.EMERGENCY_TOP).success(function(e){r.resolve(e)}).error(function(e){r.reject(e)}),r.promise}function o(r){var i=a.defer(),n={};for(var o in r)(r[o]||0===r[o]||"boolean"==typeof r[o])&&(n[o]=r[o]);return e.get(t.EMERGENCY_TABLE,{params:n}).success(function(e){i.resolve(e)}).error(function(e){i.reject(e)}),i.promise}function s(r){var i=a.defer();return e.post(t.EMERGENCY_DEAL,$.param(r)).success(function(e){i.resolve(e)}).error(function(e){i.reject(e)}),i.promise}this.getTotal=r,this.getDetail=i,this.getTop=n,this.getList=o,this.deal=s}e.$inject=["$http","URL_CONFIG","$q"],angular.module("app").service("Emergency",e)}(),function(){function e(e,t,a){"ngInject";function r(){var r=a.defer();return e.get(t.IC_RISK_GRADE).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function i(){var r=a.defer();return e.get(t.IC_DEVICE_TYPE_TOP5).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function n(){var r=a.defer();return e.get(t.IC_DEVICE_COUNT).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function o(){var r=a.defer();return e.get(t.IC_DISTRIBUTION).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function s(){var r=a.defer();return e.get(t.IC_RISK_DEVICE_TOP5).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function l(){var r=a.defer();return e.get(t.IC_RECENTLY_RISK_DEVICE).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function c(){var r=a.defer();return e.get(t.IC_MAP).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}this.getRiskGrade=r,this.getDeviceTypeTop5=i,this.getDeviceCount=n,this.getDistribution=o,this.getRiskDeviceTop5=s,this.getRecentlyDevice=l,this.getMap=c}e.$inject=["$http","URL_CONFIG","$q"],angular.module("app").service("IC",e)}(),function(){function e(e,t,a){"ngInject";function r(){var r=a.defer();return e.get(t.WEB_GRADE+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function i(){var r=a.defer();return e.get(t.WEB_DISTRIBUTION+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function n(){var r=a.defer();return e.get(t.WEB_RECENTLY_RISK+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function o(){var r=a.defer();return e.get(t.WEB_USER_RISK_TOP5+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function s(){var r=a.defer();return e.get(t.WEB_RISK_TOP5+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}function l(){var r=a.defer();return e.get(t.WEB_MAP+"?r="+Math.random()).success(function(e){r.resolve(e.data)}).error(function(e){r.reject(e)}),r.promise}this.getGrade=r,this.getDistribution=i,this.getRecentlyRisk=n,this.getUserRiskTop5=o,this.getWebRiskTop5=s,this.getMap=l}e.$inject=["$http","URL_CONFIG","$q"],angular.module("app").service("Web",e)}(),function(){function e(){"ngInject";var e=function(e,t,a,r){if("undefined"==typeof window.KindEditor)throw new Error("Please import the local resources of kindeditor!");var i,n=t[0],o={height:"490px",width:"100%",items:["source","|","undo","redo","|","preview","print","template","code","cut","copy","paste","plainpaste","wordpaste","|","justifyleft","justifycenter","justifyright","justifyfull","insertorderedlist","insertunorderedlist","indent","outdent","|","formatblock","fontname","fontsize","|","forecolor","hilitecolor","bold","italic","underline","strikethrough","lineheight","|","fullscreen"],basePath:"/bower_components/kindeditor/",themeType:"simple"},s=!1,l=angular.extend(o,e.config);i=new KindEditor.create(n,l),KindEditor.ready(function(){s=!0;var e=r.$isEmpty(r.$viewValue)?"":r.$viewValue;i.html(e)});var c=e.pattern?new RegExp(e.pattern):!1;c&&r.$parsers.push(function(e){c.test(e)?r.$setValidity(a.ngModel,!0):r.$setValidity(a.ngModel,!1)}),r.$render=function(){if(s&&i){var e=r.$isEmpty(r.$viewValue)?"":r.$viewValue;i.html(e)}}};return{restrict:"AC",require:"^ngModel",scope:{config:"=",pattern:"="},link:e}}angular.module("app").directive("kEditor",e)}(),function(){function e(){"ngInject";var e=function(e,t,a){};return{restrict:"EA",replace:!0,templateUrl:"/app/directives/table-footer/index.html",link:e}}angular.module("app").directive("tableFooter",e)}(),function(){function e(){"ngInject";var e=function(e,t,a){};return{restrict:"EA",scope:!0,replace:!0,templateUrl:"/app/directives/tables/table.html",link:e}}angular.module("app").directive("reTable",e)}(),function(){function e(e,t,a){"ngInject";var r=function(r,i,n){function o(){a.getRecentlyRisk().then(function(t){r.webData=t,t.length>8&&e(function(){new fnScrollList("tb-scroll-4","tr",1,1e3)})}),t.getRecentlyDevice().then(function(t){r.icData=t,t.length>8&&e(function(){new fnScrollList("tb-scroll-3","tr",1,1e3)})}),e(function(){o()},36e5)}r.icData=[],r.webData=[],o()};return{restrict:"EA",replace:!0,templateUrl:"/app/overall/bottom/index.html",link:r}}e.$inject=["$timeout","IC","Web"],angular.module("app.overall").directive("bottomBox",e)}(),function(){function e(e,t,a,r,i,n){"ngInject";var o=function(o,s,l){function c(){a.all([i.getMap(),n.getMap()]).then(function(e){var t=d(e[0]),a=u(e[1]);r.drawMap("liaoning",p,a,t)},function(e){r.drawMap("liaoning",p,[],[])}),t(function(){c()},36e5)}function d(e){var t=[];for(var a in e){var r,i;r=e[a].leak&&e[a].leak.total?e[a].leak.total:0,i=e[a].leak&&e[a].leak.level?e[a].leak.level:"s",t.push({name:e[a].location.district,value:[e[a].location.point.longitude,e[a].location.point.latitude,e[a].ip,e[a].type,r,i]})}return t}function u(e){var t=[];for(var a in e)t.push({name:e[a].location.district,value:[e[a].location.point.longitude,e[a].location.point.latitude,e[a].url,e[a].user,e[a].level,e[a].grade]});return t}$("#map").css("height",e.innerHeight);var p=echarts.init(document.getElementById("map"));c(),$(window).on("resize",function(){$("#map").css("height",e.innerHeight),p.resize()})};return{restrict:"EA",replace:!0,templateUrl:"/app/overall/center/index.html",link:o}}e.$inject=["$window","$timeout","$q","Chart","IC","Web"],angular.module("app.overall").directive("centerBox",e)}(),function(){function e(e,a,r){"ngInject";var i=function(i,n,o){function s(){a.getRiskGrade().then(function(e){i.icRisk=e,i.icLevel=e.level,i.icRisk.level=l(i.icRisk.level);var a=[];a.push(+e.grade),c.setOption(t(a))}),a.getDistribution().then(function(t){i.icDistribution=t,t.length>6&&e(function(){new fnScrollList("tb-scroll-1","tr",1,1e3)})}),r.getGrade().then(function(e){i.webRisk=e,i.webLevel=e.level,i.webRisk.level=l(i.webRisk.level);var a=[];a.push(+e.grade),d.setOption(t(a))}),r.getDistribution().then(function(t){i.webDistribution=t,t.length>6&&e(function(){new fnScrollList("tb-scroll-2","tr",1,1e3)})}),setTimeout(function(){s()},36e5)}function l(e){var t="";switch(e){case"h":t="高危";break;case"m":t="中危";break;case"l":t="低危";break;case"s":t="安全"}return t}i.icRisk={},i.icDistribution={},i.icLevel="",i.webRisk={},i.webDistribution={},i.webLevel="",s();var c=echarts.init(n.find("#ic-dist-dom")[0]),d=echarts.init(n.find("#web-dist-dom")[0])};return{restrict:"EA",replace:!0,templateUrl:"/app/overall/left/index.html",link:i}}function t(e){return{width:e[0]/100*170,grid:{left:"0",containLabel:!1,show:!1},yAxis:[{type:"category",show:!1,data:["四川"],axisTick:{alignWithLabel:!0}}],xAxis:[{show:!1,type:"value"}],backgroundColor:"#02372c",series:[{name:"Top 10",type:"bar",barWidth:"6",data:e,label:{normal:{show:!1,position:"right",textStyle:{color:""}}},itemStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#05fdeb"},{offset:.5,color:"#8bd56d"},{offset:1,color:"#faad04"}],!1)}}}]}}e.$inject=["$timeout","IC","Web"],angular.module("app.overall").directive("leftBox",e)}(),function(){function e(e,t,a){"ngInject";var r=function(r,i,n){function o(){v=echarts.init(document.getElementById("ic_risk_device_top5")),m=echarts.init(document.getElementById("web_risk_top5"))}function s(){t.getDeviceTypeTop5().then(function(t){t=t.sort(function(e,t){return t.value-e.value}),r.icDeviceTypeTop5=t,e(function(){var e=document.getElementById("ic_device_type_top5"),a=echarts.getInstanceByDom(e);a&&a.dispose(),a=echarts.init(e);var r=d(t),i="漏洞总数",n=["#c12e34","#e6b600","#0098d9","#2b821d","#005eaa"];$("#ic_device_type_top5 div:first-child").css("width","100%"),l(a,r,i,n)})}),t.getRiskDeviceTop5().then(function(e){e=e.sort(function(e,t){return e.leak.total-t.leak.total});var t="ic_risk_device_top5",a="ic",r=u(e),i=["#06fdea","#4ce8a8","#8dd46a","#cebf2d","#feaa00"];c(v,t,a,r,i)}),a.getUserRiskTop5().then(function(t){t=t.sort(function(e,t){return t.grade-e.grade}),r.webUserRiskTop5=t,e(function(){var e=document.getElementById("web_user_risk_top5"),t=echarts.getInstanceByDom(e);t&&t.dispose(),t=echarts.init(e);var a=p(r.webUserRiskTop5),i="风险指数",n=["#06fdea","#4ce8a8","#8dd46a","#cebf2d","#feaa00"];$("#web_user_risk_top5 div:first-child").css("width","100%"),l(t,a,i,n)})}),a.getWebRiskTop5().then(function(e){e=e.sort(function(e,t){return t.grade-e.grade});var t="web_risk_top5",a="web",r=f(e),i=["#06fdea","#4ce8a8","#8dd46a","#cebf2d","#feaa00"];c(m,t,a,r,i)}),e(function(){s()},36e5)}function l(e,t,a,r){var i={tooltip:{trigger:"item",backgroundColor:"rgba(255,255,255,0.3)",padding:10},grid:{top:0,bottom:0,left:0,right:0},xAxis:{type:"value",position:"top",show:!1},yAxis:{type:"category",show:!1,data:t.type},series:[{name:a,type:"bar",barWidth:"6",label:{normal:{show:!1,position:[5,0],textStyle:{color:"#fff"},formatter:"{c}"}},itemStyle:{normal:{barBorderRadius:5,color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:"#05fdeb"},{offset:.5,color:"#8bd56d"},{offset:1,color:"#faad04"}],!1)}},data:t.data}]};e.setOption(i)}function c(e,t,a,r,i){var n={normal:{color:"transparent",label:{show:!1},labelLine:{show:!1}},emphasis:{color:"transparent"}},o=[{name:"1",type:"pie",clockWise:!1,radius:[107,125],center:["50%","90%"],label:{normal:{show:!1}},labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){return i[e.seriesIndex]}}},data:[{value:25,name:r.data[0]},{value:75,name:"invisible",tooltip:{show:!1},itemStyle:n}]},{name:"2",type:"pie",clockWise:!1,radius:[82,100],center:["50%","90%"],label:{normal:{show:!1}},labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){return i[e.seriesIndex]}}},data:[{value:22,name:r.data[1]},{value:78,name:"invisible",tooltip:{show:!1},itemStyle:n}]},{name:"3",type:"pie",clockWise:!1,radius:[57,75],center:["50%","90%"],label:{normal:{show:!1}},labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){return i[e.seriesIndex]}}},data:[{value:19,name:r.data[2]},{value:81,name:"invisible",tooltip:{show:!1},itemStyle:n}]},{name:"4",type:"pie",clockWise:!1,radius:[32,50],barBorderRadius:5,center:["50%","90%"],label:{normal:{show:!1}},labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){return i[e.seriesIndex]}}},data:[{value:16,name:r.data[3]},{value:84,name:"invisible",tooltip:{show:!1},itemStyle:n}]},{name:"5",type:"pie",clockWise:!1,radius:[7,25],center:["50%","90%"],label:{normal:{show:!1}},labelLine:{normal:{show:!1}},itemStyle:{normal:{color:function(e){return i[e.seriesIndex]}}},data:[{value:13,name:r.data[4]},{value:87,name:"invisible",tooltip:{show:!1},itemStyle:n}]}],s=o.length-r.data.length;o.splice(-s,s);var l=function(e){var t="";switch(e){case"h":t="高危";break;case"m":t="中危";break;case"l":t="低危";break;case"s":t="安全"}return t},c={tooltip:{trigger:"item",backgroundColor:"rgba(255,255,255,0.3)",padding:10,formatter:function(e){if(0==e.dataIndex&&"ic"==a){var t=l(r.leak_level[e.seriesIndex]);return"风险工控系统<br/>地域："+r.location[e.seriesIndex]+"<br/>IP："+r.data[e.seriesIndex]+"<br/>设备类型："+r.type[e.seriesIndex]+"<br/>漏洞总数："+r.leak_total[e.seriesIndex]+"<br/>风险等级："+t}if(0==e.dataIndex&&"web"==a){var t=l(r.level[e.seriesIndex]);return"风险网站<br/>地域："+r.location[e.seriesIndex]+"<br/>用户："+r.user[e.seriesIndex]+"<br/>URL："+r.url[e.seriesIndex]+"<br/>风险等级："+t}}},legend:{orient:"vertical",x:document.getElementById(t).offsetWidth/2+5,y:"12%",itemHeight:10,itemWidth:15,itemGap:13,textStyle:{color:"rgba(255,255,255,0.63)"},data:r.data},series:o};e.setOption(c)}function d(e){for(var t={type:[],data:[]},a=e.length-1;a>=0;a--)t.type.push(e[a]._id),t.data.push(e[a].value);return t}function u(e){for(var t={data:[],location:[],type:[],leak_total:[],leak_level:[]},a=e.length-1;a>=0;a--)t.data.push(g(e[a].ip,15)),t.location.push(e[a].location.city+e[a].location.district),t.type.push(e[a].type),t.leak_total.push(e[a].leak.total),t.leak_level.push(e[a].leak.level);return t}function p(e){for(var t={type:[],data:[]},a=e.length-1;a>=0;a--)t.type.push(e[a].user),t.data.push(e[a].grade);return t}function f(e){for(var t={data:[],url:[],location:[],user:[],level:[],grade:[]},a=e.length-1;a>=0;a--)t.data.push(g(e[a].url,15)),t.url.push(e[a].url),t.location.push(e[a].location.city+e[a].location.district),t.user.push(e[a].user),t.level.push(e[a].level),t.grade.push(e[a].grade);return t}function g(e,t){return""!=e&&void 0!=e?(e.length>t&&(e=e.substr(0,t)+"..."),e):void 0}r.icDeviceTypeTop5={},r.webUserRiskTop5={};var v,m;o(),s()};return{restrict:"EA",replace:!0,templateUrl:"/app/overall/right/index.html",link:r}}e.$inject=["$timeout","IC","Web"],angular.module("app.overall").directive("rightBox",e)}(),angular.module("app").run(["$templateCache",function(e){e.put("/app/directives/noData.html",'<div class="text-center">暂无数据抱歉</div>'),e.put("/app/layout/index.html",'<div ng-include="\'/app/layout/header/index.html\'"></div><div data-ui-view="content"></div>'),e.put("/app/overall/index.html",'<div class="row-fluid"></div>'),e.put("/app/directives/table-footer/index.html",'<div class="table-footer alert-zone-bg" ng-if="tableData.length > 0"><a class="mr25" ng-if="page.page_index !== 1" ng-click="toPage(1)">首页</a> <a ng-click="toPage(page.page_index - 1)" ng-hide="page.page_index === 1">上一页</a> <span class="ml25 mr25">{{page.page_index}} / {{page.total_pages}}</span> <a ng-click="toPage(page.page_index + 1)" ng-hide="page.page_index === page.total_pages">下一页</a> <a class="ml25" ng-if="page.page_index !== page.total_pages" ng-click="toPage(page.total_pages)">末页</a></div>'),e.put("/app/directives/tables/table.html",'<section><table class="table alert-zone-bg" ng-if="tableData.length > 0"><thead><tr><th ng-repeat="item in tableOptions.columns track by $index" ng-if="item.show" ng-bind="item.name" ng-style="item.style"></th></tr></thead><tbody class="emer-table-line"><tr ng-repeat="data in tableData track by $index"><td ng-repeat="item in tableOptions.columns track by $index" ng-if="item.show"><span ng-if="!item.html" ng-bind="data[item.col]"></span> <span ng-if="item.html" ng-compile-html="item.html(data[item.col])"></span></td></tr></tbody></table><div class="text-center emer-white alert-zone-bg p40" ng-if="tableData.length == 0">暂无数据</div></section>'),
e.put("/app/directives/tables/tablepage.html",'<a ng-if="detailQuery.page_index!=1" ng-click="selectPage(1)">首页</a> <a ng-click="selectPage(detailQuery.page_index - 1)" ng-if="detailQuery.page_index!=1">上一页</a> <span>{{detailQuery.page_index}} / {{detailQuery.total_pages}}</span> <a ng-click="selectPage(detailQuery.page_index + 1)" ng-if="detailQuery.page_index!=detailQuery.total_pages">下一页</a> <a ng-if="detailQuery.page_index!=detailQuery.total_pages" ng-click="selectPage(detailQuery.total_pages)">末页</a>'),e.put("/app/layout/header/index.html",'<div id="header"><h1 class="logo">信息安全态势感知平台<p>Information Security Situation Awareness Platform</p></h1><ul class="tit"><li><a data-ui-sref="app.overall" ng-class="{active: $state.includes(\'app.overall\')}">综合安全态势<span></span></a></li><li><a data-ui-sref="app.ic" ng-class="{active: $state.includes(\'app.ic\')}">工控安全态势 <span></span></a></li><li><a data-ui-sref="app.web" ng-class="{active: $state.includes(\'app.web\')}">网站安全态势 <span></span></a></li><li><a data-ui-sref="app.alert" ng-class="{active: $state.includes(\'app.alert\')}">通报预警 <span></span></a></li><li><a data-ui-sref="app.emergency" ng-class="{active: $state.includes(\'app.emergency\')}">应急处置 <span></span></a></li></ul><div class="alert-zone hearder-right"><a href="http://vsoc.30services.com/Login/LoginPage.aspx" class="btn btn-more mr10" target="_blank">网站监测</a><a title="" href="http://110.185.210.152:40303/web/home-cdts" target="_blank" class="btn btn-more mr10">工控系统监测</a><div class="time-box"><p ng-bind="now"></p><p ng-bind="time" class="times"></p></div></div></div>'),e.put("/app/overall/bottom/index.html",'<div class="span6 bottom-span"><div class="widget-box"><div class="widget-content nopadding"><div class="center-boxdown"><div class="tab"><div class="title">最新风险工控系统</div><div class="overflow-bottom"><table class="table table-bordered table-mg"><tbody id="tb-scroll-3"><tr ng-repeat="data in icData track by $index"><td class="orange" ng-bind="data.ip"></td><td ng-bind="data.type"></td><td ng-bind="data.location.district"></td><td ng-bind="data.timestamp"></td></tr></tbody></table></div></div><div class="tab" style="left: 50%"><div class="title">最新风险网站</div><div class="overflow-bottom"><table class="table table-bordered table-mg"><tbody id="tb-scroll-4"><tr ng-repeat="data in webData track by $index"><td><div class="orange word-break web-url" ng-bind="data.url" title="{{data.url}}"></div></td><td><div class="word-break web-user" ng-bind="data.user" title="{{data.user}}"></div></td><td ng-bind="data.timestamp"></td></tr></tbody></table></div></div></div></div></div></div>'),e.put("/app/overall/center/index.html",'<div class="center-span"><div id="map"></div></div>'),e.put("/app/overall/left/index.html",'<div class="span3 left-span margin-top-header"><div class="widget-box fl"><div class="widget-content nopadding"><div class="alert-zone left-boxup"><div class="ibox-head"><div class="title p0"><span class="diamonds"></span> <span class="text-cn">工控系统安全</span><div class="text-us">Industrial Control Systems Security</div></div></div><dl class="drange-list"><dt class="icong"></dt><dd><p><span>风险系数</span> <strong class="num" ng-bind="icRisk.grade">89</strong></p><div id="ic-dist-dom" class="heigh6"></div></dd></dl></div><div class="alert-zone left-boxup"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">网站安全</span></div><div class="text-us">Website system security</div></div></div><dl class="drange-list"><dt class="icone"></dt><dd><p><span>风险系数</span> <strong class="num" ng-bind="webRisk.grade">89</strong></p><div id="web-dist-dom" class="heigh6"></div></dd></dl></div><div class="alert-zone left-boxdown mt20"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">风险工控系统区域分布</span></div><div class="text-us">Regional risk Industrial Control Systems distribution</div></div></div><div class="overflow-left"><table class="table table-bordered table-mg"><thead><tr><th class="w40">区域</th><th class="text-center">工控系统数</th></tr></thead><tbody id="tb-scroll-1"><tr ng-repeat="dis in icDistribution track by $index"><td><div ng-bind="dis._id"></div></td><td ng-bind="dis.value" class="text-center"></td></tr></tbody></table></div></div><div class="alert-zone left-boxdown mt20"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">网站区域分布</span></div><div class="text-us">Regional Website system distribution</div></div></div><div class="overflow-left"><table class="table table-bordered table-mg"><thead><tr><th class="w40">区域</th><th class="text-center">网站数</th></tr></thead><tbody id="tb-scroll-2"><tr ng-repeat="dis in webDistribution track by $index"><td><div ng-bind="dis.location"></div></td><td ng-bind="dis.value" class="text-center"></td></tr></tbody></table></div></div></div></div></div>'),e.put("/app/overall/right/index.html",'<div class="span3 right-span margin-top-header"><div class="widget-box fr"><div class="widget-content nopadding"><div class="alert-zone right-boxup"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">用户风险网站系统 TOP5</span></div><div class="text-us">User\'s risk TOP5</div></div></div><table class="table table-bordered table-mg"><thead><tr><th class="w30 text-center">用户</th><th class="w30 text-center">网站数</th><th>风险系数</th></tr></thead><tbody><tr ng-repeat="web in webUserRiskTop5 track by $index"><td class="center" ng-bind="web.user"></td><td class="center" ng-bind="web.web_num"></td><td rowspan="5" class="btr5" ng-if="$index == 0"><div id="web_user_risk_top5"></div></td></tr></tbody></table></div><div class="alert-zone right-boxup mt20"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">风险工控系统类型 TOP5</span></div><div class="text-us">User\'s risk Industrial Control Systems TOP5</div></div></div><table class="table table-bordered table-mg"><thead><tr><th class="w40">系统类型</th><th>漏洞总数</th></tr></thead><tbody><tr ng-repeat="device in icDeviceTypeTop5 track by $index"><td class="lh20" ng-bind="device._id"></td><td rowspan="5" class="btr5" ng-if="$index == 0"><div id="ic_device_type_top5"></div></td></tr></tbody></table></div><div class="alert-zone right-boxdown mt20"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">风险工控系统 TOP5</span></div><div class="text-us">Risk Industrial Control Systems TOP5</div></div></div><div id="ic_risk_device_top5"></div></div><div class="alert-zone right-boxdown mt20"><div class="ibox-head"><div class="title p0"><div><span class="diamonds"></span> <span class="text-cn">风险网站 TOP5</span></div><div class="text-us">Risk Website system TOP5</div></div></div><div id="web_risk_top5"></div></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-cf886708fd.js.map
