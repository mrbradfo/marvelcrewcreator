import React, { Component } from 'react';
import loading from '../imgs/marvel_loader.gif';

export class Loading extends Component {
  render() {
    return (
      <div className="text">
        <h1>{ 'Searching for "' + this.props.searchWord + '".' }</h1>
        <img src={loading} alt="loading..."/>
      </div>
    );
  }
}
