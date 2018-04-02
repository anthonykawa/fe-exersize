import React, { Component } from 'react';
import './UserInfo.css';

export default class UserInfo extends Component {

  render() {
    return (
      <div>
        <div>UserInfo</div>
        <div>Name: { this.props.user !== null ? this.props.user.user : '' }</div>
        <div>Email: { this.props.user !== null ? this.props.user.email : '' }</div>
      </div>
    );
  }
}
