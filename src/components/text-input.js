import React, { Component } from 'react';
import classnames from 'classnames';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.autosave = null;
    }
    handleSubmit(e) {
        const title = e.target.value.trim();
        if (e.which === 13) {
            if (e.shiftKey || e.metaKey) {
                if (!this.props.multiline) {
                    // this.props.setMultiline(true);
                } else {
                    e.preventDefault();
                    this.props.onChange(title, true, this.props.index, this.props.height);
                }
            } else {
                if (!this.props.multiline) {
                    e.preventDefault();
                    this.props.onChange(title, true, this.props.index, this.props.height);
                }
            }
        }
    }

    handleChange(e) {
        const input = e.target;
        const value = input.value;

        const style = window.getComputedStyle(input, null);
        const heightOffset =
            parseFloat(style.borderTopWidth) +
            parseFloat(style.borderBottomWidth) -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom);

        const originalHeight = style.height;
        input.style.height = 'auto';

        const endHeight = input.scrollHeight + heightOffset;
        input.style.height = originalHeight;

        this.props.onChange(value, false, this.props.index, endHeight);

        clearTimeout(this.autosave);
        if (value) {
            this.autosave = setTimeout(this.save.bind(this, value), 1000);
        }
    }

    handleBlur(e) {
        this.save(e.target.value);
    }

    save(value) {
        this.props.onSave(value);
    }

    render() {
        let style = {};
        if (this.props.height) {
            style = { height: this.props.height + 'px' };
        }
        const autoFocus = !this.props.text;
        const text = this.props.text === null ? '' : this.props.text;
        return (
            <textarea
                className={classnames({
                    edit: this.props.editing,
                    'list-text-input': 'list-text-input'
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={autoFocus}
                value={text}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)}
                onFocus={this.props.onFocus}
                onBlur={this.handleBlur.bind(this)}
                style={style}
                rows="1"
            />
        );
    }
}

export default TextInput;
