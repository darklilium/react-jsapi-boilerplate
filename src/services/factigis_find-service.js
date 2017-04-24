import layers from './layers-service';
import token from './token-service';

function crearRectangulo(geometry,delta){
  var rectangulo = new esri.geometry.Polygon(new esri.SpatialReference(geometry.spatialReference));
    rectangulo.addRing([ [geometry.x-delta,geometry.y-delta],[geometry.x-1,geometry.y+delta],[geometry.x+1,geometry.y+delta],[geometry.x+delta,geometry.y-delta],[geometry.x-delta,geometry.y-delta] ])

		return rectangulo;
}

function factigis_findDireccion(geometry,callback){

  var myRectangulo = crearRectangulo(geometry,1);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_direcciones());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["id_direccion","nombre_calle","numero","comuna"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

    if(!featureSet.features.length){
      return callback([]);
    }
    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for direccion");
    callback([]);
  });
}

function factigis_findRotulo(geometry,callback){

  var myRectangulo = crearRectangulo(geometry,1);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_rotulos2());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
  qInterruptions.where = "tipo_nodo = 'ele!poste' or tipo_nodo='ele!camara'";
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    return callback(featureSet.features);
  }, (Errorq)=>{
    console.log("Error doing query for rotulos");
    return callback([]);
  });
}

function factigis_findTramoBT(geometry, tipo, callback){
  console.log("buscando en bt 2" , tipo);
  var myRectangulo = crearRectangulo(geometry,15);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_chqTramosBT());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
  qInterruptions.where = "tipo ='" + tipo + "'";

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    console.log("tramos bt: ",featureSet.features)
    return callback(featureSet.features);


  }, (Errorq)=>{
    console.log("Error doing query for tramos bt");
    return callback([]);
  });
}

function factigis_findTramoMT(geometry, tipo, callback){
  console.log("buscando en mt 2", tipo);
  var myRectangulo = crearRectangulo(geometry,15);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_chqTramosMT());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
  qInterruptions.where = "ARCGIS.DBO.Tramos_MT_006.tipo = '" + tipo + "'";
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    console.log("tramos mt: ",featureSet.features)
    return callback(featureSet.features);

    //  console.log("en mt encontre:",featureSet);
  }, (Errorq)=>{
    console.log("Error doing query for tramos mt");
     return callback([]);
  });
}

function factigis_findTramo(geometry, tramo, tipo , callback){


  //BUSCAR EN BT PRIMERO
  if(tramo=='BT'){
    console.log("buscando en bt...");
    var btFound = factigis_findTramoBT(geometry, tipo, bt=>{
      if(!bt.length){
        console.log("no hay nada en bt");
        let redBT = [];
        redBT.descripcion = 'N/A';
        redBT.tension = 'N/A';
        redBT.tipoFactibilidad = 'FACTIBILIDAD ASISTIDA';
        return callback(redBT);
      }else{
        let redBT = [];
        redBT.descripcion = bt[0].attributes['descripcion'];
        redBT.tension = 'N/A';
        redBT.tipoFactibilidad = 'FACTIBILIDAD DIRECTA';
        return callback(redBT);
      }
    });

  //BUSCAR EN MT
  }else {
    var mtFound = factigis_findTramoMT(geometry, tipo, mt=>{
      if(!mt.length){
        console.log("no hay nada en mt");
        let redMT = [];
        redMT.descripcion = 'N/A';
        redMT.tension = 'N/A';
        redMT.tipoFactibilidad = 'FACTIBILIDAD ASISTIDA';
        return callback(redMT);
      }else{
        console.log("esto encontre en mt", mt);
        let redMT = [];
        redMT.descripcion = mt[0].attributes['ARCGIS.DBO.Tramos_MT_006.descripcion'];
        redMT.tension = mt[0].attributes['ARCGIS.DBO.Cabeceras_006.tension'];
        redMT.tipoFactibilidad = 'FACTIBILIDAD DIRECTA';
        return callback(redMT);
      }
    });
  }
}

function factigis_findCalle(geometry,callback){

  var myRectangulo = crearRectangulo(geometry,10);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_calles());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["OBJECTID","nombre"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    return callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for direccion");
    return callback([]);
  });
}

function factigis_findNewDireccion(geometry, callback){
  var myRectangulo = crearRectangulo(geometry,1);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_direccionesNuevasQuery());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

    if(!featureSet.features.length){
      return callback([]);
    }
    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for new direccion");
    callback([]);
  });

}

function factigis_findComuna(geometry, callback){
  var myRectangulo = crearRectangulo(geometry,1);
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_comuna());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.geometry = myRectangulo;
  qInterruptions.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    console.log(featureSet.features.length);
    if(!featureSet.features.length){
      return callback([false]);
    }
    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for comuna");
    callback([false]);
  });
}

function factigis_findFolio(folio, callback){

  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_agregarFactibilidad());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.where = "OBJECTID =" + folio

  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{

    if(!featureSet.features.length){
      return callback([]);
    }

    callback(featureSet.features);
  }, (Errorq)=>{
    console.log(Errorq,"Error doing query for folio");
    callback([]);
  });
}

function factigis_findRotuloByNumber(numero, tipo, callback){

  //tipo_nodo ='ele!camara' and rotulo='B8380'
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_rotulos2());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.where = "tipo_nodo= '"+ tipo +"'AND rotulo ='"+ numero +"'";
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    return callback(featureSet.features);
  }, (Errorq)=>{
    console.log("Error doing query for rotulos by number");
    return callback([]);
  });
}


function factigis_searchFolioByRut(rut, callback){
  var qTaskInterruptions = new esri.tasks.QueryTask(layers.read_agregarFactibilidad());
  var qInterruptions = new esri.tasks.Query();

  qInterruptions.returnGeometry = true;
  qInterruptions.outFields=["*"];
  qInterruptions.where = "Rut= '"+ rut + "'";
  qTaskInterruptions.execute(qInterruptions, (featureSet)=>{
    if(!featureSet.features.length){
      return callback([]);
    }
    return callback(featureSet.features);
  }, (Errorq)=>{
    console.log("Error doing query for folios by rut");
    return callback([]);
  });
}

export {factigis_searchFolioByRut,factigis_findDireccion, factigis_findRotulo,factigis_findCalle, factigis_findNewDireccion,factigis_findTramo, factigis_findComuna, factigis_findFolio, factigis_findRotuloByNumber};
