import React from 'react';
import fixedTool_top from '../../assets/image/fixedtool_top.png';
import fixedTool_refresh from '../../assets/image/refresh.png';
import './index.css'
class Fixedtools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
        }
    }
    componentWillMount(){
        window.addEventListener('scroll',this.handleScroll,true);
    }
    handleScroll=()=>{
        let scrollTop = document.documentElement.scrollTop;
        if(scrollTop > 100){
            this.setState({
                show : true,
            })
        }else{
            this.setState({
                show : false,
            })

        }
    }
    handleScrollTop=()=>{
        document.documentElement.scrollTop=0;
    }
    render() {
        return (
            <div className={this.state.show?"fixed_tool show":"fixed_tool"}>
                <img src={fixedTool_refresh} alt="刷新" onClick={()=>{window.location.reload()}}/>
                <img src={fixedTool_top} alt="返回顶部" className="fixed_tool_scrollTop" onClick={this.handleScrollTop}/>
            </div>
        )
    }
}

export default Fixedtools;
