(function() {
  "use strict";
  var httpRequest,
      evt_status = 0,
      evt_complete = 273, //111
      evt_load_music = 1, //001
      evt_load_pic = 16,  //010
      evt_load_xhr = 256, //100

      loop = document.getElementById('loop'),
      img = document.getElementById('heroimg');

  loop.onloadeddata = function(){
    director(evt_load_music);
  };
  img.onload = function(){
    director(evt_load_pic);
  };

  img.src = 'images/andrea.png';

  function director(event){
    evt_status |= event;
    console.log(evt_status);
    if (evt_status == evt_complete){
        play();
    }
  }

  function makeRequest(url, cbk) {
    var factory = [
      [window.XMLHttpRequest, undefined],
      [window.ActiveXObject, "Msxml2.XMLHTTP"],
      [window.ActiveXObject, "Microsoft.XMLHTTP"]
    ];
    for (var i = 0; i < factory.length; i++) {
      try {
        httpRequest = new factory[i][0](factory[i][1]);
        httpRequest.onreadystatechange = cbk;
        httpRequest.open('GET', url);
        httpRequest.setRequestHeader ("Authorization", "Client-ID cc01e3195c1adc2");
        httpRequest.send();
        return;
      } catch(e) {}
    }
  }

  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var respa = JSON.parse(httpRequest.responseText),
            photosect = document.getElementById('photos');
        for (var x in respa.data ){
                var img = document.createElement("img");
                img.src = respa.data[x].link;
                photosect.appendChild(img);
        }
        director(evt_load_xhr);
      }
    }
  }


  function play(){
    loop.play(); 
    img.style.opacity = 1;
    window.setInterval(function(){
        img.style.opacity = Math.min(Math.random() + 0.5, 1);
    }, 10000);
  }

  makeRequest('https://api.imgur.com/3/gallery/r/nsfw/', alertContents);
  //makeRequest('http://localhost:8000/test.json', alertContents);
})();
