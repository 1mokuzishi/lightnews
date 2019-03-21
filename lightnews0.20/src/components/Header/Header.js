import React from 'react';
import util from '../../lib/util'
import reqwest from 'reqwest'
import './index.css'
import config from '../../config'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth:false,
            modalIsOpen:'none',
        }
    }
    componentDidMount(){
        let token = util.getItem('jwt-token');
        reqwest({
            url:`${config.url}/api/user`,
            method:"get",
            headers: {'Authorization': token},
            success:(result) =>{
                if(result.message==="token expired"){
                    this.setState({auth : false})
                }else{
                    this.setState({
                        auth:true,
                        user:result.user,
                    })
                }
            }
        })
        window.addEventListener('scroll',this.handleScroll,true);

    }
    handleScroll=(e)=>{
        this.setState({
            modalIsOpen:'none'
        })
    }
    handleMenuOver=(e)=>{
        this.setState({
            modalIsOpen:'block'
        })
    }
    handleMenuOut=(e)=>{
        this.setState({
            modalIsOpen:'none'
        })
    }
    handleUserOver=(e)=>{
        this.setState({
            modalIsOpen: 'block',
        })
    }
    handleUserOut=(e)=>{
            this.setState({
                modalIsOpen: 'none',
            })
    }
    handleExit=()=>{
        util.removeItem('jwt-token');
        window.location.href="/home";
    }
    handle2Home=()=>{
        window.location.href="/home";
    }
    handle2User=()=>{
        window.location.href=`/user`;
    }
    render() {
        const {user} = this.state
        return (
            <div className="header main">
                     <div className="flex_row_between flex-block">
                        <div className="logo" onClick={this.handle2Home}><span>LightNews</span></div>
                         {
                             (this.state.auth === false)?
                                 <div className="sign_container">
                                     <div className="ys_button"><a href="/login">登录</a></div>
                                     <div className="ys_button"><a href="/register">注册</a></div>
                                </div>:
                                 <div className="user_container flex-block flex_row_between">
                                     <div className="ys_avatar"
                                          onMouseOver={this.handleUserOver}
                                          onMouseOut={this.handleUserOut}
                                     >
                                         <img src={user.avatar}/>
                                     </div>
                                     <div className="user_name">{user.nickname}</div>
                                 </div>
                         }
                    </div>
                <div className="menus_warp"
                     style={{display:this.state.modalIsOpen}}
                     onMouseOver={this.handleMenuOver}
                     onMouseOut={this.handleMenuOut}
                >
                    <ul className="menus">
                        <li className="menus_item" onClick={this.handle2User}>个人中心</li>
                        <li className="menus_item" onClick={this.handleExit}>退出</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;
