import React, { Component } from 'react';
import fs from 'fs';
import './FilePreview.css';

let ImagePreview = ({selectedFile}) => {
  return <img className="img-preview" src={selectedFile} />;
}

const TextPreview = ({selectedFile}) => {
  return <div></div>;
}

export default class FilePreview extends Component {
  render() {
    let url = this.props.selectedFile;
    let type = '';
    let ext = '';
    if(url){
      ext = url.split('.')[1];
      if(ext === 'png'){
        type = 'Image';
      } else if(ext === 'txt'){
        type = 'Text';
      }
    }
    return (
      <div className="file-preview">
        <div>FilePreview</div>
        <p>url: {url} type: {type}</p>
        {
          type === 'Image'
          ?
            <ImagePreview selectedFile={url} />
          :
            <TextPreview selectedFile={url} />
        }
      </div>
    );
  }
}
