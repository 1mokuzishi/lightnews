import React from 'react';
import util from '../../lib/util'
import './index.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
    }
    componentDidMount(){
        /*let token=util.getItem("ggsimida");
        return {
            isLogin:!!token,
            token:token
        }*/

    }

    render() {
        return (
            <div className="header">
                <div className="main">
                     <div className="flex_row_between flex-block">
                        <div className="logo"><span>LightNews</span></div>
                             <div className="sign_container">
                                 <div className="ys_button"><a href="/login">登录</a></div>
                                 <div className="ys_button" ><a href="/register">注册</a></div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
