import React from 'react';
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import ArticleShow from '../components/ArticleShow/ArticleShow'
import Fixedtool from '../components/Fixedtools/Fixedtools'
import Footer from "../components/Footer/Footer";
import reqwest from 'reqwest';
import util from '../lib/util';
import config from '../config'



class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{channel:"科技"},
        }
    }
    componentDidMount(){
        var articleId = this.props.match.params.articleId;
        this.getData(articleId);
    }
    getData = (articleId)=>{
        reqwest({
            url:`${config.url}/api/news/${articleId}`,
            method:'get',
            contentType: 'application/json',
            success: (res) => {
                    this.setState({
                        data: res.data,
                    })
            },
        });
    }
    render() {
        var article =this.state.data;
        var channelId = util.channelName2Id(article.channel);

        return (
            <div className="article-root">
                    <Header></Header>
                    <Nav channel={channelId}></Nav>
                    <ArticleShow article={article} ></ArticleShow>
                    <Fixedtool></Fixedtool>
                    <Footer></Footer>
            </div>
        )
    }
}

export default Article;
