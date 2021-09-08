import React from 'react';
import './index.less';
import { BarsOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.png';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';//react官方动画库
interface Props {
  currentCategory: string;//表示当前的选中的分类，这个值将会被存在在redux中
  setCurrentCategory: (currentCategory: string) => void,
  refreshLessons:Function
}

const duration = 1000;//动画持续的时间
const defaultStyle = {//默认样式
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}
interface TransitionStyles{
  entering: React.CSSProperties,
  entered: React.CSSProperties,//CSS的行内属性
  exiting: React.CSSProperties,
  exited: React.CSSProperties,
}
const transitionStyles:TransitionStyles = {
  entering: { opacity: 1},
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function HomeHeader(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    const target: HTMLUListElement = event.target as HTMLUListElement;//获取事件源对象
    const category = target.dataset.category;//获取事件源对象对应的自定义属性的值 all react vue
    props.setCurrentCategory(category);
    props.refreshLessons();//刷新课程
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo} />
        <BarsOutlined onClick={() => setIsMenuVisible(true)} />
      </div>
      <Transition
        in={isMenuVisible}
        timeout={duration}
      >
        {
          (stage:keyof TransitionStyles) => {
            return (
              <ul
                className="category"
                onClick={setCurrentCategory}
                style={
                  {
                    ...defaultStyle,
                    ...transitionStyles[stage]
                  }
                }
              >
                <li data-category="all" className={
                  classnames({
                    active: props.currentCategory === 'all'
                  })
                }>全部</li>
                <li data-category="react" className={
                  classnames({
                    active: props.currentCategory === 'react'
                  })
                }>react</li>
                <li data-category="vue" className={
                  classnames({
                    active: props.currentCategory === 'vue'
                  })
                }>vue</li>
              </ul>
            )
          }
        }
      </Transition>


    </header>
  )
}
export default HomeHeader;
/**
 * 课程数据一共是20条
 * 10条react
 * 10条vue
 */