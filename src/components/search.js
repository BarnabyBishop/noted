import React, { Component } from "react";
import Fuse from 'fuse.js';
import "./search.css";

export default class Search extends Component {
    onChange(e) {
        const options = {
            shouldSort: true,
            findAllMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "title",
              "text"
          ]
          };
          const fuse = new Fuse(this.props.list, options); // "list" is the item array
          const result = fuse.search(e.target.value);
          console.log(result);
    }
    render() {
        return (
            <div className="search">
                <input className="search--input" type="text" onChange={this.onChange.bind(this)} />
                <i className="fas fa-search"></i>
            </div>
        );
    }
}
