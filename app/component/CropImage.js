/**
 * Created by liumanli on 2018/8/28.
 */

import React from 'react';
import ReactCrop,{ makeAspectCrop } from 'react-image-crop'
import {Modal, Upload, Icon} from 'antd'
import 'react-image-crop/lib/ReactCrop.scss';


class CropImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null,
            image:'',
            crop: {
                x: 0,
                y: 0,
            },
            pixelCrop:null,
        };

        this.onOk = () => {
            const {
                showModal,
                user
            } = this.props;
            let{image,crop,pixelCrop}=this.state;
            let imageDest=this.cropImage(image,crop,pixelCrop);
            let blob = _dataURItoBlob(imageDest);
            let data = new FormData();
            data.append('avatar', blob);
            this.props.onSave(user._id, data)
                .then(() =>{
                    showModal(false);
                });

            function _dataURItoBlob(dataURI) {
                if (dataURI) {
                    let byteString = atob(dataURI.split(',')[1]);
                    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    let ab = new ArrayBuffer(byteString.length);
                    let ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    return  new Blob([ab], {type: mimeString});
                }
            }
            function getCroppedImg(image,pixelCrop) {

            }
        };
        this.cropImage=(image,crop,pixelCrop)=>{
            let imageWidth = image.naturalWidth;
            let imageHeight = image.naturalHeight;
            let cropX = (crop.x / 100) * imageWidth;
            let cropY = (crop.y / 100) * imageHeight;

            let cropWidth = (crop.width / 100) * imageWidth;
            let cropHeight = (crop.height / 100) * imageHeight;

            let canvas = document.createElement('canvas');
            canvas.width = cropWidth;
            canvas.height = cropHeight;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            return canvas.toDataURL('image/jpeg');
        };

        this.onChooseFile = (e) => {
            let self = this;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", function () {
                self.setState({
                    imageUrl: reader.result
                })
            }, false);
        };
        this.onCropChange = (crop,pixelCrop) => {
            this.setState({crop,pixelCrop})
        };
        this.onImageLoaded = (image) => {
            // console.log("onImgLoadedImg",image);
            this.setState({
                crop: makeAspectCrop({
                    x: 0,
                    y: 0,
                    aspect: 1,
                    width: 100,
                }, image.naturalWidth / image.naturalHeight),
                image,
            });
        };
        this.onCropComplete = (crop, pixelCrop) => {
            console.log('onCropComplete, pixelCrop:', pixelCrop);
        }
    }


    render() {
        const {
            visible,
            showModal
        } = this.props;
        return <Modal
            wrapClassName="crop-image"
            visible={visible}
            title="头像上传"
            onOk={this.onOk}
            onCancel={() => showModal(false)}>
            {
                this.state.imageUrl ?
                    <ReactCrop src={this.state.imageUrl}
                               crop={this.state.crop}
                               onChange={this.onCropChange}
                               onComplete={this.onCropComplete}
                               onImageLoaded={this.onImageLoaded}
                    />
                    :
                    <div className="file-input-area">
                        <Icon type="plus" className="avatar-uploader-trigger"/>
                        <input className="file-input-button"
                               type="file"
                               onChange={this.onChooseFile}
                               accept={'image/*'}/>
                    </div>
            }
        </Modal>
    }
}

export default CropImage