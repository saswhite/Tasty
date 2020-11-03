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

/* 循环分组 */
export function groupMap (array){
  const initLan = getStorage('language');//初始化的语言
  let list = [];
  _.forIn(_.groupBy(array,`name[${initLan}]`),(value,key)=>{
    let item = {
      title:'',
      count : 0,
      price: 0,
      _id:''
    };
    item.title = key.toString();
    item.count = value.length;
    item.price = value[0].price;
    item._id = value[0]._id;
    list.push(item);
  });
  return list;
}
