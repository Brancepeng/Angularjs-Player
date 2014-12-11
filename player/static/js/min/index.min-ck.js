var playerApp=angular.module("playerApp",["ngRoute"]);playerApp.controller("playerCtrls",["$scope","DataList","DataBinding","Audio","Player","$timeout",function(a,e,t,i,r){t.dataBindFunc(0),a.player=r,a.audio=i,a.player.active=0,a.player.controllPlay(a.player.active),a.player.playerSrc(a.player.active),a.isSelected=function(){a.player.active=this.$index,t.dataBindFunc(a.player.active),a.player.controllPlay(a.player.active)}}]),playerApp.factory("DataList",function(){var a=[{id:0,artist:"Lene Marlin",song:"A Place Nearby",album:"《Playing My Game》",songUrl:"static/music/A Place Nearby.mp3",avatar:"static/img/lm.jpg"},{id:1,artist:"David Archuleta",song:"Crush",album:"《David Archuleta》",songUrl:"static/music/Crush.mp3",avatar:"static/img/da.jpg"},{id:2,artist:"Lucie Arnaz",song:"I still Believe In Love",album:"《They'Re Playing Our Song》",songUrl:"static/music/I Still Believe In Love.mp3",avatar:"static/img/la.jpg"},{id:3,artist:"Jem",song:"It's Amazing",album:"《Sex And The City - Original Motion Picture Soundtrack》",songUrl:"static/music/It'S Amazing.mp3",avatar:"static/img/jem.jpg"},{id:4,artist:"Jewel",song:"Stay Here Forever",album:"《Sweet And Wild》",songUrl:"static/music/Stay Here Forever.mp3",avatar:"static/img/jew.jpg"},{id:5,artist:"Lenka",song:"The Show",album:"《#LOVE acoustic》",songUrl:"static/music/The Show.mp3",avatar:"static/img/lenka.jpg"},{id:6,artist:"Tamas Wells",song:"Valder Fields",album:"《A Plea En Vendredi》",songUrl:"static/music/Valder Fields.mp3",avatar:"static/img/tw.jpg"}];return a}),playerApp.factory("DataBinding",["$rootScope","DataList",function(a,e){a.datas=e;var t={dataBindFunc:function(e){a.avatar=a.datas[e].avatar,a.artist=a.datas[e].artist,a.song=a.datas[e].song,a.album=a.datas[e].album}};return t}]),playerApp.factory("Audio",["$document",function(a){var e=a[0].createElement("audio");return e}]),playerApp.factory("Player",["$rootScope","$interval","Audio","DataList","DataBinding",function(a,e,t,i,r){a.data=i;var n={musicLen:"7",controllPlay:function(a){n.playerSrc(a),n.play(),n.isPlay=!0,r.dataBindFunc(a),n.playing=!0},playerSrc:function(e){var i=a.data[e].songUrl;t.src=i},play:function(){n.playing&&n.stop(),t.play(),n.isPlay=!0,n.playing=!0},stop:function(){n.playing&&t.pause(),n.isPlay=!1,n.playing=!1},prev:function(){console.log("prev:"+n.active),0==n.active?n.active=n.musicLen-1:n.active-=1,n.controllPlay(n.active)},next:function(){console.log("next:"+n.active),n.active==n.musicLen-1?n.active=0:n.active+=1,n.controllPlay(n.active)}};return n}]),playerApp.directive("musicMode",["$timeout","$document",function(a,e){return{restrict:"AE",replace:!0,scope:{player:"=",audio:"="},templateUrl:"/tpls/mode.html",link:function(t,i){var r="list";t.addActive=function(a){i.children("li").removeClass("active"),i.children("li").eq(a).addClass("active")},t.addActive(0),t.listPlay=function(){r="list",console.log("list"),t.addActive(0)},t.randomPlay=function(){console.log("random"),r="random",t.addActive(1)},t.repeatPlay=function(){r="repeat",console.log("repeat"),t.addActive(2)},t.audio.addEventListener("ended",function(){if("list"==r)t.player.active==t.player.musicLen-1?t.player.active=0:t.player.active+=1;else if("random"==r){var a=parseInt(t.player.musicLen*Math.random());console.log("randomPlay"+a),a==t.player.active&&(a+=1),t.player.active=a}else console.log("repeat");t.$apply(t.player.controllPlay(t.player.active))});var n;t.volShow=!1,t.showVol=function(){t.volShow=!0,clearTimeout(n)},t.hideVol=function(){n=a(function(){t.volShow=!1},300)},t.volStyle="height: 64px",t.audio.volume=.8,t.adjustVolume=function(a){var i=window.event||a,r=e[0].querySelector(".play-vol").getBoundingClientRect().bottom-i.clientY;t.audio.volume=(r/75).toFixed(2),t.volStyle="height:"+r+"px"},t.muted=!0,t.audioMuted=function(){0==t.audio.muted?(t.audio.muted=!0,t.muted=!1):(t.audio.muted=!1,t.muted=!0)}}}}]),playerApp.directive("progressBar",["$document","$interval","$rootScope",function(a,e,t){return{restrict:"AE",replace:!0,scope:{player:"=",audio:"="},templateUrl:"/tpls/progress.html",link:function(i){console.log(t),i.surplusBar=function(){if(!isNaN(i.audio.duration)){var a=i.audio.duration-i.audio.currentTime,e=parseInt(a/60),t=parseInt(a%60);10>t&&(t="0"+t),i.playTime="-"+e+":"+t;var r=i.audio.currentTime/i.audio.duration*1e3;i.surplusWidth="width:"+parseInt(r)+"px"}},i.bufferBar=function(){bufferTimer=e(function(){var a=i.audio.buffered.length;if(a>0&&void 0!=i.audio.buffered){var e=i.audio.buffered.end(a-1)/i.audio.duration*1e3;i.bufferWidth="width:"+parseInt(e)+"px",Math.abs(i.audio.duration-i.audio.buffered.end(a-1))<1&&(i.bufferWidth="width: 1000px",clearInterval(bufferTimer))}},1e3)},i.adjustPorgress=function(e){var t=window.event||e,r=t.clientX-a[0].querySelector(".progress-bar").getBoundingClientRect().left;i.audio.currentTime=parseInt(r/1e3*i.audio.duration),i.audio.removeEventListener("canplay",i.bufferBar)},i.audio.addEventListener("timeupdate",function(){i.$apply(i.surplusBar())}),i.audio.addEventListener("canplay",function(){i.$apply(i.bufferBar())})}}}]),playerApp.config(function(a){a.when("/player",{templateUrl:"index.html",controller:"playerCtrls"}).otherwise({redirectTo:"/player"})});