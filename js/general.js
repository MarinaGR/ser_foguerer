//Global Variables
var now = new Date().getTime();

var extern_siteurl="http://serfoguerer.ovnyline.es/index.html?app=mobile&app_ios=mobile&flag="+now; 

//Get the screen and viewport size
var viewport_width=$(window).outerWidth();
var viewport_height=$(window).outerHeight();
var screen_width=screen.width;
var screen_height=screen.height; 
var start_session;

var uuid;

$(document).ready(function() {
	$("#contenido").height(parseInt(viewport_height)-2+"px");
});

function onBodyLoad()
{	
    document.addEventListener("deviceready", onDeviceReady, false); 

	var fecha=getLocalStorage("fecha"); 
	if(typeof fecha == "undefined"  || fecha==null)	
	{	
		setLocalStorage("fecha", now); 
	}	
}

function onDeviceReady()
{
	
	alert("onDeviceReady");
	
	//RECOGER device.uuid para las valoraciones
	uuid=device.uuid;
	setLocalStorage("uuid", uuid);
	
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
	
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
	
	check_internet();	
		
	var start_session=getSessionStorage("start_session"); 
	if(typeof start_session == "undefined" || start_session==null)	
	{	
		//var nueva_fecha=parseInt(getLocalStorage("fecha"))+1000*60*60*24*5;   //5dias
		
		var nueva_fecha=parseInt(getLocalStorage("fecha"))+1000*60*5; //5min
				
		if(now>nueva_fecha) //cada 5 días limpia cache
		{
			window.cache.clear(function(status) {}, function(status) {});
			setLocalStorage("fecha", now);
			
			$("body").prepend("cache");
		}
		getSessionStorage("start_session", "inicio");
	}
	
}
    
function onBackKeyDown()
{		
	alert(myIframe.contentWindow.document.location.href);

	var myIframe=document.getElementById('contenido');	
	if((myIframe.contentWindow.document.location.href).indexOf("principal")!=-1 || ($("#contenido").attr("src")).indexOf("offline")!=-1)
	{		
		alert("salgo1");
		navigator.app.exitApp();
		return false;
	}
	else {
		myIframe.contentWindow.document.location.href="principal.html";
	}
}
function onMenuKeyDown()
{
	//window.location.href='index.html';
}
function onOnline()
{
	setTimeout(function(){
		$("#contenido").attr("src",extern_siteurl+"&devid="+getLocalStorage("uuid"));
	},250);
}
function onOffline()
{
	setTimeout(function(){
		$("#contenido").attr("src","offline.html");
	},250);

}

function check_internet(){

	var isOffline = 'onLine' in navigator && !navigator.onLine;

	alert("isOffline "+isOffline);
	
	if(isOffline) 
	{		
		setTimeout(function(){
			$("#contenido").attr("src","offline.html");				
		},250);
	}
	else 
	{
		alert($("#contenido").attr("src"));
		if(typeof $("#contenido").attr("src") == "undefined")
		{			
			setTimeout(function(){
				$("#contenido").attr("src",extern_siteurl+"&devid="+getLocalStorage("uuid"));
			},250);
		}		
	}

}

function get_var_url(variable){

	var tipo=typeof variable;
	var direccion=location.href;
	var posicion=direccion.indexOf("?");
	
	posicion=direccion.indexOf(variable,posicion) + variable.length; 
	
	if (direccion.charAt(posicion)== "=")
	{ 
        var fin=direccion.indexOf("&",posicion); 
        if(fin==-1)
        	fin=direccion.length;
        	
        return direccion.substring(posicion+1, fin); 
    } 
	else
		return false;
	
}

function setLocalStorage(keyinput,valinput) 
{
	if(typeof(window.localStorage) != 'undefined') { 
		window.localStorage.setItem(keyinput,valinput); 
	} 
	else { 
		alert("localStorage no definido"); 
	}
}
function getLocalStorage(keyoutput)
{
	if(typeof(window.localStorage) != 'undefined') { 
		return window.localStorage.getItem(keyoutput); 
	} 
	else { 
		alert("localStorage no definido"); 
	}
}
function setSessionStorage(keyinput,valinput)
{
	if(typeof(window.sessionStorage) != 'undefined') { 
		window.sessionStorage.setItem(keyinput,valinput); 
	} 
	else { 
		alert("sessionStorage no definido"); 
	}
}
function getSessionStorage(keyoutput)
{
	if(typeof(window.sessionStorage) != 'undefined') { 
		return window.sessionStorage.getItem(keyoutput); 
	} 
	else { 
		alert("sessionStorage no definido"); 
	}
}