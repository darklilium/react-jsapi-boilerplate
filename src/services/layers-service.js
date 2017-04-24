import token from './token-service';




function getMapLayers() {
  var map = mymap.getMap();
    for (var j = 0, jl = map.layerIds.length; j < jl; j++) {
        var currentLayer = map.getLayer(map.layerIds[j]);
        console.log("id: " + currentLayer.id + ", visible: " + currentLayer.visible + ", opacity: " + currentLayer.opacity);
    }
}

function myLayers(){
  //const serviceMain = 'http://gisred.chilquinta/arcgis/';
  //change this for external connection:
  //Cambios v0.6.1 prod factigisVE 31.03.2017
  const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  //var graphicLayer = new GraphicsLayer;

  //check 8 and last one
  return {

    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_direccionesDyn(){
     return serviceURL + "Cartografia/DMPS/MapServer?f=json&token=" + token.read();
    },
    read_direccionesNuevasMobile(){
     return serviceURL + "Mobile/Ingreso_externo_nuevo/MapServer?f=json&token=" + token.read();
    },
    read_rotulos(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer?f=json&token=" + token.read();
    },

    read_direcciones(){
         return serviceURL + "Cartografia/DMPS/MapServer/0?f=json&token=" + token.read();
    },

    //CODING REFACTOR: 09/11
    read_logAcessosSave(){
      return serviceURL +"Admin/LogAccesos/FeatureServer/1/applyedits";
    },
    read_direccionesNuevasQuery(){
         return serviceURL + "Mobile/Ingreso_externo_nuevo/FeatureServer/2?f=json&token=" + token.read();
    },
    read_rotulos2(){
      return serviceURL + "Chilquinta_006/Nodos_006/MapServer/0?f=json&token=" + token.read();
    },
    read_comuna(){
        return serviceURL + "MapaBase/MapServer/4?f=json&token=" + token.read();
    },
    read_factigis_transmision(){
        return serviceURL + "Varios/FACTIBILIDAD/MapServer/0?f=json&token=" + token.read();
    },
    read_factigis_distribucion(){
        return serviceURL + "Chilquinta_006/Concesiones006/MapServer/0?f=json&token=" + token.read();
    },
    read_factigis_vialidad(){
        return serviceURL + "PMS/Vialidad/MapServer/0?f=json&token=" + token.read();
    },
    read_campamentos(){
       return serviceURL + "MANTENIMIENTO/Otras_Capas/MapServer/3?f=json&token=" + token.read();
    },
    read_chqTramosBT(){
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer/1?f=json&token=" + token.read();
    },
    read_chqTramosMT(){
      return serviceURL + "Chilquinta_006/Tramos_006/MapServer/0?f=json&token=" + token.read();
    },
    read_layer_nisInfo(){
      return serviceURL + "Chilquinta_006/ClientesV2/MapServer/0?f=json&token=" + token.read();
    },
    read_layer_infoSED(){/*using for getting the sed information and location*/
      return serviceURL + "Chilquinta_006/Equipos_pto_006/MapServer/1?f=json&token=" + token.read();
    },

  
    read_mapabase(){
      return serviceURL + "MapaBase/MapServer?f=json&token=" + token.read();
    },
    read_calles(){
        return serviceURL + "MapaBase/MapServer/2?f=json&token=" + token.read();
    },
    read_factigis_addDireccion(){
      return serviceURL + "Mobile/Ingreso_externo_nuevo/FeatureServer/2/applyedits";
    }
  };
}



//TO DO: this function can be used to know the active layers in the map.
function layersActivated(){
  var activeLayers= [];
  var mapp = mymap.getMap();
  var activeLayersLength = mapp.layerIds.length;
  //console.log(mapp.layerIds.length);
  return {
    getMapLayers() {
      for (var j=0; j<activeLayersLength; j++) {
        var currentLayer = mapp.getLayer(mapp.layerIds[j]);
        activeLayers.push(currentLayer.id);
        //alert("id: " + currentLayer.id);
      }
      console.log("Layers actived" ,activeLayers);
      return activeLayers;

    }
  }
}

// TO DO: this function add the default and not defaults layer (from the LayerList) in the app.
function addCertainLayer(layerNameToAdd, order, where, callback){
  //checkbox setup n° 6
  var mapp = mymap.getMap();
  var myLayerToAdd;

  console.log("adding layer: ", layerNameToAdd,order);

  switch (layerNameToAdd) {

    case 'ap_comuna':
      myLayerToAdd = setLayers().ap_comuna(where, 4);
    break;

    case 'po_interrupciones':
      myLayerToAdd = setLayers().interrupciones();
    break;

    case 'gis_alimentadores':
      myLayerToAdd = setLayers().alimentadores();
    break;

    case 'ap_luminarias':
      myLayerToAdd = setLayers().ap_luminarias(where,6);
    break;

    case 'ap_modificaciones':
      myLayerToAdd = setLayers().ap_modificaciones(where,7);
    break;

    case 'ap_tramos':
      myLayerToAdd = setLayers().ap_tramos(where,5);
    break;

    case 'factigis_transmision':
      myLayerToAdd = setLayers().factigis_transmision(where,order);
    break;

    case 'factigis_distribucion':
      myLayerToAdd = setLayers().factigis_distribucion(where,order);
    break;

    case 'factigis_vialidad':
      myLayerToAdd = setLayers().factigis_vialidad(where,order);
    break;

    case 'gis_SSEE':
      myLayerToAdd = setLayers().read_SSEE(where,order);
    break;
    case 'gis_campamentos':
      myLayerToAdd = setLayers().read_campamentos(where,order);
    break;
    case 'gis_direcciones':
      myLayerToAdd = setLayers().gis_direcciones(where,order);
    break;
    case 'gis_cartografia':
      myLayerToAdd = setLayers().gis_cartografia(where,order);
    break;
    case 'gis_rotulos':
      myLayerToAdd = setLayers().gis_rotulos(where,order);
    break;
    case 'gis_chqbasemap':
      myLayerToAdd = setLayers().gis_chqbasemap(where,order);
    break;
    case 'mobile_direccionesNuevas':
      myLayerToAdd = setLayers().mobile_direccionesNuevas(where,order);
    break;
    case 'factigis_subestaciones':
      myLayerToAdd = setLayers().factigis_subestaciones(where,order);
    break;
    case 'factigis_MT':
      myLayerToAdd = setLayers().factigis_MT(where,order);
    break;
    case 'factigis_BT':
      myLayerToAdd = setLayers().factigis_BT(where,order);
    break;
    default:
  }

  mapp.addLayer(myLayerToAdd,order);

  //Set here if you add more layers in the LayerList.
  //checkbox setup n° 5
  if (check_alimentador.checked){
    mapp.addLayer(setLayers().alimentadores(),1);
  }
  if (check_ap_modificaciones.checked){
    mapp.addLayer(setLayers().ap_modificaciones(), 1);
  }
  if (check_factigis_distribucion.checked){
    mapp.addLayer(setLayers().factigis_distribucion(), 1);
  }
  if (check_factigis_transmision.checked){
    mapp.addLayer(setLayers().factigis_transmision(), 1);
  }
  if (check_factigis_vialidad.checked){
    mapp.addLayer(setLayers().factigis_vialidad(), 1);
  }
  if (check_SSEE.checked){
    mapp.addLayer(setLayers().SSEE(), 1);
  }
  if (check_campamentos.checked){
    mapp.addLayer(setLayers().campamentos(), 1);
  }
  if (check_chqbasemap.checked){
    mapp.addLayer(setLayers().gis_chqbasemap(), 1);
  }
  if (check_subestaciones.checked){
    mapp.addLayer(setLayers().factigis_subestaciones(), 1);
  }
  if (check_MT.checked){
    mapp.addLayer(setLayers().factigis_MT(), 1);
  }
  if (check_BT.checked){
    mapp.addLayer(setLayers().factigis_BT(), 1);
  }
  if (check_Postes.checked){
    mapp.addLayer(setLayers().gis_rotulos(), 1);
  }

  callback(myLayerToAdd);
}
export default myLayers();
export {layersActivated,addCertainLayer,getMapLayers};
