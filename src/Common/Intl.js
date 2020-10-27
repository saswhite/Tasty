import intl from 'react-intl-universal';

// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

// app locale data
const locales = {
  'en-US': require('../Locales/en-US.json'),
  'zh-CN': require('../Locales/zh-CN.json'),
};

export function setEn () {

  intl.init({
    currentLocale: 'en-US', // TODO: determine locale here
    locales,
  });

  localStorage.setItem('language','en');

}
export function setCh () {

  intl.init({
    currentLocale: 'zh-CN', // TODO: determine locale here
    locales,
  });

  localStorage.setItem('language','zh');

}

export function get (string){
  return intl.get(string);
}

export function init (){
  let lan = localStorage.getItem('language');
  if(lan === 'en'){
    setEn();
  }else {
    setCh();
  }
}