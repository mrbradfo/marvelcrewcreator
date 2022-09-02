import React, { Component } from 'react';
import {Button} from "@mantine/core";


export class LoadMore extends Component {
  render() {
    return (
      <Button className="more-btn" onClick={ this.props.onClick }>Load More</Button>
    );
  }
}
