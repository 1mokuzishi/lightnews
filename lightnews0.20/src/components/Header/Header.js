import React from 'react';
import { Button } from 'antd';
import "antd/dist/antd.css";
import './index.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="header">
                <div className="main">
                     <div className="flex_row_between flex-block">
                        <div className="logo"><span>LightNews</span></div>
                             <div className="sign_container">
                                 <Button  href="/login" style={{ marginRight: '15px' }}>登录</Button>
                                 <Button  href="/register" style={{ marginRight: '15px' }}>注册</Button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
