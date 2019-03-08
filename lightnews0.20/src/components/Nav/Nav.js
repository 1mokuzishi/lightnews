import React from 'react';
import './index.css'
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed:false,
            channelList: [
                {title: "科技", url: "/channel/1"},
                {title: "娱乐", url: "/channel/2"},
                {title: "国内", url: "/channel/3"},
                {title: "国际", url: "/channel/4"},
                {title: "军事", url: "/channel/5"},
                {title: "财经", url: "/channel/6"},
                {title: "互联网", url: "/channel/7"},
                {title: "教育", url: "/channel/8"},
                {title: "体育", url: "/channel/9"},
                {title: "电影", url: "/channel/10"},
                {title: "游戏", url: "/channel/11"},
                {title: "美食", url: "/channel/12"},
                {title: "本地", url: "/channel/13"}]
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll,true);
        console.log(this.props.channel,"nav组件中的channelId")
        this.handleActive(this.props.channel)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.channel,"nav组件中的channelId")
        this.handleActive(nextProps.channel)
    }
    //改变选中的nav_item
    handleActive=(channelId)=>{
        var oChannel = document.getElementById("nav").getElementsByTagName('a');
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
                       <a className="nav_item" href="/home" title="新闻首页">首页</a>
                       {
                           channelList.map((item, index) => {
                               return <a className="nav_item" key={index} href={item.url}
                                         title={item.title + "新闻"}>{item.title}</a>
                           })
                       }
                   </div>
               </div>
            </div>

        )
    }
}

export default Nav;
