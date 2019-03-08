import React from 'react';
import reqwest from 'reqwest';
import util from '../../lib/util'
import Aside from '../Aside/Aside'
import './index.css'
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            pages:0,
        };
    }
    componentDidMount() {
        console.log(this.props.channel,"content组件的channelId");
        let channel = util.channelId2Name(this.props.channel);
        let url=`http://localhost:8000/api/channel/${channel}?count=20`;//&next_id=${next_id}
        this.getData(url);
    }
    handleMore = (e)=>{
        let channel = util.channelId2Name(this.props.channel);
        let nextId = e.target.getAttribute('next_id');
        let url=`http://localhost:8000/api/channel/${channel}?count=20&next_id=${nextId}`;//
        this.getData(url)
    }

    getData =(url)=> {
        reqwest({
            url:url,
            method:'get',
            contentType: 'application/json',
            success: (res) => {
                let tmp= [...this.state.list,...res.data];
                let pages=this.state.pages++;
                this.setState({
                    list: tmp,
                    pages:pages
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
                    </div>
                    <Aside></Aside>
                </div>
                {this.state.pages<6?<div className="load_tip" id="next_id" onClick={this.handleMore}>点击加载更多数据。</div>
                :<div className="load_tip">数据加载完毕。</div>}

            </div>
        )
    }
}

export default Content;
