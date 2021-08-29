export default interface Lesson{
    id:string;
    order: number,//顺序
    title: string,//标题
    video: string,//视频地址
    poster: string,//海报地址
    url: string,//URL地址
    price: string,//价格
    category: string,//所属的分类
}
//服务器接口返回的数据
interface LessonResult{
    data:Lesson,
    success:boolean
}
export {
    Lesson,
    LessonResult
}
//因为上传的type我们是用hook状态。没有放到redux仓库中