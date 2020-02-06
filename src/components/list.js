import React, { Component } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getMiddleSortOrder } from '../utils/sort-utils';
import TextInput from './text-input';
import Checkbox from './checkbox';
import './list.css';
import Loader from './loader';

class List extends Component {
    constructor(params) {
        super(params);
        this.state = {
            infoVisible: false
        };
    }

    addItem(title, index) {
        const { actions, filterType, currentDate, currentTag } = this.props;
        // If a tag is selected give the item the new tag - not created date
        let createdDate,
            text = null;
        if (filterType === 'tag') {
            text = '\n' + currentTag;
        } else {
            createdDate = currentDate;
        }
        actions.addListItem(title, createdDate, index, text);
    }

    addNextItem(id) {
        const sortedList = this.getSortedList();
        const currentItem = _.find(sortedList, { id });
        const currentIndex = sortedList.indexOf(currentItem);
        const nextItem = sortedList[currentIndex + 1];
        const middleIndex = getMiddleSortOrder(currentItem && currentItem.sortOrder, nextItem && nextItem.sortOrder);
        this.addItem(null, middleIndex);
    }

    updateItem(id, title, createNext, index, height) {
        this.props.actions.updateListItem(id, title, height);
        if (createNext) {
            this.addNextItem(id);
        }
    }

    focusItem(id) {
        this.props.actions.setSelectedListItem(id);
    }

    saveItem(id, title) {
        if (!title) {
            this.props.actions.removeListItem(id);
        } else {
            this.props.actions.saveListItem(id);
        }
    }

    toggleCompleted(id) {
        this.props.actions.toggleCompleted(id);
        this.props.actions.saveListItem(id);
    }

    getSortedList() {
        // Create copy of array as redux state is immutable and sort it
        return Array.from(this.props.list).sort((a, b) => {
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
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const movingUp = sourceIndex - destinationIndex > 0;
        const prevIndex = movingUp ? destinationIndex - 1 : destinationIndex;
        const nextIndex = movingUp ? destinationIndex : destinationIndex + 1;
        const sortedList = this.getSortedList();
        const currentItem = sortedList[sourceIndex];
        const currentId = currentItem.id;
        const newPositionItem = sortedList[prevIndex];
        const nextPositionItem = sortedList[nextIndex];
        const middleSortOrder = getMiddleSortOrder(
            newPositionItem && newPositionItem.sortOrder,
            nextPositionItem && nextPositionItem.sortOrder
        );
        this.props.actions.updateListItemSortOrder(currentItem.id, middleSortOrder);
        this.props.actions.saveListItem(currentId);
    }

    toggleInfo() {
        this.setState({ infoVisible: !this.state.infoVisible });
    }

    editItem(id) {
        this.props.actions.setSelectedListItem(id);
        this.props.actions.setModalActive();
    }

    render() {
        if (!this.props.list || this.props.loading) return <Loader />;

        const sortedList = this.getSortedList();
        const { selectedListItem } = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="list" ref={provided.innerRef}>
                            {sortedList.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                style={provided.draggableStyle}
                                                key={`${item.id}_list-item`}
                                                className={classnames({
                                                    'list-item': 'list-item',
                                                    'list-item--saving': item.saving,
                                                    'list-item--completed': item.completed,
                                                    'list-item--selected':
                                                        selectedListItem && selectedListItem.id === item.id
                                                })}
                                                {...provided.draggableProps}
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
                                                    text={item.title}
                                                    index={index}
                                                    height={item.height}
                                                    multiline={item.multiline}
                                                    autoFocus={item.autoFocus}
                                                    onChange={(title, createNext, index, height) =>
                                                        this.updateItem(item.id, title, createNext, index, height)
                                                    }
                                                    onSave={title => this.saveItem(item.id, title)}
                                                    onFocus={this.focusItem.bind(this, item.id)}
                                                />
                                                <EditButton
                                                    onClick={() => this.editItem(item.id)}
                                                    className="fas fa-pencil-alt"
                                                />
                                                <MoveButton className="fas fa-bars" onClick={e => e.preventDefault()} />
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

const EditButton = styled.i`
    color: #aaa;
    display: none;
    @media (max-width: 420px) {
        display: block;
    }
`;

const MoveButton = styled.i`
    color: #aaa;
    display: none;
    @media (max-width: 420px) {
        display: block;
    }
`;

export default List;
