import React, { Component } from "react";
import classnames from 'classnames';
import "./tag-picker.css";

class TagPicker extends Component {
    constructor(params) {
        super(params);

        this.state = {
            showList: false
        };
    }

    onButtonClick() {
        this.setState({ showList: !this.state.showList });
    }

    onTagClick(tag) {
        this.props.actions.setTag(tag);
        this.setState({ showList: false });
    }

    render() {
        return (
            <div className="tags-picker">
                <div className="tags-picker--button" onClick={this.onButtonClick.bind(this)}>
                    <i className="fab fa-slack-hash"></i>{this.props.currentTag && this.props.currentTag.replace('#', '')}
                </div>
                {this.state.showList &&
                    <div className="tags-picker--list">
                        {this.props.tags.map(tag => <div key={tag} className={classnames({ 'tags-picker--tag': true, 'tags-picker--tag-active': this.state.currentTag === tag })} onClick={this.onTagClick.bind(this, tag)}>{tag}</div>)}
                    </div>
                }
            </div>
        );
    }
}

export default TagPicker;
