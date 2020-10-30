import request from '../Common/request';
import { host } from '../Common/config';
export async function getOrder (){
  const result = await request({
    url: `${host}/order/5e219e0aa274ef537609fe86`,

    // url: `${host}/order/${userId}`,
    method:'get'
  });
  return result;
}