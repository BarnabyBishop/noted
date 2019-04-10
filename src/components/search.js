import React, { Component } from 'react';
import './search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
        this.focusInput = this.focusInput.bind(this);
        document.addEventListener('keydown', (event) => {
            if (event.metaKey && event.key === 'k') {
                this.focusInput();
            }
        })
    }

    state = {
        term: ''
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.term && !nextProps.selectedSearch) {
            this.setState({ term: '' });
        }
    }

    focusInput() {
        this.searchInput.current.focus();
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
                    ref={this.searchInput}
                    onChange={this.onChange.bind(this)}
                    onKeyUp={this.onKeyUp.bind(this)}
                    value={this.state.term}
                />
            </div>
        );
    }
}
