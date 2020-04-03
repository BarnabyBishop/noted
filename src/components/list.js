import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getMiddleSortOrder } from '../utils/sort-utils';
import TextInput from './text-input';
import Checkbox from './checkbox';
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
            text = '\n' + currentTag.tagName;
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
        const { selectedListItem, currentTag } = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="droppable">
                    {provided => (
                        <ListContainer innerRef={provided.innerRef}>
                            {sortedList.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {provided => (
                                        <div>
                                            <ListItem
                                                innerRef={provided.innerRef}
                                                style={provided.draggableStyle}
                                                key={`${item.id}_list-item`}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                saving={item.saving}
                                                completed={item.completed}
                                                selected={selectedListItem && selectedListItem.id === item.id}
                                            >
                                                <Checkbox
                                                    key={`${item.id}_checkbox`}
                                                    htmlId={`${item.id}_checkbox`}
                                                    checked={!!item.completed}
                                                    enabled={currentTag.todo}
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
                                                    completed={currentTag.todo && !!item.completed}
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
                                            </ListItem>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ListContainer>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const ListContainer = styled.div`
    width: 100%;
    display: inline-block;
    vertical-align: top;
`;

const ListItem = styled.div`
    display: grid;
    padding: 5px 10px 10px 8px;
    background-color: #fff;
    justify-items: center;
    align-items: center;
    grid-template-columns: 10% 70% 10% 10%;

    ${p =>
        p.selected &&
        `
        border-left: solid 4px #4990fe;
        padding-left: 4px;
    `}

    ${p =>
        p.saving &&
        `
        background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(0, 0, 0, 0) 25%,
            rgba(0, 0, 0, 0) 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            rgba(0, 0, 0, 0) 75%,
            rgba(0, 0, 0, 0) 0
        ),
        rgba(177, 215, 255, 0.5);
        background-size: 20px 20px;
    `}
`;

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
