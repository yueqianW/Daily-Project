
import * as types from '@/store/action-types';
import {AnyAction} from 'redux';
import {getSliders,getLessons} from '@/api/home';
const actions = {
  setCurrentCategory(currentCategory:string):AnyAction{
    return {type:types.SET_CURRENT_CATEGORY,payload:currentCategory};
  },
  getSliders(){
    return {//redux-promise
      type:types.GET_SLIDERS,
      payload:getSliders()
    }
  },
  getLessons(){//获取下一页的课程数据
   return function(dispatch:Function,getState:Function){
    (async function(){
      let {currentCategory,lessons:{hasMore,offset,limit,loading}}=getState().home;
      //如果的确有更多的数据，并且不是处于加载中的话,就可以加载数据了
      if(hasMore && !loading){
        dispatch({type:types.SET_LESSONS_LOADING,payload:true});//加载状态改为true        
        let result = await getLessons(currentCategory,offset,limit);
        dispatch({type:types.SET_LESSONS,payload:result.data});//设置新的课程数据
      }
    })();
   }
  },
  refreshLessons(){//重新获取第一页的数据，读取最新的分类
   return function(dispatch:Function,getState:Function){
    (async function(){
      let {currentCategory,lessons:{limit,loading}}=getState().home;
      //如果的确有更多的数据，并且不是处于加载中的话,就可以加载数据了
      if(!loading){
        dispatch({type:types.SET_LESSONS_LOADING,payload:true});//加载状态改为true        
        let result = await getLessons(currentCategory,0,limit);
        dispatch({type:types.REFRESH_LESSONS,payload:result.data});//设置新的课程数据
      }
    })();
   }
  }
}
export default actions;