import request from '../Common/request';
import { host } from '../Common/config';
export async function login (){
  const result = await request({
    url: `${host}/user/login`,
    method:'post',
    data:{ username: '9eaf50f13318116d62312b74c765b329', password: '38f554b767255d234fa4b21611d4f603' }
  });
  return result;
}
