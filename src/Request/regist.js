import request from '../Common/request';
import { host } from '../Common/config';
export async function regist ( registInfo){
  console.log(registInfo);
  const result = await request({
    'url':`${host}/user/register`,
    'method':'post',
    'data':registInfo
  });
  return result;
}