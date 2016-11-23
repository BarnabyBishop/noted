import React, { Component } from 'react';
import TextInput from './text-input';
import './list.css';

class List extends Component {

    addItem(text, index) {
        this.props.actions.addListItem(text, index);
    }

    saveItem(id, text, createNext, index, height) {
        this.props.actions.saveListItem(id, text, height);
        if (createNext) {
            this.addItem(null, ++index);
        }
    }

    blurItem(id, text) {        
        if (!text) {
            console.log('no text');
            this.props.actions.removeListItem(id);
        }
    }

    render() {
        return (
            <div className="list">
            {
                this.props.list.map((item, index) => (
                    <TextInput
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        index={index}
                        height={item.height}
                        multiline={item.multiline}
                        autoFocus={item.autoFocus}
                        onSave={(text, createNext, index, height) => this.saveItem(item.id, text, createNext, index, height)}
                        onBlur={(text) => this.blurItem(item.id, text)}
                    />
                        // setMultiline={(multiline) => this.props.setMultiline(item.id, multiline)} />
                ))
            }
            </div>
        );
  }
}

export default List;
