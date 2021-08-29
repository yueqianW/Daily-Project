import React,{PropsWithChildren} from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {RootState, ProfileState} from '@/store/reducers';
import Navbar from '@/components/NavBar';
import {UserAddOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import { LoginPayload, LoginResult, RegisterPayload, RegisterResult } from '@/typings/user';
import './index.less';
import {Form,Input,Button,message} from 'antd';
import actions from '@/store/actions/profile';
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Prop =  PropsWithChildren<RouteComponentProps> & StateProps & DispatchProps;
function Register(props:Prop){
  const onFinish = (values:RegisterPayload)=>{
    props.register(values);
  }
  const onFinishFailed = (errorInfo:any)=>{
    message.error('表单验证失败'+errorInfo);
  }
  return (
    <>
      <Navbar>注册</Navbar>
      <Form
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
       className="register-form"
      >
        <Form.Item label="用户名" name="username" rules={[{required:true,message:'请输入你的用户名'}]}>
          <Input prefix={<UserAddOutlined/>} placeholder="用户名"/>
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{required:true,message:'请输入你的密码'}]}>
          <Input prefix={<LockOutlined/>} placeholder="密码"/>
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={[{required:true,message:'请输入你的确认密码'}]}>
          <Input prefix={<LockOutlined/>} placeholder="确认密码"/>
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{required:true,message:'请输入你的邮箱'}]}>
          <Input prefix={<MailOutlined/>} placeholder="邮箱"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-submit">注册</Button>
        </Form.Item>
      </Form>
    </>
  )
}
function mapStateToProps(state:RootState):ProfileState{
  return state.profile;
}
export default connect(mapStateToProps,actions)(Register);