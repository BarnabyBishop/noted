import React, { Component } from 'react';
import TextInput from './text-input';
import './list.css';

class List extends Component {
    addItem(text) {
        this.actions.addListItem()
    }
    saveItem(id, text, createNext, height) {
        this.actions.saveListItem(id, text, height);
        if (createNext) {
            this.addItem();
        }
    }
    render() {
        console.log(Object.keys(this.props.actions));
        return (
            <div className="list">
            {
                this.props.list.map(item => (
                    <TextInput
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        height={item.height}
                        multiline={item.multiline}
                        autoFocus={item.autoFocus}
                        onSave={(text, createNext, height) => this.saveItem(item.id, text, createNext, height)} />
                        // setMultiline={(multiline) => this.props.setMultiline(item.id, multiline)} />
                ))
            }
            </div>
        );
  }
}

export default List;
