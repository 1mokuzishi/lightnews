import React from 'react';
import {Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button,} from 'antd';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('从注册表单接收的信息 ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            wrapperCol: {
                span: 24 ,
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 24,
                offset: 0,
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号码!' }],
                    })(
                        <Input style={{ width: '100%' }} placeholder="电话" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input placeholder="昵称" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请验证你的密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} placeholder="验证密码"/>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我已阅读并同意用户协议</Checkbox>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>注册</Button>Or <a href="/login">登录</a>
                </Form.Item>
            </Form>
        )
    }
}

export default RegisterForm;
