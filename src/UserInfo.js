import React, { Component } from 'react';
import './UserInfo.css';

export default class UserInfo extends Component {

  render() {
    return (
      <div>
        <div>UserInfo</div>
        <div style={{display: 'inline-block', marginRight: '10px'}}>Name: { this.props.user !== null ? this.props.user.user : '' }</div>
        <div style={{display: 'inline-block', marginLeft: '10px'}}>Email: { this.props.user !== null ? this.props.user.email : '' }</div>
      </div>
    );
  }
}
