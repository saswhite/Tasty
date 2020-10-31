import request from '../Common/request';
import { host } from '../Common/config';
export async function putOrder (data){
  const result = await request({
    url: `${host}/order`,
    method:'put',
    data
  });
  return result;
}
