import React from 'react';

class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotData: [{path:"",title:"想不到吧！13 个电影中想不到吧！13 个电影中的良心细节的良心细节",author:"央视网",createAt:"六小时前"}],
            topSearchList:[{searchPath:"",keyword:"故宫首次晚间开放"}],
        }
    }
    handleInputOnFocus= (e) =>{
        var oSearchIcon = document.getElementById('searchIcon');
        oSearchIcon.style.width=0+'px';
        e.target.style.width=166+'px';
        e.target.style.marginLeft=30+'px';
    }
    handleInputOnBlur= (e) =>{
        var oSearchIcon = document.getElementById('searchIcon');
        oSearchIcon.style.width=42+'px';
        e.target.style.width=145+'px';
        e.target.style.marginLeft=52+'px';
    }
    handleGetInputValue=(e)=>{
        this.setState({
            searchInfo : e.target.value,
        })
    }
    handleSearch= ()=>{
        const {searchInfo} = this.state;
        console.log(searchInfo,'Search------searchInfo');
        //put数据
        //跳转页面
        window.location.href=`/search?keyword=${searchInfo}`

    }
    render() {
        return (
            <div id="aside" className="aside">
                <div className="search_container">
                    <input className="search"  type="text" placeholder="搜索资讯"
                           onFocus={this.handleInputOnFocus}
                           onBlur={this.handleInputOnBlur}
                           onChange={this.handleGetInputValue}
                    />
                    <div className="search_icon" id="searchIcon"></div>
                    <div className="search_btn" onClick={this.handleSearch}>搜索</div>
                    <div className="search_assist_list"></div>
                </div>
                <div className="channel">
                    <h3 className="channel_title">为您推荐</h3>
                    <div className="channel_list">
                        <ul className="channel_list_show">
                            {
                                this.state.hotData.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            <a href={item.path} title={item.title}>{item.title}</a>
                                            <div className="channel_subtitle">
                                                <span>{item.author}</span>
                                                <span>{item.createAt}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="topSearch">
                        <div className="channel_title">热搜榜</div>
                        {
                            this.state.topSearchList.map((item,index)=>{
                                return(
                                    <span key={index} style={{float:"left"}}>
                                                <a href={item.searchPath} title={item.keyword} target="_blank">{item.keyword}</a>
                                            </span>
                                )
                            })
                        }
                        <div style={{clear:"both"}}></div>
                    </div>
                    <div className="aboutLn">
                        <div className="channel_title">关于LightNews</div>
                        <div className="about_warp">
                            <div className="about_box">
                                <a href="#" target="_blank">
                                    <div className="about_bg"></div>
                                    <div className="about_title">关于LightNews</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Aside;
