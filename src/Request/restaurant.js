import request from '../Common/request';
import { host } from '../Common/config';
export async function restaurant (){
  const result = await request({
    url: `${host}/restaurant/location/-74.0059413,40.7127837`,
    method:'get'
  });
  return result;
}