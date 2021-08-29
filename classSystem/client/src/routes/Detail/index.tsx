import React,{PropsWithChildren,useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from 'react-router';
import {RootState} from '@/store/reducers';
import NavBar from '@/components/NavBar';
import {Card} from 'antd';
import {Lesson,LessonResult} from '@/typings/lesson';
import './index.less';
import { getLesson } from '@/api/home';
//type StateProps = ReturnType<typeof mapStateToProps>;
interface Params{//路径参数 /detail/:id = params={}
    id:string
}
type RouteProps = RouteComponentProps<Params,StaticContext,Lesson>;
type Prop =  PropsWithChildren<RouteProps>;
function LessonDetail(props:Prop){
 let [lesson,setLesson]= useState<Lesson>({} as Lesson);
 useEffect(()=>{
    (async function(){
        let lesson:Lesson = props.location.state;
        if(!lesson){
            let id = props.match.params.id;
            let result:LessonResult = await getLesson<LessonResult>(id);
            if(result.success){
                lesson = result.data;
            }
        }
        setLesson(lesson);
    })();
 },[]);   
 return (
     <>
        <NavBar>{lesson.title}</NavBar>
        <Card
           hoverable
           style={{width:'100%'}}
           cover={<video src={lesson.video} controls autoPlay={false}/>}

        >
            <Card.Meta
               title={lesson.title}
               description={<p>价格:{lesson.price}</p>}
            />
        </Card>
     </>
 )
}

export default connect()(LessonDetail);