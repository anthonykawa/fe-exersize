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
  marginBottom: '20px',
  fontSize: '20px'
}

const DisplayInfo = ({ file, type }) => {
  if(file){
    return (
      <div style={displayInfoStyle}>url: <div style={urlStyle}>{file.file}</div> type: <div style={typeStyle}>{type}</div></div>
    )
  } else {
    return null;
  }
}

const ImagePreview = ({ selectedFile }) => {
  if (selectedFile.isValid) {
    return <img alt={selectedFile.fileName} className="img-preview" src={selectedFile.file} />;
  }
  return <p>File Not Found</p>;
}

const TextPreview = ({ selectedFile, props }) => {
  if(props.text){
    return <div>{props.text}</div>;
  }
  return <div></div>;
}

export default class FilePreview extends Component {
  render() {
    return (
      <div className="file-preview">
        <div className="section-title">FilePreview</div>
        <DisplayInfo file={this.props.selectedFile} type={this.props.getFileType(this.props.selectedFile)} />
        {
          this.props.getFileType(this.props.selectedFile) === 'Image'
            ?
            <ImagePreview selectedFile={this.props.selectedFile} props={this.props} />
            :
            <TextPreview selectedFile={this.props.selectedFile} props={this.props} />
        }
      </div>
    );
  }
}
