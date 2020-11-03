import { showLoading,hideLoading } from '../../../Redux/Reducer/loading';
import { showErrorAsync } from '../../../Redux/Reducer/error';
import { putOrder } from '../../../Request/payment';
import { clear } from '../../MenuBox/state/reducer';
import { getStorage } from '../../../Common/utils';
import { get } from '../../../Common/Intl';
export function checkOrder (orderInfo,history){

  // console.log(orderInfo);
  return async (dispatch)=>{
    try {
      /* loading */
      dispatch(showLoading());
      let isLogin = getStorage('user') ? true : false;
      /* 判断是否登录 */
      if(isLogin){
        await putOrder(orderInfo);
        history.push('/order');
        dispatch(clear());
      }else{
        dispatch(showErrorAsync(get( `error.${'need-login'}`)));
      }
    } catch (error) {
      dispatch(showErrorAsync(error.message));
    }finally{
      dispatch(hideLoading());
    }
  };
}