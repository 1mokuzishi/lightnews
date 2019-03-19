import React from 'react';
import Header from '../components/Header/Header'
import InfoContainer from '../components/InfoContainer/InfoContainer'
import Footer from '../components/Footer/Footer'
import Dialog from "../components/Dialog/Dialog";
import util from '../lib/util'
import reqwest from 'reqwest'

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"修改资料",
            user:{}
        }
    }
    componentDidMount(){
        let oMod = document.getElementById('avatar_mod');
        let oInfo = document.getElementById('info_mod');
        oMod.addEventListener("click",this.handleAvaMod)
        oInfo.addEventListener("click",this.handleInfoMod)
        let token = util.getItem('jwt-token');
        reqwest({
            url: "http://localhost:8000/api/user",
            method: "get",
            headers: {'Authorization': token},
            success: (result) => {
                if (result.message !== "token expired") {
                    this.setState({
                        user: result.message,
                    })
                }else{
                    window.location.href='/home'
                }
            }
        })

    }
    handleAvaMod=()=>{
        let oDialog = document.getElementsByClassName('dialog_root')[0];
        oDialog.style.display="block"
        this.setState({
            title:"修改头像"
        })
    }
    handleInfoMod=()=>{
        let oDialog = document.getElementsByClassName('dialog_root')[0];
        oDialog.style.display="block"
        this.setState({
            title:"修改资料"
        })
    }


    render() {
        return (
            <div className="user_root">
                <Dialog tdata={this.state.title} user={this.state.user}/>
                <Header/>
                <InfoContainer user={this.state.user}/>
                <Footer/>
            </div>
        )
    }
}

export default User;
