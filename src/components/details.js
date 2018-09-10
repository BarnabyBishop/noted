import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import styled from 'styled-components';
import moment from 'moment';
import buildEditorState from '../utils/editor-state';
import './details.css';

export default class Details extends Component {
    constructor(props) {
        super(props);
        const text = props.selectedListItem ? props.selectedListItem.text : '';

        this.state = {
            dragging: false,
            editorState: buildEditorState(text)
        };
        this.focus = () => this.refs.editor.focus();
        this.autosave = null;
    }

    componentDidUpdate(prevProps) {
        const { selectedListItem } = this.props;
        if (
            selectedListItem &&
            (!prevProps.selectedListItem || selectedListItem.id !== prevProps.selectedListItem.id)
        ) {
            this.setState({ editorState: buildEditorState(selectedListItem.text) });
        }
    }

    onChange(editorState) {
        this.setState({ editorState });
        clearTimeout(this.autosave);
        this.autosave = setTimeout(this.save.bind(this), 1000);
    }

    handleBlur() {
        this.save();
    }

    save() {
        const plainText = this.state.editorState.getCurrentContent().getPlainText();
        if (this.props.selectedListItem && this.props.selectedListItem.text !== plainText) {
            this.props.actions.updateListItemText(this.props.selectedListItem.id, plainText);
            this.props.actions.saveListItem(this.props.selectedListItem.id);
        }
    }

    onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    onDragEnter(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ dragging: true });
    }

    onDragLeave(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ dragging: false });
    }

    onDrop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        var firstImage;
        for (var i = 0; i < files.length; i++) {
            firstImage = files[i];
            var imageType = /^image\//;

            if (!imageType.test(firstImage.type)) {
                continue;
            }
            break;
        }

        const reader = new FileReader();
        reader.onload = this.insertImage.bind(this);
        // (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(firstImage);
    }

    insertImage(e) {
        const imageSrc = e.target.result;
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {
            src: imageSrc,
            inline: true
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.props.updateArticleField(
            this.props.field,
            AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
        );
        this.setState(
            {
                // editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
                showURLInput: false,
                urlValue: ''
            },
            () => {
                setTimeout(() => this.focus(), 0);
            }
        );
    }

    mediaBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: Image,
                editable: false
            };
        }
        return null;
    }

    render() {
        if (!this.props.selectedListItem)
            return (
                <div className="details">
                    <em>Select an item.</em>
                </div>
            );

        const { id, title, height, completed, created, sortOrder, createdAt, updatedAt } = this.props.selectedListItem;

        const { editorState } = this.state;

        return (
            <div className="details">
                <InfoPanel>
                    <InfoUpdatedAt>{updatedAt && `Saved ${moment().to(updatedAt)}`}</InfoUpdatedAt>
                    <InfoIcon className="fas fa-info">
                        <ItemRaw>
                            <div>id: {id}</div>
                            <div>title: {title}</div>
                            <div>height: {height}</div>
                            <div>sortOrder: {sortOrder}</div>
                            <div>completed: {completed && completed.toString()}</div>
                            <div>created: {created && created.toString()}</div>
                            <div>createdAt: {createdAt && createdAt.toString()}</div>
                            <div>updatedAt: {updatedAt && updatedAt.toString()}</div>
                        </ItemRaw>
                    </InfoIcon>
                </InfoPanel>
                <div className="RichEditor-root">
                    <div
                        className="RichEditor-editor"
                        onClick={this.focus.bind(this)}
                        onDragEnter={this.onDragEnter.bind(this)}
                        onDragLeave={this.onDragLeave.bind(this)}
                        onDrop={this.onDrop.bind(this)}
                    >
                        <Editor
                            blockRendererFn={this.mediaBlockRenderer.bind(this)}
                            blockStyleFn={getBlockStyle}
                            editorState={editorState}
                            onChange={this.onChange.bind(this)}
                            onTab={this.onTab.bind(this)}
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'fancy-blockquote';
        default:
            return null;
    }
}

const InfoPanel = styled.div`
    border-top: solid 1px #e5e5e5;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

const ItemRaw = styled.div`
    width: 350px;
    display: none;
    position: absolute;
    right: 5px;
    top: 15px;
    padding: 10px;
    background-color: #f1f2f3;
    text-align: left;
    border: solid 1px #ccc;
    border-radius: 5px;
`;

const InfoIcon = styled.i`
    cursor: pointer;
    width: 20px;
    margin-right: 10px;
    text-align: center;
    color: #828282;
    font-size: 10pt;
    position: relative;

    &:hover ${ItemRaw} {
        display: block;
    }
`;

const InfoUpdatedAt = styled.div`
    font-size: 8pt;
    color: #999;
`;
