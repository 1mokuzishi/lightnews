import React from 'react';
import './index.css'
import ga from '../../assets/image/ga.png'
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="footer" id="footer">
                <div >
                    <p>Copyright © 2019- yushuai.work 仅供学习与交流</p>
                    <a href="http://www.miitbeian.gov.cn/">蜀ICP备19007177号-1</a><br/>
                    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011402000235" rel="noopener noreferrer">
                        <img src={ga} alt="公安备案"/>
                        <span>川公网安备 51011402000235号</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Footer;
