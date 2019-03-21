import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import util from '../../lib/util'
import reqwest from 'reqwest'
import config from '../../config'


class ModInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err:[],
            user:{},
        }
    }
    componentDidMount(){
        let token = util.getItem('jwt-token');
        reqwest({
            url: `${config.url}/api/user`,
            method: "get",
            headers: {'Authorization': token},
            success: (result) => {
                if (result.message !== "token expired") {
                    this.setState({
                        user: result.user,
                    })
                }else{
                    window.location.href='/home'
                }
            }
        })
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
        let phone = e.target.value||e.target.placeholder;
        let regExp=/^1[34578]\d{9}$/;
            this.delError("电话不能为空。")
            if(regExp.test(phone)){
                this.delError("电话格式错误。")
                this.setState({
                    phone:phone
                })
            }else{
                this.addError("电话格式错误。")
            }

    }
    handleNickname=(e)=>{
        let nickName = e.target.value||e.target.placeholder;
            if(nickName.length<13){
                this.delError("昵称长度不能超过12个字符。")
                this.setState({
                    nickname:nickName
                })
            }else{
                this.addError("昵称长度不能超过12个字符。")
            }
    }
    handleBirth=(date, dateString)=>{
        this.setState({
            birth:dateString
        })
    }
    handleIndustry=(e)=>{
        let industry = e.target.value||e.target.placeholder;
        if(industry){
            this.delError("行业不能为空。")
            this.setState({
                industry:industry
            })
        }else{
            this.addError("行业不能为空。")
        }

    }
    handleCancel=()=>{
        let oDialog = document.getElementsByClassName('dialog_root')[0];
        oDialog.style.display="none"
    }
    handleSubmit=()=>{
        var user = this.state.user;
        let tmpUser={
            phone:this.state.phone||user.phone,
            industry:this.state.industry||user.industry,
            nickname:this.state.nickname||user.nickname,
            birth:this.state.birth||user.birth
        }
        let token = util.getItem('jwt-token');
        reqwest({
            url: `${config.url}/api/modInfo`,
            method: "post",
            headers: {'Authorization': token},
            data:tmpUser,
            success: (res) => {
                if(res.message === "Mod information success!")
                {
                    window.location.href="/home"
                }else{
                    console.log(res.message)
                }

            }
        })
    }
    render() {
        const {err} = this.state;
        const {user} = this.state;
        return (
            <div className="mod_info_root ys_form">
                <div className="ys_input">
                    <label htmlFor="phone">电话：</label>
                    <input  type="text " name="phone" placeholder={user.phone} onBlur={this.handlePhone}/>
                </div>
                <div className="ys_input">
                    <label htmlFor="nickname">昵称：</label>
                    <input  type="text " name="nickname" placeholder={user.nickname} onBlur={this.handleNickname}/>
                </div>
                <div className="ys_input">
                    <label>生日：</label>
                    <DatePicker defaultValue={moment('2010-05-06','YYYY-MM-DD')} onChange={this.handleBirth} />
                </div>
                <div className="ys_input">
                    <label htmlFor="industry">行业：</label>
                    <input  type="text " name="industry" placeholder={user.industry} onBlur={this.handleIndustry}/>
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
                <div className="ys_input">
                    <div className="ys_buttons" onClick={this.handleCancel}>取消</div>
                    <div className="ys_buttons" disabled={this.state.disabled}
                         onClick={this.handleSubmit}
                    >确定</div>
                </div>
            </div>
        )
    }
}

export default ModInfo;
