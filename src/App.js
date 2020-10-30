import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import _ from 'lodash';

import PrivateRouter from './Common/PrivateRouter';
import { routerConfig } from './Router/index';
import { getStorage } from './Common/utils';

import intl from 'react-intl-universal';
import zh from './Locales/zh-CN.json';
import en from './Locales/en-US.json';

/** components */
import Error from './Components/Error/Error';
/** scss */
import './App.css';
let lang = getStorage('language') || (navigator.languages && navigator.languages[0]) || navigator.language;

intl.init({
  currentLocale: lang.split('-')[0],
  locales: {
    zh,
    en
  }
});

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
      <Error/>
    </Router>
  );
}

export default App;
