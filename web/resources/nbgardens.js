/* Used to automatically generate navigation breadcrumbs */
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

/* Used to generate and navigate image slideshow */
function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

/* Open dropdown menu on click */
function openWishlist() {
	var x = document.getElementById("wishlist");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else {
		x.className = x.className.replace(" w3-show", "");
	}
}

/* Create a cookie */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

/* Get a cookie */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

/* Check for a cookie */
function checkCookie(name) {
	var cookieName = getCookie(name);
	if (cookieName != "") {
//		alert("Cookie Found!"); //DEBUG
		return true;
	} else {
//		alert("Cookie Not Found!"); //DEBUG
		return false;
	}
}

/* Create user session cookie */
function login(LoggedIn) {
	if (loggedIn === false) {
		username = prompt("Please enter your username:", "");
		if (username != "" && username != null) {
			setCookie("username", username, 14);
		}
	}
	//alert("Logged in as " + getCookie("username")); //DEBUG
	location.reload(true);
}

/* Wishlist */
function addToWishlist(list) {
	var productID;
		
	for (var i = 0; i < document.getElementsByTagName("INPUT").length; i++)
	{
		if(document.getElementsByTagName("INPUT")[i].name === "product-selector" && document.getElementsByTagName("INPUT")[i].checked === true)
		{
			productID = document.getElementsByTagName("INPUT")[i].value;
			list.push(productID);
			setCookie("wishlist", list.toString(), 1825);
			alert("'" + productID + "' added to wishlist.\nWishlist contents now: " + list.toString()); //DEBUG
		}
	}
	location.reload(true);
	return list;
}

function removeFromWishlist(position) {
	list = getCookie("wishlist").split(",");
	list.splice(position,1);
	setCookie("wishlist", list.toString(), 1825);
	location.reload(true);
}

function displayWishlist() {
	var list = [];
	
	if (checkCookie("wishlist")) {
		list = getCookie("wishlist").split(",");
		for (var i = 0; i < list.length; i++) {
			if (list[i].indexOf("-") != -1) { 
				list[i] = {id: list[i], link: list[i].slice(0,list[i].indexOf("-"))}
			} else {
				list[i] = {id: list[i], link: list[i]}
			}
		}
	}

	if (list[0] == null) {
		document.getElementById("wishlist").innerHTML = 
			document.getElementById("wishlist").innerHTML + "Your wishlist contains no items";
	} else {
		for (var j = 0; j < list.length; j++) {
			var link = document.createElement("A");
				link.className = "nb-wishlist-link w3-border-bottom";
				link.href = list[j].link + ".html";
			var div1 = document.createElement("DIV");
				div1.className = "nb-wishlist-img";
			var img = document.createElement("IMG");
				img.className = "nb-wishlist-thumb";
				img.src = "img/product/" + list[j].id + ".jpg";
			var div2 = document.createElement("DIV");
				div2.className ="nb-wishlist-name";
				div2.innerHTML = list[j].id;
			var del = document.createElement("DIV");
				del.className = "nb-wishlist-remove";
				del.setAttribute("onclick", "removeFromWishlist(" + j.toString() + ")");
				del.innerHTML = '<i class="fa fa-times fa-lg w3-opacity" aria-hidden="true"></i>';
			
				document.getElementById("wishlist").appendChild(link);
				link.appendChild(div1);
				div1.appendChild(img);
				link.appendChild(div2);
				document.getElementById("wishlist").appendChild(del);
		}
	}
}