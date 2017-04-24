import React from 'react';
import ReactDOM from 'react-dom';
//import App from './component/App';
import { AppContainer } from 'react-hot-loader';
//import { overrideComponentTypeChecker } from 'react-toolbox';

import Main from './components/Main';
//import theme from './css/toolbox/theme';
//import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const rootEl = document.getElementById('app');
/*
const render = () => {
  ReactDOM.render(

        <Cortocircuito />
      ,
    rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  overrideComponentTypeChecker((classType, reactElement) => (
    reactElement && (
      reactElement.type === classType
      || reactElement.type.name === classType.displayName
    )
  ));
  if (module.hot) {
    module.hot.accept('./components/Cortocircuito',  render);
  }
}


render();

*/


ReactDOM.render(<Main />, document.getElementById('app'));
