import buildEditorState from '../utils/editor-state';

const list = (state = [], action) => {
    switch (action.type) {
        case 'GOT_LIST':
            return action.list;
        case 'ADD_LIST_ITEM':
            return [
                ...state,
                {
                    id: action.id,
                    dirty: true,
                    title: action.title,
                    text: action.text,
                    created: action.created,
                    completed: null,
                    sortOrder: action.sortOrder
                }
            ];
        case 'SET_SELECTED_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.itemId) {
                    return {
                        ...item,
                        editorState: buildEditorState(item.text)
                    };
                }
                return item;
            });
        case 'UPDATE_LIST_ITEM_TEXT':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        text: item.editorState.getCurrentContent().getPlainText()
                    };
                }
                return item;
            });
        case 'UPDATE_LIST_ITEM_EDITORSTATE':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
                        editorState: action.editorState
                    };
                }
                return item;
            });
        case 'UPDATE_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
                        title: action.title,
                        height: action.height
                    };
                }
                return item;
            });
        case 'UPDATE_LIST_ITEM_SORT_ORDER':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
                        sortOrder: action.sortOrder
                    };
                }
                return item;
            });
        case 'REMOVE_LIST_ITEM':
            const index = state.findIndex(item => item.id === action.id);
            return [...state.slice(0, index), ...state.slice(index + 1)];
        case 'TOGGLE_COMPLETED':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: true,
                        completed: !item.completed ? new Date() : null
                    };
                }
                return item;
            });
        case 'SAVED_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        dirty: false,
                        saving: false,
                        updatedAt: action.item.updatedAt
                    };
                }
                return item;
            });
        case 'SAVING_LIST_ITEM':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        saving: true
                    };
                }
                return item;
            });
        default:
            return state;
    }
};

export default list;
