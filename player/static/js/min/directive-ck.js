playerApp.directive("musicMode",["$timeout","$document",function(e,t){return{restrict:"AE",replace:!0,scope:{player:"=",audio:"="},templateUrl:"/tpls/mode.html",link:function(o,l,a){var i="list";o.addActive=function(e){l.children("li").removeClass("active"),l.children("li").eq(e).addClass("active")},o.addActive(0),o.listPlay=function(){i="list",console.log("list"),o.addActive(0)},o.randomPlay=function(){console.log("random"),i="random",o.addActive(1)},o.repeatPlay=function(){i="repeat",console.log("repeat"),o.addActive(2)},o.audio.addEventListener("ended",function(){if("list"==i)o.player.active==o.player.musicLen-1?o.player.active=0:o.player.active+=1;else if("random"==i){var e=parseInt(o.player.musicLen*Math.random());console.log("randomPlay"+e),e==o.player.active&&(e+=1),o.player.active=e}else console.log("repeat");o.$apply(o.player.controllPlay(o.player.active))});var n;o.volShow=!1,o.showVol=function(){o.volShow=!0,clearTimeout(n)},o.hideVol=function(){n=e(function(){o.volShow=!1},300)},o.volStyle="height: 64px",o.audio.volume=.8,o.adjustVolume=function(e){var l=window.event||e,a=t[0].querySelector(".play-vol").getBoundingClientRect().bottom-l.clientY;o.audio.volume=(a/75).toFixed(2),o.volStyle="height:"+a+"px"},o.muted=!0,o.audioMuted=function(){0==o.audio.muted?(o.audio.muted=!0,o.muted=!1):(o.audio.muted=!1,o.muted=!0)}}}}]);