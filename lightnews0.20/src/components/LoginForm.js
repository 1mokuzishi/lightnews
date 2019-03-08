import React from 'react';
import {Form, Input, Button, Checkbox,} from 'antd';

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('从登录表单接收的数据 ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号码!' }],
                    })(
                        <Input style={{ width: '100%' }} placeholder="电话" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码' }],
                    })(
                        <Input  type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                        登 录
                    </Button>
                    Or <a href="">注 册</a>
                </Form.Item>
            </Form>
        )
    }
}

export default LoginForm;
