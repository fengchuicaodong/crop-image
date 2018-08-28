/**
 * Created by liumanli on 2018/8/28.
 */
import React from 'react';
import {Button}from'antd'
import CropImage from './CropImage'

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cropImageVisible: false,
        };
    }
    render() {
        return (
            <div className="content">
                <Button type="primary"
                        onClick={()=>{this.setState({cropImageVisible: true})}}>
                    crop</Button>
                <span className="edit-avatar">
                            {
                                this.state.cropImageVisible ?
                                    <div className="uploadPic">
                                        <CropImage visible={this.state.cropImageVisible}
                                                   user={user}
                                                   // handleUploadChange={this.handleUploadChange}
                                                   showModal={this.showCropImage}
                                                   onSave={this.props.saveUserProfile}/>
                                    </div> : null
                            }
                    </span>
            </div>
        )
    }
}
export default Content;