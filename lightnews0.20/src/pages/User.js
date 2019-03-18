import React from 'react';
import Header from '../components/Header/Header'
import InfoContainer from '../components/InfoContainer/InfoContainer'
import Footer from '../components/Footer/Footer'
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="user_root">
                <Header/>
                <InfoContainer/>
                <Footer/>
            </div>
        )
    }
}

export default User;
