import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import moment from 'moment';
import RichEditor from './editor';
import { sortList, getMiddleSortOrder } from '../utils/sort-utils';

const inputTypes = {
    title: 'title',
    text: 'text',
};

let titleRefs = {};
let textRefs = {};

export default ({ actions, list, tags, tag, date, search, selectedListItem, loading, filterType, modalActive }) => {
    useEffect(() => {
        // Clear the textRefs if the component is remounted
        titleRefs = {};
        textRefs = {};
    }, []);

    const sortedList = sortList(list);

    const addItem = (currentItemId) => {
        const currentItem = sortedList.find((item) => item.id === currentItemId);
        const currentIndex = sortedList.indexOf(currentItem);
        const nextItem = sortedList[currentIndex + 1];
        const middleIndex = getMiddleSortOrder(currentItem && currentItem.sortOrder, nextItem && nextItem.sortOrder);
        actions.addListItem('', new Date(), middleIndex, '#today');
    };

    let autosave;
    const updateItem = (id, title) => {
        actions.updateListItem(id, title);
        clearTimeout(autosave);
        if (title) {
            autosave = setTimeout(saveItem(id, title), 1000);
        }
    };

    const saveItem = (id, title) => {
        if (!title) {
            actions.removeListItem(id);
        } else {
            actions.saveListItem(id);
        }
    };

    const specialKey = (e, id, type) => {
        // Tab to the next text field
        if (type === inputTypes.title) {
            if (e.key === 'Enter') {
                if (e.shiftKey || e.metaKey) {
                    e.preventDefault();
                    // Create new item!
                    addItem(id);
                } else {
                    e.preventDefault();
                    textRefs[id].current.focus();
                }
            }
        } else if (type === inputTypes.text) {
            if (e.key === 'Enter' && (e.shiftKey || e.metaKey)) {
                e.preventDefault();
                // Create new item!
                addItem(id);
            }
        }
    };

    const completed = (id) => {
        actions.toggleCompleted(id);
    };

    return (
        <Container>
            <div>LHC</div>
            <div>
                <h1>{`${moment().format('dddd, D MMM YYYY')}`}</h1>
                {
                    <List>
                        {sortedList.map((item, index) => {
                            return (
                                <ListItem key={`${item.id}_item`}>
                                    {item.text.indexOf('#today') > -1 && (
                                        <Checkbox completed={item.completed} onClick={() => completed(item.id)} />
                                    )}
                                    <TextArea
                                        value={item.title}
                                        onChange={(e) => updateItem(item.id, e.target.value)}
                                        onKeyDown={(e) => specialKey(e, item.id, inputTypes.title)}
                                        completed={item.completed}
                                        inputRef={(ref) => (titleRefs[item.id] = ref)}
                                        autoFocus={!item.title}
                                        rows="1"
                                    />
                                    <EditorContainer
                                        hidden={!item.text || item.text === '#today'}
                                        onKeyDown={(e) => specialKey(e, item.id, inputTypes.text)}
                                    >
                                        <RichEditor
                                            actions={actions}
                                            selectedListItem={item}
                                            setTextRef={(ref) => (textRefs[item.id] = ref)}
                                        />
                                    </EditorContainer>
                                </ListItem>
                            );
                        })}
                    </List>
                }
            </div>
        </Container>
    );
};

const Checkbox = styled.span`
    display: inline-block;
    border: solid 2px #555;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    margin-right: 5px;
    margin-top: 4px;

    ${(p) => p.completed && 'background-color: #05e605;'}
`;

const EditorContainer = styled.div`
    font-size: 15px;
    margin-left: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #222;
    grid-column: 1 / 3;

    ${(p) => p.hidden && 'display: none;'}
`;

const TextArea = styled(TextareaAutosize)`
    resize: none;
    outline: none;
    border: 0;
    width: 90%;
    font-size: 16px;

    ${(p) => p.completed && 'color: #777;'}
`;

const List = styled.ul``;

const ListItem = styled.li`
    /* border-bottom: solid 1px #e5e5e5; */
    margin-bottom: 15px;
    list-style-type: none;
    position: relative;
    display: grid;
    grid-template-columns: 20px 1fr;

    :before {
        content: ' ';
        position: absolute;
        left: -13px;
        top: 9px;
        border-radius: 50%;
        width: 5px;
        height: 5px;
        background-color: #555;
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px auto;
    padding: 20px;

    @media (max-width: 420px) {
        grid-template-columns: 100%;
    }
`;
