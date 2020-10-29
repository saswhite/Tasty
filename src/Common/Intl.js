import intl from 'react-intl-universal';

// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

// app locale data
const locales = {
  'en-US': require('../Locales/en-US.json'),
  'zh-CN': require('../Locales/zh-CN.json'),
};

import { setStorage,getStorage } from './utils';

export function setEn () {

  intl.init({
    currentLocale: 'en-US', // TODO: determine locale here
    locales,
  });
  setStorage('language','en-US');
}
export function setCh () {

  intl.init({
    currentLocale: 'zh-CN', // TODO: determine locale here
    locales,
  });
  setStorage('language','zh-CN');
}

export function get (string){
  return intl.get(string);
}

export function init (){
  let initlan = getStorage('language');
  if(initlan === 'en-US'){
    setEn();
  }else {
    setCh();
  }
}

