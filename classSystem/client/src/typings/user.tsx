
//在调用后台注册接口的时候，传递的对象
export interface RegisterPayload{
    username:string;
    password:string;
    email:string;
    confirmPassword:string;    
}


//在调用后台登录接口的时候，传递的对象
export interface LoginPayload{
    username:string;
    password:string;
}



export interface BaseResult{
    success:boolean
    message?:string;
}

//注册接口返回的结果的类型
export interface RegisterResult extends BaseResult{
    data?:{token:string};
}

//注册接口返回的结果的类型
export type LoginResult = BaseResult&{
    data?:{token:string},
}

export interface User{
    id:string;
    username:string;
    password:string;
    email:string;
    avatar:string;
}

