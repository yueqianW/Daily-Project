
import React from 'react';
import './index.less';
import Lesson from '@/typings/lesson';
import {Link} from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons';
import {Lessons} from '@/store/reducers/home';
import {Card,Skeleton,Button,Alert} from 'antd';
interface Props{
    lessons:Lessons,
    getLessons:any,
    homeContainerRef:any
}
interface VisibleLesson extends Lesson{
    index:number;
}
function LessonList(props: Props,lessonListRef:any) {
    //强制更新的方法 类组件里forceUpdate,函数组件里只能模拟一个 +1的目的是为了让值改变
    const [,forceUpdate] = React.useReducer(x=>x+2,0);
    lessonListRef.current = forceUpdate;
    React.useEffect(()=>{
        if(props.lessons.list.length === 0){//如果传过来的课程列表为空
            props.getLessons();//请求加载一次
        }
    },[]);
   let start =0,end=0;//主要是要计算起始索引和结束的索引
   let homeContainer = props.homeContainerRef.current;
   let remUnit:number = parseFloat(document.documentElement.style.fontSize);//真实的rem值
   let itemSize = (650/75)*remUnit;//每个条目的高度 rem的值 325 
   let screenHeight=window.innerHeight -(222/75)*remUnit;//屏幕的高度 header+footer总高度
   if(homeContainer){
     const scrollTop =  homeContainer.scrollTop;//获取容器向上卷去的高度
     start = Math.floor(scrollTop /itemSize);//要显示的条目的起始索引
     end = start + Math.floor(screenHeight/itemSize);//10
     start -=2,end +=2;//缓存的条目
     start  = start<0?0:start;//如果少于0的就取0
     end = end > props.lessons.list.length?props.lessons.list.length:end;//如果已经 大于最后一条了，取最后一条
   }
   //第一次的第1条到第12条
   let visibleList = props.lessons.list.map((item:Lesson,index:number)=>({...item,index})).slice(start,end);
   let cardStyle:React.CSSProperties = {position:'absolute',top:0,left:0,width:'100%',height:itemSize};
   let bottomTop = props.lessons.list.length*itemSize;
   return (
       <section className="lesson-list">
        <h2><MenuOutlined/>全部课程</h2>
        <Skeleton
           loading={props.lessons.list.length === 0 && props.lessons.loading}
           active
           paragraph={{rows:8}} 
        >
        <div style={{position:'relative',width:'100%',height:`${props.lessons.list.length*itemSize}px`}}>
         {
            visibleList.map((lesson:VisibleLesson,index:number)=>(
                <Link 
                  key={lesson.id} 
                  to={{pathname:`/detail/${lesson.id}`,state:lesson}}
                  style={{...cardStyle,top:`${itemSize*lesson.index}px`}}
                  >
                    <Card hoverable={true} style={{width:'100%'}} 
                        cover={<img src={lesson.poster}/>}
                    >
                        <Card.Meta title={lesson.title} description={`价格:¥${lesson.price}元`}/>
                    </Card>
                </Link>
            ))
          }
          {
              props.lessons.hasMore?(
                  <Button style={{textAlign:'center',top:`${bottomTop}px`}} onClick={props.getLessons} loading={props.lessons.loading} type="primary" block>{props.lessons.loading?'':'加载更多'}</Button>
              ):(<Alert style={{textAlign:'center',top:`${bottomTop}px`}} message='我是有底线的' type='warning'/>)
          }
        </div>
        </Skeleton>
        
       </section>
   )     
}
export default React.forwardRef(LessonList);