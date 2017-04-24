/*function token(){
  return {
    read(){
      return localStorage.getItem('token');
    },
    write(tokenValue){
      localStorage.setItem('token', tokenValue);
    }
  };
}
*/
import cookiehandler from 'cookie-handler';

function token(){
  return {
    read(){
      //return localStorage.getItem('token');
      return cookiehandler.get('tkn');
    },
    write(tokenValue){
      //localStorage.setItem('token', tokenValue);
      cookiehandler.set('tkn',tokenValue);
    }
  };
}

function tokenValidator(){

  var t = localStorage.getItem('token');
  const exampleUrl = "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Interrupciones/PO/MapServer";
  const data = {
    token: t,
    f: "json"
  };
  console.log("en token validator");
  $.ajax({
    url: exampleUrl,
    dataType: 'json'
  })
  .done(isDone => {
    console.log("en token validator done", isDone);
    if (isDone.indexOf('Invalid Token') >= 0){
          console.log("redirect to login page from token validator...");
            window.location.href = "index.html";
    }
  })
  .fail(error => {
    console.log("en token validator fail", error);

  });
}


export {tokenValidator};
export default token();
