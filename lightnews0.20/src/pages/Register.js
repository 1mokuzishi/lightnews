import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm'
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <div className="ys-root main flex-block">
                <div className="ys_brand">
                    <h2>创建你的LightNews账号</h2>
                    <p>注册成功后,你可以使用LightNews应用</p>
                    <div className="line"></div>
                </div>
                <div className="ys_box">
                    <h3 >注册</h3>
                    <RegisterForm/>
                </div>
            </div>
        )
    }
}
export default Register;