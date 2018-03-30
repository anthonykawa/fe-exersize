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
      text: null,
      filename: null,
    };
  }

  componentWillMount(){
    fetch('http://localhost:3000/api/user.json')
    .then(res =>  res.json())
    .then((result) => {
      this.updateUser(result);
    })
    fetch('http://localhost:3000/api/files.json')
    .then(res => res.json())
    .then((result) => this.updateFiles(result))
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

  updateFileURL = (event, selectedFileID) => {
    let selectedFile = this.state.files[selectedFileID].file;
    this.setState({
      selectedFile
    })
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
              select={this.updateFileURL} />
          </div>
          <div className="col col__left">
            <FilePreview 
            selectedFile={this.state.selectedFile}
            updateText={this.updateText}
            text={this.state.text} />
          </div>
        </div>
      </div>
    );
  }
}
