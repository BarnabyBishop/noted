import React, { Component } from 'react';
import './search.css';

export default class Search extends Component {
    state = {
        term: ''
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.term && !nextProps.selectedSearch) {
            this.setState({ term: '' });
        }
    }

    onChange(e) {
        this.setState({ term: e.target.value });
    }

    onKeyUp(e) {
        if (e.keyCode === 13 && this.state.term) {
            this.props.actions.setSearch(this.state.term);
        }
    }

    render() {
        return (
            <div className="search">
                <i className="fas fa-search" />
                <input
                    className="search--input"
                    type="text"
                    onChange={this.onChange.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    value={this.state.term}
                />
            </div>
        );
    }
}
