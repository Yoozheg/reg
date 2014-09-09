(function(document, $, undefined){
 "use strict";
 $.client = { //инфо о клиенте
  width:function(){ return window.innerWidth ? window.innerWidth : helem && helem.clientWidth ? helem.clientWidth : undefined; },
  height:function(){ return window.innerHeight ? window.innerHeight : helem && helem.clientHeight ? helem.clientHeight : undefined; },
  scroll:function(){
   var html = document.documentElement, body = document.body, scrollTop = html.scrollTop || body && body.scrollTop || 0;
   scrollTop -= html.clientTop; // IE<8
   return scrollTop;
  }
 }
})(document, $);
