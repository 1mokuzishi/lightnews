import React from 'react';

import Header from '../components/Header'
import Nav from '../components/Nav'
import Content from '../components/Content'
import Fixedtool from '../components/Fixedtools'
import Footer from '../components/Footer'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channelId:0,
        }
    }

    render() {
        const channelId = this.state.channelId;
        console.log(channelId,"home页面的channelId")
        return (
            <div className="home">
                <Header></Header>
                <Nav channel={channelId}></Nav>
                <Content channel={channelId}></Content>
                <Fixedtool></Fixedtool>
                <Footer></Footer>
            </div>
        )
    }
}

export default Home;