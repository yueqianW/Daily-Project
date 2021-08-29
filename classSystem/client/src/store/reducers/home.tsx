import { AnyAction } from "redux";
import * as types from '../action-types';
import Slider from '@/typings/slider';
import Lesson from '@/typings/lesson';
export interface Lessons{
   loading:boolean;//是否处于加载中
   list:Lesson[],//课程的数组
   hasMore:boolean,//是否有更多数据 是不是最后一页了
   offset:number,//取的时候偏移量
   limit:number//每页的条数
}
export interface HomeState{
    title:string;
    currentCategory:string;
    sliders:Slider[],
    lessons:Lessons
}
const initialState:HomeState = {
  title:'首页',
  currentCategory:'all',
  sliders:[],
  lessons:{
    loading:false,//是否处于加载中
    list:[],//课程的数组
    hasMore:true,//是否有更多数据 是不是最后一页了
    offset:0,//取的时候偏移量
    limit:5//每页的条数
  }
}
function reducer(state:HomeState=initialState,action:AnyAction):HomeState{
  switch(action.type){
  case types.SET_CURRENT_CATEGORY:
    return {...state,currentCategory:action.payload};
  case types.GET_SLIDERS:
    return {...state,sliders:action.payload.data};  
  case types.SET_LESSONS_LOADING:
    return {...state,lessons:{...state.lessons,loading:action.payload}};
  case types.SET_LESSONS:
    return {...state,lessons:{...state.lessons,
      loading:false,
      hasMore:action.payload.hasMore,
      list:[...state.lessons.list,...action.payload.list],
      //从返回的条数计算下一次的offset值
      offset:state.lessons.offset+action.payload.list.length
    }};  
  case types.REFRESH_LESSONS:
      return {...state,lessons:{...state.lessons,
        loading:false,
        hasMore:action.payload.hasMore,
        list:action.payload.list,
        offset:action.payload.list.length
      }};   
  default:
    return state;
  }
}
export default reducer;