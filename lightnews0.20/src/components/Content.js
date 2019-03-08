import React from 'react';

import reqwest from 'reqwest';
import util from '../lib/util'
import Aside from './Aside'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            load:true,
        };
    }
    componentDidMount() {
        console.log(this.props.channel,"content组件的channelId");
        let channel = util.channelId2Name(this.props.channel);
        let url=`http://localhost:8000/api/channel/${channel}?count=20`;//&next_id=${next_id}
        this.getData(url);
        window.addEventListener('scroll', this.handleScroll);
        setInterval(this.handleScroll,2000);
}
    handleScroll=() =>{
            var scrollTop = document.documentElement.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight;
            if(scrollHeight<16000){
                if(scrollTop >0.8*scrollHeight){
                    let next_id = document.getElementById("next_id").getAttribute('next_id');
                    let channel = util.channelId2Name(this.props.channel);
                    let url=`http://localhost:8000/api/channel/${channel}?count=20&next_id=${next_id}`;//&next_id=${next_id}
                    this.getData(url);
                    document.documentElement.scrollTop-=500;
                }
            }else{
                this.setState({
                    load:false,
                })
            }

    }
    getData =(url)=> {
        reqwest({
            url:url,
            method:'get',
            contentType: 'application/json',
            success: (res) => {
                var tmp= [...this.state.list,...res.data]
                this.setState({
                    list: tmp,
                    loading:true
                },()=>{
                    var nextid=this.state.list[this.state.list.length-1]._id;
                    document.getElementById("next_id").setAttribute('next_id',nextid)
                })
            },

        });
    }
    render() {
        var {list} = this.state;
        return (
            <div className="content">
                <div className="main flex-block">
                    <div className="article_container flex-9">
                        {
                            list.map((item,index)=>{
                                return(
                                <div className="figure flex-block " key={index}>
                                    <div className="article flex-1">
                                        <h2 className="figcaption">
                                            <a href={`/article/${item._id}`} title={item.title}>{item.title}</a>
                                        </h2>
                                        <div className="subtitle">
                                            <span>{item.author}</span>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                    {item.img?
                                        <a href="#" alt="" className="img" style={{'backgroundImage':'url(http:'+item.img+')'}}> </a>:""
                                    }

                                </div>
                                )
                            })
                        }
                        <span id="next_id" style={{opacity:0}}></span>
                    </div>
                    <Aside></Aside>
                </div>
                {this.state.load?"":<div className="load_tip">数据加载完毕，请刷新页面获取更多资讯。</div>}
            </div>
        )
    }
}

export default Content;
