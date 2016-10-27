import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TextInput extends Component {
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            if (e.shiftKey) {
                if (!this.props.multiline) {
                    this.props.setMultiline(true);
                }
                else {
                    e.preventDefault();
                    this.props.onSave(text, true, this.props.height);
                }
            }
            else {
                if (!this.props.multiline) {
                    e.preventDefault();
                    this.props.onSave(text, true, this.props.height);
                }
            }
        }

    }

    handleChange(e) {
        const input = e.target;

        const style = window.getComputedStyle(input, null);
        const heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);

        const originalHeight = style.height;
        input.style.height = 'auto';

        const endHeight = input.scrollHeight + heightOffset;
        input.style.height = originalHeight;

        this.props.onSave(e.target.value, false, endHeight);
    }

    render() {
        let style = {};
        if (this.props.height) {
            style = { height: this.props.height + 'px' };
        }
        return (
            <textarea className={
                classnames({
                    edit: this.props.editing,
                    'todo': 'todo'
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={this.props.autoFocus}
                value={this.props.text}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)}
                style={style}
                rows="1" />
        );
    }
}

TextInput.propTypes = {
    onSave: PropTypes.func,
    text: PropTypes.string,
    height: PropTypes.number,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    autoFocus: PropTypes.bool,
    newText: PropTypes.bool
};

export default TextInput;
