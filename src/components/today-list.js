import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import uuid from 'uuid/v4';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import gql from 'graphql-tag';
import RichEditor from './editor';
import { Title } from './today-title';
import { getMiddleSortOrder } from '../utils/sort-utils';

const inputTypes = {
    title: 'title',
    text: 'text',
};

// let titleRefs = {};
// let textRefs = {};
let refs = {
    title: {},
    text: {},
};

const UPDATE_ITEM = gql`
    mutation Mutation(
        $id: ID
        $userId: ID
        $title: String
        $text: String
        $sortOrder: Int
        $created: String
        $completed: String
    ) {
        updateItem(
            id: $id
            userId: $userId
            title: $title
            text: $text
            sortOrder: $sortOrder
            created: $created
            completed: $completed
        ) {
            id
        }
    }
`;

export const List = ({ sortedList, loading, error, actions, userId }) => {
    console.log('RENDER LIST');

    /*
    Current
    - Keep list as state
    - On state change update list in local state
    - On mutation 

    New:
    - Text box keeps text state, text box chooses when to mutate
    - checkbox keeps state checkbox chooses when to mutate
    */

    const [list, useList] = useState(sortedList.map((item) => ({ ...item, showText: false })));
    const [updateItemMutation] = useMutation(UPDATE_ITEM);

    // , {
    //     update(cache, { data: { result } }) {
    //         const cached = cache.readQuery({ query: itemByDateQuery });
    //         console.log(cached);
    //         console.log(result);
    //         const updatedList = cached.map((item) => {
    //             if (item.id === result.id) {
    //                 return result;
    //             }
    //             return item;
    //         });
    //         cache.writeQuery({
    //             query: itemByDateQuery,
    //             data: { updatedList },
    //         });
    //     },
    // }

    // useEffect(() => {
    //     // Clear the textRefs if the component is remounted
    //     titleRefs = {};
    //     textRefs = {};

    // }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!list) return <p>Nothing found...</p>;

    const addItem = (currentItemId) => {
        const currentItem = list.find((item) => item.id === currentItemId);
        const currentIndex = list.indexOf(currentItem);
        const nextItem = list[currentIndex + 1];
        const middleIndex = getMiddleSortOrder(currentItem && currentItem.sortOrder, nextItem && nextItem.sortOrder);
        useList([
            ...list.slice(0, currentIndex + 1),
            { id: uuid(), title: '', text: '#today', created: new Date(), sortOrder: middleIndex },
            ...list.slice(currentIndex + 1),
        ]);
        // actions.addListItem('', new Date(), middleIndex, '#today');
    };

    const saveItem = (item, updates) => {
        updateItemMutation({
            variables: {
                userId,
                ...item,
                ...updates,
            },
        });
        // if (!title) {
        //     actions.removeListItem(id);
        // } else {
        //     actions.saveListItem(id);
        // }
    };

    console.log(list);
    // let autosave;
    // const updateItem = (id, title) => {
    //     const updatedList = list.map((item) => {
    //         if (item.id === id) {
    //             return {
    //                 ...item,
    //                 title: title,
    //             };
    //         }
    //         return item;
    //     });
    //     useList(updatedList);
    //     // clearTimeout(autosave);
    //     // if (title) {
    //     //     autosave = setTimeout(saveItem(id, title), 1000);
    //     // }
    // };

    const action = (e, id, type) => {
        // Tab to the next text field
        if (type === inputTypes.title) {
            if (e.key === 'Enter') {
                if (e.shiftKey || e.metaKey) {
                    e.preventDefault();
                    // Create new item!
                    addItem(id);
                } else {
                    e.preventDefault();
                    refs['text'][id].current.focus();
                    const currentItem = list.find((item) => item.id === id);
                    if (currentItem.text === '#today') {
                        useList(
                            list.map((item) => {
                                if (item.id === id) {
                                    return {
                                        ...item,
                                        text: "'\n#today",
                                    };
                                }
                                return item;
                            })
                        );
                    }
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
        // actions.toggleCompleted(id);
        console.log('comple');
    };

    return (
        <ul>
            {list.map((item) => {
                return (
                    <ListItem key={`${item.id}_item`}>
                        {item.text.indexOf('#today') > -1 ? (
                            <Checkbox completed={item.completed} onClick={() => completed(item.id)} />
                        ) : (
                            <span />
                        )}
                        {/* <TextArea
                            value={item.title}
                            onChange={(e) => updateItem(item.id, e.target.value)}
                            onKeyDown={(e) => specialKey(e, item.id, inputTypes.title)}
                            completed={item.completed}
                            inputRef={(ref) => (titleRefs[item.id] = ref)}
                            autoFocus={!item.title}
                            rows="1"
                        /> */}
                        <Title
                            id={item.id}
                            title={item.title}
                            completed={item.completed}
                            action={action}
                            save={(id, title) => saveItem(item, { id, title })}
                            registerRef={(ref) => (refs['title'][item.id] = ref)}
                        />
                        <EditorContainer hidden={!item.showText} onKeyDown={(e) => action(e, item.id, inputTypes.text)}>
                            <RichEditor
                                actions={actions}
                                selectedListItem={item}
                                registerRef={(ref) => (refs['text'][item.id] = ref)}
                            />
                        </EditorContainer>
                    </ListItem>
                );
            })}
        </ul>
    );
};

const EditorContainer = styled.div`
    font-size: 15px;
    margin-left: 40px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #222;
    grid-column: 1 / 3;

    ${(p) =>
        p.hidden &&
        `
        :first-child {
            display: none;
        }
    `}
`;

const ListItem = styled.li`
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

const TextArea = styled(TextareaAutosize)`
    resize: none;
    outline: none;
    border: 0;
    width: 90%;
    font-size: 16px;

    ${(p) => p.completed && 'color: #777;'}
`;
