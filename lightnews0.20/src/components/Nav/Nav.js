import React from 'react';
import './index.css'
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed:false,
            channelList:["首页","科技", "娱乐", "国内", "国际",
            "军事", "财经", "互联网", "教育", "体育", "电影", "游戏", "美食", "本地"]

         }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll,true);
        this.handleActive(this.props.channel)
    }
    componentWillReceiveProps(nextProps){
        this.handleActive(nextProps.channel)
    }
    //改变选中的nav_item
    handleActive=(channelId)=>{
        var oChannel = document.getElementsByClassName('nav_item');
        for(let i = 0,len=oChannel.length; i< len; i++) {
            oChannel[i].classList.remove("nav_item_active");
        }
        oChannel[channelId].classList.add("nav_item_active");
    }

    handleScroll=()=>{
        let scrollTop = document.documentElement.scrollTop;
        if(scrollTop > 80){
            this.setState({
                fixed : true,
            })
        }else{
            this.setState({
                fixed : false,
            })

        }
    }
    render() {
        const { channelList }=this.state
        return (
            <div className={this.state.fixed?"nav fixed":"nav"}>
               <div className="main">
                   <div className="nav_menu flex_row_between flex_block" id="nav">
                       {
                           channelList.map((item, index) => {
                               return <a className="nav_item" key={index} href={`/channel/${index}`}
                                         title={item + "新闻"}>{item}</a>
                           })
                       }
                   </div>
               </div>
            </div>

        )
    }
}

export default Nav;
