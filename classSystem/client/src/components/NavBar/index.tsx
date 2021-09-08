import React,{PropsWithChildren} from 'react';
import './index.less';
import {LeftOutlined} from '@ant-design/icons';
import {withRouter,RouteComponentProps} from 'react-router-dom';
type Props = PropsWithChildren<RouteComponentProps>;
function NavBar(props:Props){
    return (
        <div className="nav-header">
            <LeftOutlined onClick={()=>props.history.goBack()}/>
            {props.children}
        </div>
    )
}
export default withRouter(NavBar);