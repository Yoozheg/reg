(function(document, $, undefined){
 "use strict";
 
 $.splash = (function(){
  var splashScreen = (new $('div')).id('splash').cls('splash').css('display:none'), splashScreenAside = splashScreen.add('aside').cls('splash').html('закрыть'),
    splashed = false, defaultParams = {prevClose:true, aside:false, zIndex:10}, splashCloseFunc;

  var splash = (function(){
   return {
    open: function(params){
     if(!params) params = {}
     for(var i in defaultParams) if(params[i] === undefined) params[i] = defaultParams[i];

     splashScreen.css({zIndex:params.zIndex});

     if(splashed && params.prevClose && splashCloseFunc) splashCloseFunc();
     splashCloseFunc = params.onclose;
     splashed = true;
     params.aside ? $('#splash>aside.splash').show() : $('#splash>aside.splash').hide();
     splashScreen.show()
    },
    close: function(){
     if(splashCloseFunc) splashCloseFunc();
     splashCloseFunc = undefined;
     splashed = false;
     splashScreen.hide()
    }
   }
  })()

  //splashScreenAside.on({click: splash.close});
  $.ready(function(){
   $(splashScreen, '#splashmain').on({click: function(event){
    if($('#splashmain').contains(event.target) && event.target.tagName.toLowerCase() != 'button') return false;
    if(event.target.tagName.toLowerCase() != 'button') splash.close()
   }});
  })

  $.css('.splash', 'position:fixed;top:0;right:0;bottom:0');
  $.css('#splash', 'left:0;display:none;background:rgba(30,30,30,0.75)');
  //$.css('#splash > aside.splash' , 'width:13%;background:top right url(img/close.png) no-repeat;border:none;color:transparent;text-align:right;padding-right:45px;padding-top:10px;font-size:16px;cursor:pointer;transition:0.7s all');
  //$.css('#splash > aside.splash:hover', 'background-color:rgba(50,50,50,0.75);color:white');

  $.ready(function(){
   $(document.body).add(splashScreen);
  })

  return splash;
 })()
})(document, $);
