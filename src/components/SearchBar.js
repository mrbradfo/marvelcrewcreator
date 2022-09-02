import React, {Component} from 'react';

export class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchWord: props.searchWord,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                    <div className="text search-label">SEARCH</div>
                    <input
                        className="search-bar"
                        type="text"
                        value={this.state.searchWord}
                        placeholder="Search for a character to add to your crew!"
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
            </form>
        );
    }

    handleSubmit(event) {
        // this is here so pressing enter does not reload the page
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ searchWord: event.target.value })
        this.props.onSubmit(event.target.value);
    }

}
