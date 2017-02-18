import React, { Component } from 'react';
import _ from 'lodash';
import { getMiddleSortOrder } from '../utils/sort-utils';
import TextInput from './text-input';
import Checkbox from './checkbox';
import './list.css';

class List extends Component {

    addItem(text, index) {
        const { actions, currentDate } = this.props;
        actions.addListItem(text, currentDate, index);
    }

    addNextItem(id) {
        const sortedList = this.getSortedList();
        const currentItem = _.find(sortedList, { id });
        const currentIndex = sortedList.indexOf(currentItem);
        const nextItem = sortedList[currentIndex + 1];
        const middleIndex = getMiddleSortOrder(currentItem.sortOrder, nextItem.sortOrder);
        this.addItem(null, middleIndex)
    }

    saveItem(id, text, createNext, index, height) {
        this.props.actions.updateListItem(id, text, height);
        if (createNext) {
            this.addNextItem(id);
        }
    }

    blurItem(id, text) {
        if (!text) {
            this.props.actions.removeListItem(id);
        } else {
            this.props.actions.saveListItem(id);
        }
    }

    toggleCompleted(id) {
        this.props.actions.toggleCompleted(id);
    }

    getSortedList() {
        return this.props.list.sort((a, b) => {
            if (!!a.completed === !!b.completed) {
                // If both items are completed sort them in the order
                // in which they were completed
                if (a.completed) {
                    return a.completed - b.completed;
                }
                // If they aren't completed sort by their sort order
                return a.sortOrder - b.sortOrder;
            }
            // If they have different completed statuses sort by if they are completed or not.
            return a.completed ? 1 : -1;
        });
    }

    render() {
        const sortedList = this.getSortedList();
        return (
            <div className="list">
            {
                sortedList.map((item, index) => (
                    <div key={`${item.id}_list-item`} className="list-item">
                        <Checkbox
                            key={`${item.id}_checkbox`}
                            htmlId={`${item.id}_checkbox`}
                            checked={!!item.completed}
                            onChange={() => this.toggleCompleted(item.id)}
                        />
                        <TextInput
                            key={`${item.id}_text-input`}
                            id={item.id}
                            text={item.text}
                            index={index}
                            height={item.height}
                            multiline={item.multiline}
                            autoFocus={item.autoFocus}
                            onSave={(text, createNext, index, height) => this.saveItem(item.id, text, createNext, index, height)}
                            onBlur={(text) => this.blurItem(item.id, text)}
                        />
                    </div>
                ))
            }
            </div>
        );
  }
}

export default List;
