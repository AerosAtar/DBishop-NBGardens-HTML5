// Script to open and close the sidenav
function w3_open() {
	document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
	document.getElementsByClassName("w3-overlay")[0].style.display = "block";
}
function w3_close() {
	document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
	document.getElementsByClassName("w3-overlay")[0].style.display = "none";
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
	var x = document.getElementById("navSmall");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

//Used to enable accordion style menu collapse
function accordionFunction(id) {
    var x = document.getElementById(id);
   
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-l2";
    } else { 
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className = 
        x.previousElementSibling.className.replace(" w3-theme-l2", "");
    }
}

// Used to automatically generate navigation breadcrumbs
function breadcrumbs() {
  sURL = new String;
  bits = new Object;
  var x = 0;
  var stop = 0;
  var output = "<div class=\"breadcrumb\"><a href=/>home</a> &gt; ";

  sURL = location.href;
  sURL = sURL.slice(8,sURL.length);
  chunkStart = sURL.indexOf("/");
  sURL = sURL.slice(chunkStart+1,sURL.length)

  while(!stop){
    chunkStart = sURL.indexOf("/");
    if (chunkStart != -1){
      bits[x] = sURL.slice(0,chunkStart)
      sURL = sURL.slice(chunkStart+1,sURL.length);
    } else {
      stop = 1;
    }
    x++;
  }

  for(var i in bits){
    output += "<a href=\"";
    for(y=1;y<x-i;y++){
      output += "../";
    }
    output += bits[i] + "/\">" + bits[i] + "</a> &gt; ";
  }
  document.write(output + document.title);
  document.write("</div>");
  }
