import request from '../Common/request';
import { host } from '../Common/config';
export async function menu (id){
  const result = await request({
    url: `${host}/menu/restaurantId/${id}`,
    method:'get',
  });
  return result;
}
