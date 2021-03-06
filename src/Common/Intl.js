import intl from 'react-intl-universal';

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

const locales = {
  'en-US': require('../Locales/en-US.json'),
  'zh-CN': require('../Locales/zh-CN.json'),
};

/* 获取和设置localstorage里面特定的值 */
import { setStorage,getStorage } from './utils';

/* 设置页面语言环境 */
export function setLan (lan) {
  intl.init({
    currentLocale: lan, // TODO: determine locale here
    locales,
  });
  setStorage('language',lan);
}

/* 从设定好的两个文件中找对应的值 */
export function get (string){
  return intl.get(string);
}

/* 初始化语言环境 */
export function init (){
  let initlan = getStorage('language');
  if(initlan === 'en-US'){
    setLan('en-US');
  }else {
    setLan('zh-CN');
  }
}

