import request from '../Common/request';
import { host } from '../Common/config';
export async function login (data){
  const result = await request({
    url: `${host}/user/login`,
    method:'post',
    data
  });
  return result;
}
