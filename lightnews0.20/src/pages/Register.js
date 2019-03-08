import React from 'react';

import {Form} from 'antd';

import RegisterForm from '../components/RegisterForm'
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        const WrappedRegistrationForm = Form.create({ name: 'register' })(RegisterForm);
        return (
            <div className="register-root main">
                <div className="container_bg"></div>
                <div className="register_brand">
                    <h2>创建你的LightNews账号</h2>
                    <p>注册成功后,你可以使用LightNews应用</p>
                    <div className="line"></div>
                </div>
                <div className="register_box">
                    <h3 className="form_title">注册</h3>
                    <WrappedRegistrationForm />
                </div>
            </div>
        )
    }
}
export default Register;