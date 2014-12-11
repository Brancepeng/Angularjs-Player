playerApp.factory("DataList",function(){var a=[{id:0,artist:"Lene Marlin",song:"A Place Nearby",album:"《Playing My Game》",songUrl:"static/music/A Place Nearby.mp3",avatar:"static/img/lm.jpg"},{id:1,artist:"David Archuleta",song:"Crush",album:"《David Archuleta》",songUrl:"static/music/Crush.mp3",avatar:"static/img/da.jpg"},{id:2,artist:"Lucie Arnaz",song:"I still Believe In Love",album:"《They'Re Playing Our Song》",songUrl:"static/music/I Still Believe In Love.mp3",avatar:"static/img/la.jpg"},{id:3,artist:"Jem",song:"It's Amazing",album:"《Sex And The City - Original Motion Picture Soundtrack》",songUrl:"static/music/It'S Amazing.mp3",avatar:"static/img/jem.jpg"},{id:4,artist:"Jewel",song:"Stay Here Forever",album:"《Sweet And Wild》",songUrl:"static/music/Stay Here Forever.mp3",avatar:"static/img/jew.jpg"},{id:5,artist:"Lenka",song:"The Show",album:"《#LOVE acoustic》",songUrl:"static/music/The Show.mp3",avatar:"static/img/lenka.jpg"},{id:6,artist:"Tamas Wells",song:"Valder Fields",album:"《A Plea En Vendredi》",songUrl:"static/music/Valder Fields.mp3",avatar:"static/img/tw.jpg"}];return a}),playerApp.factory("DataBinding",["$rootScope","DataList",function(a,t){a.datas=t;var i={dataBindFunc:function(t){a.avatar=a.datas[t].avatar,a.artist=a.datas[t].artist,a.song=a.datas[t].song,a.album=a.datas[t].album}};return i}]),playerApp.factory("Audio",["$document",function(a){var t=a[0].createElement("audio");return t}]),playerApp.factory("Player",["$rootScope","$interval","Audio","DataList","DataBinding",function(a,t,i,e,n){a.data=e;var r={musicLen:"7",controllPlay:function(a){r.playerSrc(a),r.play(),r.isPlay=!0,n.dataBindFunc(a),r.playing=!0},playerSrc:function(t){var e=a.data[t].songUrl;i.src=e},play:function(a){r.playing&&r.stop(),i.play(),r.isPlay=!0,r.playing=!0},stop:function(){r.playing&&i.pause(),r.isPlay=!1,r.playing=!1},prev:function(a){console.log("prev:"+r.active),0==r.active?r.active=r.musicLen-1:r.active-=1,r.controllPlay(r.active)},next:function(a){console.log("next:"+r.active),r.active==r.musicLen-1?r.active=0:r.active+=1,r.controllPlay(r.active)}};return r}]);