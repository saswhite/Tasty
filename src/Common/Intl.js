import intl from 'react-intl-universal';

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

const locales = {
  'en-US': require('../Locales/en-US.json'),
  'zh-CN': require('../Locales/zh-CN.json'),
};

/* 获取和设置localstorage里面特定的值 */
import { setStorage,getStorage } from './utils';

/* 设置页面语言环境为英文 */
export function setEn () {
  intl.init({
    currentLocale: 'en-US', // TODO: determine locale here
    locales,
  });
  setStorage('language','en-US');
}

/* 设置页面语言环境为中文 */
export function setCh () {

  intl.init({
    currentLocale: 'zh-CN', // TODO: determine locale here
    locales,
  });
  setStorage('language','zh-CN');
}

/* 从设定好的两个文件中找对应的值 */
export function get (string){
  return intl.get(string);
}

/* 初始化语言环境 */
export function init (){
  let initlan = getStorage('language');
  if(initlan === 'en-US'){
    setEn();
  }else {
    setCh();
  }
}

