import React, { Component } from 'react';
import './FilePreview.css';

const validate = (file) => {
  let output;
  fetch(file.file)
  .then(r => {
    console.log(r.body);
    if(r){
      output = r;
    }
  })
  return output;
}

const ImagePreview = ({selectedFile}) => {
  validate(selectedFile);
  return <img alt="File not found" className="img-preview" src={selectedFile.file} />;
}

const TextPreview = ({selectedFile, props}) => {
  if(selectedFile){
    fetch(selectedFile.file)
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
    let file = '';
    let type = '';
    if(this.props.selectedFile){
      file = this.props.selectedFile;
      type = this.props.getFileType(file);
    }
    return (
      <div className="file-preview">
        <div>FilePreview</div>
        <p>url: {file.file} type: {type}</p>
        {
          type === 'Image'
          ?
            <ImagePreview selectedFile={file} />
          :
            <TextPreview selectedFile={file} props={this.props}/>
        }
      </div>
    );
  }
}
