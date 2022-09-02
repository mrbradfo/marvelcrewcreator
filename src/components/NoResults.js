import React, { Component } from 'react';

export class NoResults extends Component {
  render() {
    const msg = this.props.searchWord ? 'Whoops, we couldn\'t find any results for "' + this.props.searchTerm + '". Why don\'t you try another one?'
      : 'Search for a character above! 👆';

    return (
      <div className="text">
        <h1>{ msg }</h1>
      </div>
    );
  }
}
