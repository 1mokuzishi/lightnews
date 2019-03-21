import React from 'react';

import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import Content from '../components/Content/Content'
import Fixedtool from '../components/Fixedtools/Fixedtools'
import Footer from '../components/Footer/Footer'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channelId:0,
        }
    }

    render() {
        const channelId = this.state.channelId;
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
