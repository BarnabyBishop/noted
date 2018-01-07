import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
    this.addItem(null, middleIndex);
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

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sortedList = this.getSortedList();
    const currentItem = sortedList[result.source.index];
    const currentId = currentItem.id;
    const newPositionItem = sortedList[result.destination.index];
    const nextPositionItem = sortedList[result.destination.index + 1];
    const middleSortOrder = getMiddleSortOrder(
      newPositionItem && newPositionItem.sortOrder,
      nextPositionItem && nextPositionItem.sortOrder
    );
    this.props.actions.updateListItemSortOrder(currentItem.id, middleSortOrder);
    this.props.actions.saveListItem(currentId);
  }

  render() {
    const sortedList = this.getSortedList();
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div className="list" ref={provided.innerRef}>
              {sortedList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id}>
                  {(provided, snapshot) => (
                    <div className="list-item-container">
                      <div
                        ref={provided.innerRef}
                        key={`${item.id}_list-item`}
                        className={classnames({
                          'list-item': 'list-item',
                          'list-item--saving': item.saving
                        })}
                        style={provided.draggableStyle}
                        {...provided.dragHandleProps}
                      >
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
                          onSave={(text, createNext, index, height) =>
                            this.saveItem(item.id, text, createNext, index, height)
                          }
                          onBlur={text => this.blurItem(item.id, text)}
                        />
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default List;
