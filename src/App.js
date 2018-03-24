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
    };
  }

  updateUser(user) {
    this.setState({
      user
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <UserInfo />
        </div>
        <div className="row">
          <div className="col col__left">
            <TreeView />
          </div>
          <div className="col col__left">
            <FilePreview />
          </div>
        </div>
      </div>
    );
  }
}
