
import React from 'react';
import './index.less';
import {Carousel} from 'antd';
import Slider from '@/typings/slider';
interface Props{
    sliders:Slider[],
    getSliders:Function
}
function HomeSliders(props: Props) {
    React.useEffect(()=>{
        if(props.sliders.length === 0){//如果传过来的轮播数组为空
            props.getSliders();//请求加载一次
        }
    },[]);
   return (
       <Carousel effect={"scrollx"} autoplay>
           {
               props.sliders.map((slider:Slider,index:number)=>(
                <div id={slider.url}>
                    <img src={slider.url}/>
                </div>
               ))
           }
       </Carousel>
   )     
}
export default HomeSliders;