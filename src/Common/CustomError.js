import _ from 'lodash';
import intl from 'react-intl-universal';

/* 自定义error */
export default function CustomError (err){
  this.details = _.get(err, 'response.data.details');

  this.code = _.get(err, 'response.data.code');

  this.message = _.get(err, 'response.data.message') || err.message;

  if(/timeout of/.test(err.message)){this.code = 'timeout';}
  if(/Network Error/.test(err.message)){this.code = 'network';}

  const trans = intl.get(`error.${this.code}`);
  if(trans){
    this.message = intl.get(`error.${this.code}`, { ...this.details });
  }else{
    this.message = _.get(err, 'response.data.message') || err.message || intl.get('error.unknown');
  }
}