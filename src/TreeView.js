import React, { Component } from 'react';
import './TreeView.css';

export default class TreeView extends Component {

  render() {
    return (
      <div>
        <div>TreeView</div>
        <div className="rootdir">
        <div>files/</div>
        <div className="subdir">
          <div>images/</div>

          {/* return the list of images under images dir */}
            {this.props.files !== null ?
              this.props.files.map((file, id) => {
                if(file.type === 'image/png'){
                  return (
                    <div className={this.props.fileID === id ? 'select' : ''} key={id} style={{display:'block'}}>
                      |-------
                      <a href="#"  onClick={(e) => this.props.select(e,id)}>
                          {file.file.split('/')[3]}
                      </a>
                    </div>
                  );
                }

            }) : ''}
            <div>text/</div>

            {/* return the list of text files under text dir */}
            {this.props.files !== null ?
              this.props.files.map((file, id) => {
                if(file.type === 'text/plain'){
                  return (
                    <div className={this.props.fileID === id ? 'select' : ''} key={id} style={{display:'block'}}>
                      |---------
                      <a href="#" onClick={(e) => this.props.select(e,id)}>
                          {file.file.split('/')[3]}
                      </a>
                    </div>
                  );
                }

            }) : ''}
        </div>
      </div>
      </div>
    );
  }
}
