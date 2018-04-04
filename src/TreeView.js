import React, { Component } from 'react';
import './TreeView.css';


export default class TreeView extends Component {

  render() {
    return (
      <div>
        <div className="section-title">TreeView</div>
        <div className="rootdir">
        <div className="folder">files/</div>
        <div className="subdir">
          <div className="folder">images/</div>
          <div className="filename">

          {/* return the list of images under images dir */}
          <ul className="tree">
            {this.props.files !== null ?
              this.props.files.map((file, id) => {
                if(file.type === 'image/png'){
                  return (
                    <li className={this.props.fileID === id ? 'select' : ''} key={id} style={{display:'block'}}>
                      <a href="#" style={{textDecoration: 'none'}} onClick={(e) => this.props.select(e,id,this.props.updateText)}>
                          {file.file.split('/')[3]}
                      </a>
                    </li>
                  );
                } else {
                  return null;
                }

            }) : ''}
            </ul>
            </div>
            <div className="folder">text/</div>
            <div className="filename">
            {/* return the list of text files under text dir */}
            <ul className="tree">
            {this.props.files !== null ?
              this.props.files.map((file, id) => {
                if(file.type === 'text/plain'){
                  return (
                    <li className={this.props.fileID === id ? 'select' : ''} key={id} style={{display:'block'}}>
                      <a href="#" style={{textDecoration: 'none'}} onClick={(e) => this.props.select(e,id,this.props.updateText)}>
                          {file.file.split('/')[3]}
                      </a>
                    </li>
                  );
                } else {
                  return null;
                }

            }) : ''}
            </ul>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
