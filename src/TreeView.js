import React, { Component } from 'react';
import './TreeView.css';



export default class TreeView extends Component {

  componentWillMount(){
    if(this.props.files){
      this.props.files.map(res => {
        console.log(res);
      })
    }
  }

  render() {
    return (
      <div>
        <div>TreeView</div>
        <div>files/</div>
          {this.props.files !== null ?
            this.props.files.map((file, id) => {
              let dirs = file.file.split('/');
              
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
