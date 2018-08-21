import React, { Component } from 'react';
import './search.css';

export default class Search extends Component {
    onChange(e) {
        this.props.actions.setSearch(e.target.value);
    }
    render() {
        return (
            <div className="search">
                <i className="fas fa-search" />
                <input
                    className="search--input"
                    type="text"
                    onChange={this.onChange.bind(this)}
                    value={this.props.search}
                />
            </div>
        );
    }
}
