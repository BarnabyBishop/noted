import React, { Component } from 'react';
import './details.css';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';



export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false
        };
        this.focus = () => this.refs.editor.focus();
        this.autosave = null;
    }

    onChange(editorState) {
        this.props.actions.updateListItemEditorState(this.props.selectedListItem.id, editorState);
        clearTimeout(this.autosave);
        this.autosave = setTimeout(this.save.bind(this), 1000);
    }

    handleBlur() {
        this.save();
    }

    save() {
        this.props.actions.updateListItemText(this.props.selectedListItem.id);
        this.props.actions.saveListItem(this.props.selectedListItem.id);
    }

    onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
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
        const { editorState } = this.props;
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
        if (!this.props.selectedListItem) return <div className="details column-right"><em>Select an item.</em></div>;

        const { editorState } = this.props.selectedListItem;
        return (
            <div className="details column-right">
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

