(function() {
  var httpRequest,
      getById = document.getElementById;

  function makeRequest(url) {
    var factory = [
      [window.XMLHttpRequest, undefined],
      [window.ActiveXObject, "Msxml2.XMLHTTP"],
      [window.ActiveXObject, "Microsoft.XMLHTTP"]
    ];
    for (var i = 0; i < factory.length; i++) {
      try {
        httpRequest = new factory[i][0](factory[i][1]);
        httpRequest.onreadystatechange = alertContents;
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
        var respa = JSON.parse(httpRequest.responseText);
        var photosect = getById('photos');
        for (var x in respa.data ){  
                var img = document.createElement("img");
                img.src = respa.data[x].link;
                photosect.appendChild(img);
        }
      }
    }
  }

  makeRequest('https://api.imgur.com/3/gallery/r/nsfw/');
})();
