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
                <div>
                    <p>Copyright © 2019 yushuai.work 仅供学习与交流</p>
                    <p><a href="http://www.miitbeian.gov.cn/">蜀ICP备19007177号-1</a></p>
                </div>
            </div>
        )
    }
}

export default Footer;
