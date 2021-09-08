import React,{PropsWithChildren, useEffect} from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {RootState,ProfileState} from '@/store/reducers';
import './index.less';
import NavBar from '@/components/NavBar';
import actions from '@/store/actions/profile';
import {message,Descriptions,Button,Alert,Upload} from 'antd';
import {AxiosError} from 'axios';
import LOGIN_TYPES from '@/typings/login-types';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
//UploadChangeParam
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Prop =  PropsWithChildren<RouteComponentProps> & StateProps&DispatchProps;
function Profile(props:Prop){
  let [loading,setLoading] = React.useState(false);//标志符 表示是否处于上传中的状态
  useEffect(()=>{
    props.validate().catch((error:AxiosError)=>message.error(error.message));
  },[]);
  const handleChange  = (info:any)=>{
    if(info.file.status === 'uploading'){
      setLoading(true);//设置为上传中
    }else if(info.file.status === 'done'){
      let {success,data,message} = info.file.response;
      if(success){
        setLoading(false);
        props.changeAvatar(data);//修改store中用户的头像 
      }else{
        message.error(message);
      }
    }
  }
  let content=null;
  if(props.loginState === LOGIN_TYPES.UN_VALIDATE){
    //什么都不做，还是null
  }else if(props.loginState === LOGIN_TYPES.LOGINED){
    const uploadButton = (
      <div>
        {
          loading?<LoadingOutlined/>:<UploadOutlined/>
        }
        <div className="ant-upload-text">上传</div>
      </div>
    )
    content = (
      <div className="user-info">
        <Descriptions>
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
               name="avatar"
               listType="picture-card"
               className="avatar-upload"
               showUploadList={false}
               action="http://localhost:8899/user/uploadAvatar"
               beforeUpload={beforeUpload}
               data={{userId:props.user.id}}
               onChange={handleChange}
            >
              {
                props.user.avatar?(<img src={props.user.avatar} alt="avatar" style={{width:'100%'}}/>):uploadButton
              }
            </Upload>
          </Descriptions.Item>
        </Descriptions>

        <Button type="primary" onClick={()=>props.logout()}>退出登录</Button>
      </div>
    )
  }else if(props.loginState === LOGIN_TYPES.UNLOGIN){
    content = (
      <>
        <Alert
         type="warning"
         message="当前用户尚未登录"
         description="亲爱的用户你好，请选择注册或者登录"
        />
        <div style={{textAlign:'center',padding:'50px'}}>
          <Button type="dashed" onClick={()=>props.history.push('/login')}>登录</Button>
          <Button type="dashed" onClick={()=>props.history.push('/register')}>注册</Button>
        </div>
      </>
    )
  }
  return (
    <section className="profile">
      <NavBar >个人中心</NavBar>
      {content}
    </section>
  )
}
//选 中文件上传前执行一个较验，验证文件大小和文件的类型
function beforeUpload(file:any){
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
   if(!isJpgOrPng){
    message.error('你只能上传JPG/PNG格式的文件');
   }
   const isLessThan2M = file.size /1024/1024 <= 2;
   if(!isLessThan2M){
    message.error('你只能上传小于2M的文件');
   }
   return isJpgOrPng&&isLessThan2M;
}
function mapStateToProps(state:RootState):ProfileState{
  return state.profile;
}
export default connect(mapStateToProps,actions)(Profile);