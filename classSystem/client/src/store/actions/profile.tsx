
import * as types from '@/store/action-types';
import {AnyAction} from 'redux';
import {validate,register,login} from '@/api/profile';
import { LoginPayload, LoginResult, RegisterPayload, RegisterResult } from '@/typings/user';
import {push} from 'connected-react-router';
import {message} from 'antd';
const actions = {
  validate():AnyAction{
    //如果action的payload属性是一个promise的话，那么redux-promise中间件可以拦截，等待promise完成，完成后会重新派发
    //dispatch({type:types.VALIDATE,payload:变成原来的payload那个promise resolve出来的值);
    return {
        type:types.VALIDATE,
        payload:validate()
    }
  },
  register(values:RegisterPayload){
    //派发本函数的时候，thunk中间件可以拦截到这个函数，然后让这个函数执行
    return function(dispatch:Function,getState:Function){//redux-thunk
      (async function(){
        let result:RegisterResult = await register<RegisterResult>(values);
        if(result.success){//如果注册成功了，路到登录页登录去
          dispatch(push('/login'));
        }else{
          message.error(result.message);
        }  
      })();//自执行函数也会立刻执行
    }
  },
  login(values:LoginPayload){
    return function(dispatch:Function,getState:Function){//redux-thunk
      (async function(){
        let result = await login<LoginResult>(values);
        if(result.success){//如果注册成功了，路到登录页登录去
          sessionStorage.setItem('token',result.data.token);
          dispatch(push('/profile'));
        }else{
          message.error(result.message);
        }  
      })();
    }
  },
  logout(){
    return function(dispatch:Function){
      sessionStorage.removeItem('token');//清除本地的token
      dispatch({type:types.LOGOUT});//派发 一个退出的action
      dispatch(push('/login'));
    }
  },
  changeAvatar(avatar:string){
    return {
      type:types.CHANGE_AVATAR,
      payload:avatar
    }
  }
}
export default actions;