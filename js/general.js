//Global Variables
var now = new Date().getTime();

var url_ppal="http://serfoguerer.ovnyline.es/";
var extern_siteurl=url_ppal+"index.html?app=mobile&app_ios=mobile&flag="+now; 

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
		var nueva_fecha=parseInt(getLocalStorage("fecha"))+1000*60*60*24*5;
		if(now>nueva_fecha) //cada 5 días limpia cache
		{
			window.cache.clear(function(status) {}, function(status) {});
			setLocalStorage("fecha", now);
		}
		setSessionStorage("start_session", "inicio");
	}
	
}
    
function onBackKeyDown()
{		
	var myIframe=document.getElementById('contenido');	
	
	var vista_anterior=myIframe.contentWindow.vista_anterior;
	var vista_actual=myIframe.contentWindow.vista_actual;
	
		
	if(((myIframe.contentWindow.document.location.href).indexOf("index")!=-1 && vista_actual=="undefined") || ((myIframe.contentWindow.document.location.href).indexOf("principal")!=-1 && vista_actual=="menu") || ($("#contenido").attr("src")).indexOf("offline")!=-1 || (myIframe.contentWindow.document.location.href).indexOf("offline")!=-1)
	{		

		alert("salgo");
		
		navigator.app.exitApp();
		return false;
	}
	else {
		
		alert("no salgo");
		
		myIframe.contentWindow.document.location.href=url_ppal+"principal.html?vista="+vista_anterior;
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
		window.location.href="offline.html";
	},250);

}

function check_internet(){
	
	$("body").append(JSON.stringify(navigator));
	
	//var isOffline = 'onLine' in navigator && !navigator.onLine;
	var isOffline = navigator.connection.type!='none' && navigator.connection.type!='unknown';
		
	alert(isOffline);
	
	if(isOffline) 
	{		
		setTimeout(function(){
			//$("#contenido").attr("src","offline.html");				
			window.location.href="offline.html";
		},250);
	}
	else 
	{
		if(typeof $("#contenido").attr("src") == "undefined" && getSessionStorage("start_session")==null)
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