import cookieHandler from 'cookie-handler';
import myLayers from './layers-service';
import token from './token-service';
import $ from 'jquery';

function factigisLoginVentaWeb(user,pass, callback){

  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 1440,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      console.log('Login incorrecto, intente nuevamente');
        return callback([false,'login']);
      //notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      console.log('Login incorrecto, intente nuevamente');
      return callback([false,'login']);
      //notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    //IF EVERYTHING IS OK , GOING TO:
    console.log('writing token into system', myToken);
    token.write(myToken);
    cookieHandler.set('wllExp',getFormatedDateExp());
    //if the login is correct. Get user permission:
    return callback([true,'all']);

  })
  .fail(error => {
    console.log("Problem:" , error);
    return callback([false,"problem"]);
  //  notifications("Problema al iniciar sesión. Intente nuevamente.","Login_Failed", ".notification-login");
  });

  console.log('gisred login done');
}


function getFormatedDateExp(){
  var d = new Date();

  var str = "day/month/year hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate()+1 : d.getDate()+1)
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log(str);
  return str;
}

function getFormatedDate(){
  var d = new Date();

  var str = "day/month/year hour:minute:second"
    .replace('day', d.getDate() <10? '0'+ d.getDate() : d.getDate())
    .replace('month', (d.getMonth() + 1) <10? '0' + (d.getMonth()+1) : (d.getMonth()+1))
    .replace('year', d.getFullYear())
    .replace('hour', d.getHours() <10? '0'+ d.getHours() : d.getHours() )
    .replace('minute', d.getMinutes() <10? '0'+ d.getMinutes() : d.getMinutes())
    .replace('second', d.getSeconds() <10? '0'+ d.getSeconds() : d.getSeconds());
    console.log("Today",str);
  return str;
}



function saveGisredLogin(user, fech, page, mod, tkn){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, fecha: fech , "pagina": page, "modulo": mod  }, geometry: {} }]),
    token: tkn
  };

  jQuery.ajax({
    method: 'POST',
    url: myLayers.read_logAccessFactigis(),
    dataType:'html',
    data: data
  })
  .done(d =>{
    //console.log(d,"pase");
    console.log("")
  })
  .fail(f=>{
    console.log(f,"no pase");
    console.log("Error adding logReg")
  });
}



export {factigisLoginVentaWeb, saveGisredLogin, getFormatedDate};
