import React from 'react';
import './index.css'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
                phone:"",
                password:""
            }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();

    }
    addError=(err)=>{
       let oErr = document.getElementById("error");
       let oDiv = document.getElementsByClassName("ys_form_error");
       let newErr = document.createElement('li');
       oDiv[0].classList.add('ys_form_error_show');
       newErr.innerText=`${err}`;
       oErr.appendChild(newErr);
    }
    handlePhone = (e)=>{
        let phone = e.target.value;
        let regExp=/^1[34578]\d{9}$/;
        if(!phone){
            if(!regExp.test(phone)){
                this.addError("电话格式错误。")
            }else{
                this.setState({
                    user:{phone:phone}
                })
            }
        }else{
            this.addError("电话不能为空。")
        }

    }
    handlePassword=(e)=>{
        let password = e.target.value;
        this.setState({
            user:{password:password}
        })
    }
    handlesPassword=(e)=>{
        let password=this.state.user.password;
        let spassword = e.target.value;
        if(password){
            if(spassword !== password){
                this.addError("两次密码不相同。")
            }
        }else{
            this.addError("密码不能为空。")
        }

    }
    render() {
        return (
            <form action="" method="post">
                <div className="ys_input">
                    <input  type="number " name="phone" placeholder="电话" onBlur={this.handlePhone}/>
                </div>
                <div className="ys_input">
                    <input  type="password" name="password" placeholder="密码" onBlur={this.handlePassword}/>
                </div>
                <div className="ys_input">
                    <input  type="password" name="spassword" placeholder="密码确认" onBlur={this.handlesPassword}/>
                </div>
                <div className="ys_input">
                    <div className="ys_form_error" >
                        <span className="iconfont">!</span>
                        <ul id="error">
                        </ul>
                    </div>
                </div>
                <div className="ys_input" >
                    <span>如果已有账号，请</span><a href="">登录</a>
                </div>
                <div className="ys_input">
                    <div className="ys_button">注册</div>
                </div>

            </form>
        )
    }
}

export default RegisterForm;
