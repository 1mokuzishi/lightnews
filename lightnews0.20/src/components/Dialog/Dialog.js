import React from 'react';

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"修改资料",
            alertStatus:"none"
        }
    }
    componentDidMount(){
        this.setState({
            alertStatus:this.props.status
        })
    }

    render() {
        return (
            <div className="dialog_root flex-block"
                 style={{display:this.state.alertStatus}}
            >
                <div className="title">
                    <h3></h3>
                    <span>X</span>
                </div>

            </div>
        )
    }
}

export default Dialog;
