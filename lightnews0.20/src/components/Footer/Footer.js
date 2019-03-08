import React from 'react';
import './index.css'
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="footer" id="footer">
                <br/> Copyright © 2019 WWW.yushuai.work All Rights Reserved
                <br/>
            </div>
        )
    }
}

export default Footer;
