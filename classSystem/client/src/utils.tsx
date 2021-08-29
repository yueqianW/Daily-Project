

export function loadMore(element:HTMLDivElement,callback:Function){
    function _loadMore(){
        let clientHeight = element.clientHeight;//容器的高度
        let scrollTop = element.scrollTop;//内容向上卷去的高度
        let scrollHeight = element.scrollHeight;//内容的高度
        if(clientHeight + scrollTop + 10>=scrollHeight){
            callback();
        }
    }
    element.addEventListener('scroll',debounce(_loadMore,100));
}
//防抖
export function debounce(callback:Function,wait:number){
  var timeout:any;
  return function(){
      if(timeout)clearTimeout(timeout);
      timeout = setTimeout(callback,wait);
  }
}
/**
 * 下拉刷新
 * element 容器
 * callback刷新数据的函数
 */
export function downRefresh(element:HTMLDivElement,callback:Function){
  let startY:number;//变量，存放下拉时候起始纵坐标
  let distance:number;//本次下拉的距离
  let originalTop = element.offsetTop;//在初始状态下元素距离顶部的距离 初始top值
  let startTop:number;
  let $timer:any;
  //touchStart touchMove touchEnd
  element.addEventListener('touchstart',(event:TouchEvent)=>{
    startTop = element.offsetTop; //元素初始top值
    startY = event.touches[0].pageY;//开始按下的时候的纵坐标
    let touchMove = throttle(_touchMove,30);
    element.addEventListener('touchmove',touchMove);
    element.addEventListener('touchend',touchEnd);
    function _touchMove(event:TouchEvent){
        let pageY = event.touches[0].pageY;//移动过程中最新的纵坐标
        if(pageY > startY){//说明是下拉
            distance = pageY - startY;
            element.style.top = startTop+distance + 'px';
        }else{
            element.removeEventListener('touchmove',touchMove);
            element.removeEventListener('touchend',touchEnd);
        }
    }
    function touchEnd(event:TouchEvent){
        element.removeEventListener('touchmove',touchMove);
        element.removeEventListener('touchend',touchEnd);
        if(distance>50){
            callback();
        }
        function _back(){
            let currentTop = element.offsetTop;
            if(currentTop - originalTop>=1){
                element.style.top = (currentTop-1) + 'px';
                requestAnimationFrame(_back);
            }else{
                element.style.top =originalTop + 'px';
            }
        }
        requestAnimationFrame(_back);
    }
  });
}

export function throttle(func:Function,delay:number){
    let prev = Date.now();
    return function(){
        let context = this;
        let args = arguments;
        let now = Date.now();//每次执行节流函数的时候，取出最新的时间
        if(now  - prev >= delay){//减去上次执行的时候，如果已经超过delay,就再执行一次
            func.apply(context,args);
            prev = now;
        }
    }
}