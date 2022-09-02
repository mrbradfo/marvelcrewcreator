import React, { Component } from 'react';
import { Tile } from './Tile';

export class ResultsList extends Component {
  render() {
    const resultCardElement = this.props.results.length>0 || !this.props.searchWord === ''
      ? this.props.results.map((result) => {
        return (
          <Tile
            data={result}
            key={ result.id }
            image={ result.thumbnail.path + '.' + result.thumbnail.extension }
            title={result.name}
            onClick={ () => this.props.onResultClick(result.id) }
          />
        );
      })
      : <h1>{this.props.searchWord ? 'No results found for "' + this.props.searchWord + '".  Let\'s try again!'
            : 'Search for a character above! 👆'}</h1>;

    return (
      <section className="results-list">
        { resultCardElement }
      </section>
    );
  }
}
