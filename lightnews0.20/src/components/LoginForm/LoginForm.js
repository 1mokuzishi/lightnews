import React from 'react';
import reqwest from 'reqwest';
import util from "../../lib/util";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:"",
            password:"",
            err:[],
        }
    }
    handleSubmit = () => {
        let user = {phone:this.state.phone,password:util.encode(this.state.password)}
        reqwest({
                url:"http://localhost:8000/api/authenticate",
                method:'post',
                data: user,
                success: (res) => {
                if(res === "用户不存在。"){
                    this.addError(res);
                    this.delError("密码错误。");
                }else if(res === "密码错误。"){
                    this.addError(res);
                    this.delError("用户不存在。");
                }else{
                    //跳转回主页面
                    this.delError("用户不存在。");
                    this.delError("密码错误。");
                    util.setItem('jwt-token',res.token)
                    window.location.href="/home"
                }
            },
        });
    }
    addError=(err)=>{
        let tmp =new Set([...this.state.err,err])
        this.setState({
            err:Array.from(tmp)
        },()=>{
            if(this.state.err.length === 1){
                let oDiv = document.getElementsByClassName("ys_form_error");
                oDiv[0].classList.add('show');
            }
        })
    }
    delError=(err)=>{
        let tmp  = this.state.err;
        let index = tmp.indexOf(err) ;
        if(index>-1){
            tmp.splice(index,1);
            this.setState({
                err:tmp,
            },()=>{
                if(this.state.err.length === 0){
                    let oDiv = document.getElementsByClassName("ys_form_error");
                    oDiv[0].classList.remove('show');
                }
            })
        }

    }
    handlePhone = (e)=>{
        let phone = e.target.value;
        let regExp=/^1[34578]\d{9}$/;
        if(phone){
            this.delError("电话不能为空。")
            if(regExp.test(phone)){
                this.delError("电话格式错误。")
                this.setState({
                    phone:phone
                })
            }else{
                this.addError("电话格式错误。")
            }
        }else{
            this.addError("电话不能为空。")
        }
    }
    handlePassword=(e)=>{
        let password = e.target.value;
        if(password) {
            this.delError("密码不能为空。")
            this.setState({
                password:password
            })
        }else{
            this.addError("密码不能为空。")
        }

    }
    render() {
        let {err} = this.state;
        return (
            <div className="ys_form login_root" >
                <div className="ys_input">
                    <input  type="number " name="phone" placeholder="电话" onBlur={this.handlePhone}/>
                </div>
                <div className="ys_input">
                    <input  type="password" name="password" placeholder="密码" onChange={this.handlePassword}/>
                </div>
                <div className="ys_input">
                    <div className="ys_form_error" >
                        <span className="iconfont">!</span>
                        <ul id="error">
                            {err.map((item,index)=>{
                                return <li key={index}>{item}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="ys_input" >
                    <span>如果还没有账号，请</span><a href="/register">注册</a>
                </div>
                <div className="ys_input">
                    <div className="ys_button" onClick={this.handleSubmit}>登录</div>
                </div>

            </div>
        )
    }
}


export default LoginForm;
