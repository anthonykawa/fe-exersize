import React, { Component } from 'react';

import FilePreview from './FilePreview';
import TreeView from './TreeView';
import UserInfo from './UserInfo';

import './App.css';

import fetch from 'isomorphic-fetch';

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

  componentWillMount() {
    fetch('http://localhost:3000/api/user.json')
      .then(res => res.json())
      .then(users => {
        this.updateUser(users);
      })
    fetch('http://localhost:3000/api/files.json')
      .then(res => res.json())
      .then(files => {
        return files.map(file => {
          let temp = Object();
          temp = {
            user: file.user,
            file: file.file,
            fileName: file.fileName,
            type: file.type,
            isValid: null
          }
          return temp;
        })
      })
      .then(files => {
        this.updateFiles(files);
        this.checkIsActive(this.state.files, this.updateFiles);
      })
  }

  checkIsActive = (files, updateFiles) => {
    if(files){
      var promise1 = files.map(file => {
        let output = {};
        let url = file.file;
        let valid;
        return fetch(url).then(response => {
          var contentType = response.headers.get('content-type');
          if (contentType && contentType.includes("text/html")) {
            valid = false;
          } else {
            valid = true;
          }
          output = {
            user: file.user,
            file: file.file,
            fileName: file.fileName,
            type: file.type,
            isValid: valid,
          }
          return output;
        })
      })    
      Promise.all(promise1)
        .then(function (results) {
          updateFiles(results);
        })
    }
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
    if(selectedFile.type === 'text/plain' && selectedFile.isValid){
      let promise = fetch(selectedFile.file)
      .then(function (res) {
        return res.text();
      })
      .then(function (body) {
        return body;
      })
      Promise.all([promise]).then(results => {
        this.updateText(results[0]);
      })
    }
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
    if (file) {
      if (file.type === 'image/png') {
        type = 'Image';
      } else if (file.type === 'text/plain') {
        type = 'Text';
      }
    }
    return type;
  }

  render() {
    if(this.state.files){
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
                props={this.props} />
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
    } else {
      return <div>Loading...</div>;
    }
  }
}
