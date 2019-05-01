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
        let userId = util.getUser('id');
        reqwest({
            url:`${config.url}/api/news/${articleId}`,
            method:'get',
            contentType: 'application/json',
            headers: {'userId': userId},
            success: (res) => {
                    this.setState({
                        data: res.data[0],
                    })
                document.title= res.data[0].title;
            },
        });
    }
    render() {
        var article =this.state.data;
        var channelId = util.channelName2Id(article.channel);
        return (
            <div className="article-root">
                    <Header/>
                    <Nav channel={channelId}/>
                    <ArticleShow article={article} />
                    <Fixedtool/>
                    <Footer/>
            </div>
        )
    }
}

export default Article;
