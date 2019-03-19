import React from 'react';
import { Upload, Icon ,message} from 'antd';
import './index.css'
import reqwest from 'reqwest'
import util from '../../lib/util'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
}


class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            loading: false,
            user:{},

        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.tdata,
            user:this.props.user
        })

    }
    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps) {
            this.setState({
                title:nextProps.tdata,
                user:nextProps.user
            })
        }
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    handleUpload=()=>{
        let token = util.getItem('jwt-token');
        reqwest({
            url: "http://localhost:8000/api/upload",
            method: "post",
            data:{data:this.state.imageUrl,user:this.state.user},
            headers: {'Authorization': token},
            success: (res) => {
                if(res.success){
                    util.setItem('jwt-token',res.token)
                    window.location.href='/user'
                }

            }
        })
    }
    handleCancel=()=>{
        let oDialog = document.getElementsByClassName('dialog_root')[0];
        oDialog.style.display="none"
        this.setState({
            imageUrl:this.state.user.avatar
        })
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div className="dialog_root"
                 style={{display:"none"}}
            >
                <div className="dialog_container">
                    <div className="title flex-block flex_row_between" >
                        <h3>{this.state.title}</h3>
                        <span onClick={this.handleCancel}>x</span>
                    </div>
                    {
                        (this.state.title =="修改资料")?
                            <div></div>:
                            <div className="avatar_mod_container">
                                <div className="avatar">
                                    <img src={imageUrl?imageUrl:this.state.user.avatar}/>
                                </div>
                                <Upload
                                    accept="image/*"
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="http://localhost:8000/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {uploadButton}
                                </Upload>
                                <ul className="btn_warp flex-block flex_row_between">
                                    <li onClick={this.handleUpload}>确定</li>
                                    <li onClick={this.handleCancel}>取消</li>
                                </ul>
                            </div>


                    }
                </div>


            </div>
        )
    }
}

export default Dialog;
