import React, { Component } from 'react';
import './FilePreview.css';

const urlStyle = {
  width: '65%',
  display: 'inline-block',
  borderBottom: '1px solid black'
}

const typeStyle = {
  width: '12%',
  display: 'inline-block',
  borderBottom: '1px solid black'
}

const displayInfoStyle = {
  marginBottom: '20px'
}

const validate = (file) => {
  let output;
  fetch(file.file)
  .then(r => {
    if(r){
      output = r;
    }
  })
  return output;
}

const DisplayInfo = ({file, type}) => {
  return(
    <div style={displayInfoStyle}>url: <div style={urlStyle}>{file.file}</div> type: <div style={typeStyle}>{type}</div></div>
  )
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
        <DisplayInfo file={file} type={type} />
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
