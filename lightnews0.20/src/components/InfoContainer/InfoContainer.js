import React from 'react';
import './index.css'
import util from '../../lib/util'
import reqwest from 'reqwest'

class InfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
            visible: false
        }
    }
    componentDidMount() {
        let token = util.getItem('jwt-token');
        reqwest({
            url: "http://localhost:8000/api/user",
            method: "get",
            headers: {'Authorization': token},
            success: (result) => {
                if (result.message != "token expired") {
                    this.setState({
                        user: result.message,
                    })
                }
            }
        })
    }
    handleMod=()=>{
        this.setState({
            visible: true,
        });
        console.log('1111')
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const {user} = this.state
        return (
            <div className="info_container main flex-block">
                <h3 className="title">个人资料</h3>
                <div className="user_info flex-block">
                    <div className="avatar">
                        <img src="https://profile.csdnimg.cn/2/B/3/1_qq_29002631" alt=""/>
                        <p>修改头像</p>
                    </div>
                    <div className="right">
                        <div className="info_item flex-block flex_row_between">
                            <span>昵称：{user.nickname}</span>
                            <span className="mod_name" onClick={this.handleMod}>修改资料</span>
                        </div>
                        <div className="info_item">
                            <span>生日：{user.birth}</span>
                        </div>
                        <div className="info_item">
                            <span>地区：{user.region}</span>
                        </div>
                        <div className="info_item">
                            <span>行业：{user.industry}</span>
                        </div>
                        <div className="info_item">
                            <span>感兴趣标签：{user.keyword}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoContainer;
