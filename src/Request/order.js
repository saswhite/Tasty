import request from '../Common/request';
import { host } from '../Common/config';
export async function getOrder (){
  const result = await request({
    url: `${host}/order/5f98ca98756e3f76a7a73a53`,
    method:'get'
  });
  return result;
}