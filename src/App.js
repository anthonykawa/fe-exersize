import React, { Component } from 'react';

import FilePreview from './FilePreview';
import TreeView from './TreeView';
import UserInfo from './UserInfo';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      files: null,
      selectedFile: null,
      isValid: null,
      selectedFileID: null,
      text: null,
    };
  }

  componentDidMount(){
      let newFiles = []; 
      if(this.state.files){
        this.state.files.map(file => {
          let output = new Object();
          let url = file.file;
          let valid;
          fetch(url).then(response => {
            var contentType = response.headers.get('content-type');
            if(contentType && contentType.includes("text/html")){
              valid = false;
            } else {
              valid = true;
            }
            output = {
              user: file.user,
              file: file.file,
              fileName: file.fileName,
              type: file.type,
              isActive: valid,
            }
            return output;
          })
          .then(response => {
            newFiles.push(response);
          })
          this.updateFiles(newFiles);  
        })
      }
      console.log(this.state.files)
  }

  componentWillMount(){
    let getUser = fetch('http://localhost:3000/api/user.json')
    .then(res =>  res.json())
    let getFiles = fetch('http://localhost:3000/api/files.json')
    .then(res => res.json())
    Promise.all([getUser, getFiles]).then(r => {
      this.updateUser(r[0]);
      this.updateFiles(r[1]);
    })
  }

  updateUser = (user) => {
    this.setState({
      user
    });
  }

  updateFiles = (files) => {
    this.setState({
      files
    });
  }

  updateText = (text) => {
    this.setState({
      text
    })
  }

  updateSelectedFile = (event, selectedFileID) => {
    let selectedFile = this.state.files[selectedFileID];
    this.setState({
      selectedFile,
      selectedFileID
    })
  }

  updateIsValid = (isValid) => {
    this.setState({
      isValid
    })
  }

  getFileType = (file) => {
    let type = null;
    if(file){
      if(file.type === 'image/png'){
        type = 'Image';
      } else if(file.type === 'text/plain'){
        type = 'Text';
      }
    }
    return type;
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <UserInfo
            user={this.state.user} />
        </div>
        <div className="row">
          <div className="col col__left">
            <TreeView
              files={this.state.files}
              select={this.updateSelectedFile}
              fileID={this.state.selectedFileID}
              getFileType={this.getFileType} />
          </div>
          <div className="col col__left">
            <FilePreview
              isValid={this.state.isValid}
              updateIsValid={this.updateIsValid}
              selectedFile={this.state.selectedFile}
              updateText={this.updateText}
              text={this.state.text}
              getFileType={this.getFileType} />
          </div>
        </div>
      </div>
    );
  }
}
