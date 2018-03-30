import React, { Component } from 'react';
import './FilePreview.css';

let ImagePreview = ({selectedFile}) => {
  return <img className="img-preview" src={selectedFile} />;
}

const TextPreview = ({selectedFile, props}) => {
  if(selectedFile){
    fetch(selectedFile)
    .then(function(r){
      return r.text();
    })
    .then(function(body){
      props.updateText(body);
    })
  }
  return <div>{props.text ? props.text : ''}</div>;
}

export default class FilePreview extends Component {
  render() {
    let url = this.props.selectedFile;
    let type = this.props.getFileType(url);

    return (
      <div className="file-preview">
        <div>FilePreview</div>
        <p>url: {url} type: {type}</p>
        {
          type === 'Image'
          ?
            <ImagePreview selectedFile={url} />
          :
            <TextPreview selectedFile={url} props={this.props}/>
        }
      </div>
    );
  }
}
