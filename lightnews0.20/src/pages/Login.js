import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div className="login-root main">
                <div className="container_bg"></div>
                <div className="brand">
                    <h2>登录你的LightNews账号</h2>
                    <p>登录成功后,你可以使用LightNews应用</p>
                    <div className="line"></div>
                </div>
                <div className="login_box">
                    <h3 className="form_title">登录</h3>
                </div>
            </div>
        )
    }
}

export default Login;
