import React, { Component } from 'react';
import './UserInfo.css';

const userInfoTitleWrapper = {
  width: '800px',
}

const userInfoStyle = {
    display: 'inline-block',
    margin: '5px 10px',
    fontSize: '20px',
}

const userInfoTitle = {
  fontSize: '25px',

}

const userInfoWrapper = {
  marginLeft: '10%'
}

export default class UserInfo extends Component {
  render() {
    return (
      <div style={userInfoTitleWrapper}>
        <div style={userInfoTitle}>UserInfo</div>
        <div style={userInfoWrapper}>
          <div style={userInfoStyle}>Name: { this.props.user !== null ? this.props.user.user : '' }</div>
          <div style={userInfoStyle}>Email: { this.props.user !== null ? this.props.user.email : '' }</div>
        </div>
      </div>
    );
  }
}
