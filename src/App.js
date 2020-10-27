import React from 'react';
import './App.css';
import PrivateRouter from './Common/PrivateRouter';

import { routerConfig } from './Router/index';
import _ from 'lodash';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

function App () {

  function renderRouter (){
    return _.map(routerConfig,(item)=>{
      return <PrivateRouter { ...item } key={ Math.random() }></PrivateRouter>;
    });
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          {renderRouter()}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
