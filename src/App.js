import React from 'react';
import './App.css';
import PrivateRouter from './Common/PrivateRouter';

import { getStorage } from './Common/utils';

import intl from 'react-intl-universal';
import zh from './Locales/zh-CN.json';
import en from './Locales/en-US.json';

let lang = getStorage('language') || (navigator.languages && navigator.languages[0]) || navigator.language;

intl.init({
  currentLocale: lang.split('-')[0],
  locales: {
    zh,
    en
  }
});

import { routerConfig } from './Router/index';
import _ from 'lodash';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Error from './Components/Error/Error';

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
      <Error></Error>
    </Router>
  );
}

export default App;
