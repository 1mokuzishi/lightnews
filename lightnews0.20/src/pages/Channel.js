import React from 'react';

import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import Content from '../components/Content/Content'
import Fixedtool from '../components/Fixedtools/Fixedtools'
import Footer from '../components/Footer/Footer'

class Channel extends React.Component {
    render() {
        const channelId = this.props.match.params.channelId||0;
        return (
            <div className="channel-root">
                <Header></Header>
                <Nav channel={channelId}></Nav>
                <Content channel={channelId}></Content>
                <Fixedtool></Fixedtool>
                <Footer></Footer>
            </div>
        )
    }
}

export default Channel;
