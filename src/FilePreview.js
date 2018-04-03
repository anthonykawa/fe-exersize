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
  let url = file.file;
  let isValid;
    fetch(url).then(response => {
        var contentType = response.headers.get('content-type');
        if(contentType && contentType.includes("text/html")){
          throw new TypeError("Opps, we haven't got the correct file")
        } else {
          isValid = true;
        }
    }).catch(e => {
      isValid = false;
    })
  return isValid;
}

const DisplayInfo = ({file, type}) => {
  return(
    <div style={displayInfoStyle}>url: <div style={urlStyle}>{file.file}</div> type: <div style={typeStyle}>{type}</div></div>
  )
}

const ImagePreview = ({selectedFile, props}) => {
    
  if(props.isValid){
    return <img alt="File not found" className="img-preview" src={selectedFile.file} />;
  }
  return <p>File Not Found</p>;
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
            <ImagePreview selectedFile={file} props={this.props} />
          :
            <TextPreview selectedFile={file} props={this.props}/>
        }
      </div>
    );
  }
}
