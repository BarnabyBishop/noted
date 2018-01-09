import React, { Component } from 'react';
import './details.css';

class Details extends Component {
    handleChange(id, text) {
        this.props.actions.updateListItemText(id, text);
    }

    handleBlur(id) {
        this.props.actions.saveListItem(id);
    }

    render() {
        const { selectedListItem } = this.props;
        const value = selectedListItem && selectedListItem.text ? selectedListItem.text : '';
        return (
            <div className="details">
                <textarea
                    className="details-text"
                    value={value}
                    onChange={e => this.handleChange(selectedListItem.id, e.target.value)}
                    onBlur={() => this.handleBlur(selectedListItem.id)}
                    rows="30"
                />
            </div>
        );
    }
}

export default Details;
