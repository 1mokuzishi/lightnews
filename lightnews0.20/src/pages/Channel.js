import React from 'react';

import Header from '../components/Header'
import Nav from '../components/Nav'
import Content from '../components/Content'
import Fixedtool from '../components/Fixedtools'
import Footer from '../components/Footer'

class Channel extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }

    render() {
        const channelId = this.props.match.params.channelId||0;
        console.log(channelId,"channel页面的channelId")
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
