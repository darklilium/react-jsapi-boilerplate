import React from 'react';
//toolbox
import Tooltip from 'rc-tooltip';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {Input} from 'react-toolbox/lib/input';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import {Snackbar} from 'react-toolbox/lib/Snackbar';
import {AppBar} from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';


//own custom css
import theme from '../css/RedAppBar.scss';

//esri arcgis js api
import Map from 'esri/map';
import Search from 'esri/dijit/Search';
import BasemapToggle from "esri/dijit/BasemapToggle";
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import IdentifyTask from "esri/tasks/IdentifyTask";
import IdentifyParameters from "esri/tasks/IdentifyParameters";
import arrayUtils from "dojo/_base/array";
import InfoTemplate from "esri/InfoTemplate";

//own
import {mapConfig, creds} from '../services/config';
import layers from '../services/layers-service';
import {factigisLoginVentaWeb} from '../services/parameters';
import $ from 'jquery';
import {factigis_findRotulo} from '../services/factigis_find-service';


var map;


const AppBarTest = () => (
  <AppBar theme={theme} title='My App'></AppBar>
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      activeSnackbar: false,
      snackbarIcon: '',
      snackbarMessage: ''

    }


  }

  componentDidMount(){
  creds

    factigisLoginVentaWeb(creds.u,creds.p,(cb)=>{
      //show everything.
      if(cb[0]){
        map = new Map("map",{
          basemap: mapConfig.basemap,
          center: mapConfig.center,
          zoom: mapConfig.zoom
        });

      }else{
        this.setState({snackbarMessage: "Hubo un problema al inicializar la aplicación. Contáctese con el administrador/desarrollador del sistema.", activeSnackbar: true, snackbarIcon: 'error' });
      }

    });

  }


  handleSnackbarClick = () => {

    this.setState({activeSnackbar: false});
  };


  render(){
    return (
      <div className="wrapper_app">
        <AppBarTest />
        <div className="wrapper_body">
          <div className="wrapper_body" id="map">
            <div id="BasemapToggle"></div>
          </div>
        </div>
        <Snackbar action='Aceptar' active={this.state.activeSnackbar} icon={this.state.snackbarIcon} label={this.state.snackbarMessage} onClick={this.handleSnackbarClick.bind(this)} type='cancel' />

      </div>
    );
  }
}

export default Main;
