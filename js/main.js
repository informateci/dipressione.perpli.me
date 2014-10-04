(function() {
  var httpRequest,
      getById = document.getElementById;
  function makeRequest(url) {
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }
    if (!httpRequest) {return false;}
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.setRequestHeader ("Authorization", "Client-ID cc01e3195c1adc2");
    httpRequest.send();
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
      } else {
        return false;
      }
    }
  }
  makeRequest('https://api.imgur.com/3/gallery/r/nsfw/');
})();
