import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div className="ys-root main flex-block">
                <div className="ys_brand">
                    <h2>登录你的LightNews账号</h2>
                    <p>登录成功后,你可以使用LightNews应用</p>
                    <div className="line"></div>
                </div>
                <div className="ys_box">
                    <h3 >登录</h3>
                    <LoginForm/>
                </div>
            </div>
        )
    }
}

export default Login;
