import React from 'react';
import Aside from '../Aside/Aside'
import './index.css'
class SearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };

    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:nextProps.sdata,
        })
    }
    render() {
        var list = this.state.data;
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
                {/*{this.state.pages<6?<div className="load_tip" id="next_id" onClick={this.handleMore}>点击加载更多数据。</div>
                :<div className="load_tip">数据加载完毕。</div>}*/}

            </div>
        )
    }
}

export default SearchContent;
