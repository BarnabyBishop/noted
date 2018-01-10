import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
// import './simplemde.css';
import './details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.textElement = null;
        this.simpleMDE = null;
        this.id = null;
    }

    componentDidMount() {
        this.createEditor();
    }

    componentDidUpdate(prevProps) {
        const { selectedListItem } = this.props;
        const prevSelectedListItem = prevProps.selectedListItem;
        if ((selectedListItem && !prevSelectedListItem) || selectedListItem.id !== prevSelectedListItem.id) {
            this.id = selectedListItem.id;
            this.simpleMDE.value(selectedListItem.text || '');
        }
    }

    createEditor() {
        this.simpleMDE = new SimpleMDE({ element: this.textElement, spellChecker: false });
        this.simpleMDE.codemirror.on('change', this.handleChange.bind(this));
        this.simpleMDE.codemirror.on('blur', this.handleBlur.bind(this));
    }

    handleChange() {
        const currentValue = this.props.selectedListItem.text;
        const newValue = this.simpleMDE.value();
        if (currentValue !== newValue) {
            this.props.actions.updateListItemText(this.id, this.simpleMDE.value());
        }
    }

    handleBlur() {
        this.props.actions.saveListItem(this.id);
    }

    render() {
        return (
            <div className="details">
                <textarea
                    ref={textElement => {
                        this.textElement = textElement;
                    }}
                />
            </div>
        );
    }
}

export default Details;
