import React from 'react';
import util from '../../lib/util';
import Aside from '../Aside/Aside'
import _ from 'lodash'
import './index.css'

class ArticleShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getTags=(str)=>{
        return _.split(str,'_');
    }
    render() {
        const article = this.props.article;
        article.tags=this.getTags(article.tags);
        return (
            <div className="article-root">
                <div className="main flex-block">
                    <div className="articlebox">
                        <ol className="breadcrumb">
                            <li>
                                <a href="/" target="_blank" title="首页">首页</a>
                            </li>
                            <li>
                                <a href={`/channel/${util.channelName2Id(article.channel)}`} target="_blank" title={article.channel}>{article.channel}</a>
                            </li>
                            <li>正文</li>
                        </ol>
                        <div className="article_header">
                            <h1>{article.title}</h1>
                            <div className="article_tips">
                                <a href="" target="_blank">
                                    <span className="article-logo-container"></span>
                                    <span className="author">{article.author}</span>
                                    <span className="time">{article.time}</span>
                                </a>
                            </div>
                        </div>
                        <div className="article_content" >
                            <div id="content" dangerouslySetInnerHTML={{__html:`${_.replace(article.content,/data-original/g,'src')}`}}></div>
                        </div>
                        <div className="article_more">
                            相关标签：
                            {
                                _.map(article.tags,(item,index)=>{
                                    return(
                                        <a key={index} href={`/search?${item}`} title={item}>{item}</a>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Aside></Aside>
                </div>
            </div>
        )
    }
}

export default ArticleShow;
