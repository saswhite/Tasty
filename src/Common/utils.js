import moment from 'moment-timezone';
import _ from 'lodash';
/* 往localstorage里面设置特定的值 */
export function setStorage (key, data) {
  if(!key) return;
  localStorage.setItem(key, JSON.stringify(data));
}

/* 从localstorage里面获取特定的值 */
export function getStorage (key) {
  if(!key) return;
  let res = localStorage.getItem(key);
  try {
    return JSON.parse(res);
  } catch (err) {
    return res;
  }
}

/* 检测门店是否关闭 */

export function isClosed (item){
  let date = new Date();
  var newYork = moment.tz(date,'America/New_York');
  let checkTime = newYork.hours() * 60 + newYork.minutes();
  let flag = false;
  /* 判断是否人为关闭 */
  if(item.closed){
    flag = true;
  }else{
    /* 判断是否在开放时间内 */
    _.forEach(item.hours,(hourItem)=>{
      if(hourItem.dayOfWeek == newYork.day() && hourItem.start <= checkTime && checkTime <= hourItem.end){
        return flag = false;
      }else{
        return flag = true;
      }
    });
  }
  return flag;
}

