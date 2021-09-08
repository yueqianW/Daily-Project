import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8899';
axios.defaults.headers.post['Content-Type']="application/json;charset=utf8";
//在每次请求服务器的时候，都要把sessionStorage 存放的token通过Authorization发给服务器
axios.interceptors.request.use((config)=>{
    let token = sessionStorage.getItem('token');
    config.headers=config.headers||{};
    config.headers['Authorization']=`Bearer ${token}`;
    return config;
},(error)=>{
    return Promise.reject(error);
});

//响应拦截器
//response data headers
axios.interceptors.response.use(
    response=>response.data,
    error=>Promise.reject(error)
);
export default axios