import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import moment from 'moment';
import './details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.textElement = null;
        this.simpleMDE = null;
        this.id = null;
        this.autosave = null;
    }

    componentDidMount() {
        this.createEditor();
    }

    componentDidUpdate(prevProps) {
        const { selectedListItem } = this.props;
        const prevSelectedListItem = prevProps.selectedListItem;
        if (selectedListItem && (!prevSelectedListItem || selectedListItem.id !== prevSelectedListItem.id)) {
            this.id = selectedListItem.id;
            this.simpleMDE.value(selectedListItem.text || '');
        }
    }

    createEditor() {
        this.simpleMDE = new SimpleMDE({
            element: this.textElement,
            spellChecker: false,
            status: false,
            toolbar: false
        });
        this.simpleMDE.codemirror.on('change', this.handleChange.bind(this));
        this.simpleMDE.codemirror.on('blur', this.handleBlur.bind(this));
    }

    handleChange() {
        const currentValue = this.props.selectedListItem.text;
        const newValue = this.simpleMDE.value();
        if (currentValue !== newValue) {
            this.props.actions.updateListItemText(this.id, this.simpleMDE.value());
            clearTimeout(this.autosave);
            this.autosave = setTimeout(this.save.bind(this), 1000);
        }
    }

    handleBlur() {
        this.save();
    }

    save() {
        this.props.actions.saveListItem(this.id);
    }

    render() {
        const { selectedListItem } = this.props;
        const information = selectedListItem && (
            <div className="information">
                Updated at: <span>{moment(selectedListItem.updatedAt).format('kk:mm DD-MMM-YY')}</span>{' '}
                <a href="https://simplemde.com/markdown-guide" target="_blank" rel="nofollow" className="markdown-help">
                    ¿
                </a>
            </div>
        );
        return (
            <div className="details">
                <div>
                    <textarea
                        ref={textElement => {
                            this.textElement = textElement;
                        }}
                    />
                </div>
                {information}
            </div>
        );
    }
}

export default Details;
