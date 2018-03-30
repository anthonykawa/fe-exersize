import React, { Component } from 'react';
import './TreeView.css';



export default class TreeView extends Component {
  render() {
    let root = null;
    if(this.props.files){
  }
    return (
      <div>
        <div>TreeView</div>
          {this.props.files !== null ?
            this.props.files.map((file, id) => {
              return (
                <div key={id} style={{display:'block'}}>
                  |---------
                  <a href="#" onClick={(e) => this.props.select(e,id)}>
                      {file.file.split('/')[3]}
                  </a>
                </div>
              );
          }) : ''}
      </div>
    );
  }
}
