(function(context, factory){
  if(typeof exports != 'undefined'){
    module.exports = factory();
  }else{
    context.cookies = factory();
  }
})(this, function(){
  'use strict';

  function addDays(days){
    var date = new Date();
    var additionalDays = 1000 * 60 * 60 * 24 * days;
    date.setTime(date.getTime() + additionalDays);
    return date;
  }

  function createCookie(key, value, expires){
    var result = key + '=' + JSON.stringify(value) + ';path=/;expires=' + expires.toUTCString();
    document.cookie = result;
  }

  function getCookie(key){
    var results = new RegExp(key + '=(.*?)(;|$)','g').exec(document.cookie);
    return results && results[1] ? JSON.parse(results[1]) : null;
  }

  var cookie = {
    get: function(key, markAsErasable){
      markAsErasable = markAsErasable || false;
      var value = getCookie(key);

      if(markAsErasable){
        this.remove(key);
      }

      return value;
    },
    set: function(key, value, days){
      days = days || 365;
      createCookie(key, value, addDays(days));
    },
    remove: function(key){
      createCookie(key, null, addDays(-7));
    }
  };

  return cookie;
});
