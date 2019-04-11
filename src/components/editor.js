import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';

import Prism from 'prismjs';
import React from 'react';

/**
 * Add the markdown syntax to Prism.
 */

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

class RichEditor extends React.Component {
    constructor(props) {
        super(props);

        const text = this.props.selectedListItem ? this.props.selectedListItem.text : '';

        this.state = {
            editorState: Plain.deserialize(text)
        };
        this.autosave = null;
    }

    componentDidUpdate(prevProps) {
        const { selectedListItem } = this.props;
        if (
            selectedListItem &&
            (!prevProps.selectedListItem || selectedListItem.id !== prevProps.selectedListItem.id)
        ) {
            this.setState({ editorState: Plain.deserialize(selectedListItem.text) });
        }
    }

    onChange(slateStuff) {
        this.setState({ editorState: slateStuff.value });
        clearTimeout(this.autosave);
        this.autosave = setTimeout(this.save.bind(this), 1000);
    }

    handleBlur() {
        this.save();
    }

    save() {
        const plainText = Plain.serialize(this.state.editorState);
        if (this.props.selectedListItem && this.props.selectedListItem.text !== plainText) {
            this.props.actions.updateListItemText(this.props.selectedListItem.id, plainText);
            this.props.actions.saveListItem(this.props.selectedListItem.id);
        }
    }

    render() {
        return (
            <Editor
                placeholder="Nothing to see here..."
                value={this.state.editorState}
                renderMark={this.renderMark}
                decorateNode={this.decorateNode}
                onChange={this.onChange.bind(this)}
            />
        );
    }

    renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props;

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>;

            case 'code':
                return <code {...attributes}>{children}</code>;

            case 'italic':
                return <em {...attributes}>{children}</em>;

            case 'underlined':
                return <u {...attributes}>{children}</u>;

            case 'title': {
                return (
                    <span
                        {...attributes}
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            margin: '10px 0 10px 0',
                            display: 'inline-block'
                        }}
                    >
                        {children}
                    </span>
                );
            }

            case 'punctuation': {
                return (
                    <span {...attributes} style={{ opacity: 0.2 }}>
                        {children}
                    </span>
                );
            }

            case 'list': {
                return (
                    <span
                        {...attributes}
                        style={{
                            paddingLeft: '10px',
                            lineHeight: '10px',
                            fontSize: '20px'
                        }}
                    >
                        {children}
                    </span>
                );
            }

            case 'hr': {
                return (
                    <span
                        {...attributes}
                        style={{
                            borderBottom: '2px solid #000',
                            display: 'block',
                            opacity: 0.2
                        }}
                    >
                        {children}
                    </span>
                );
            }

            default: {
                return next();
            }
        }
    };

    decorateNode(node, editor, next) {
        const others = next() || [];
        if (node.object !== 'block') return others;

        const string = node.text;
        const texts = node.getTexts().toArray();
        const grammar = Prism.languages.markdown;
        const tokens = Prism.tokenize(string, grammar);
        const decorations = [];
        let startText = texts.shift();
        let endText = startText;
        let startOffset = 0;
        let endOffset = 0;
        let start = 0;

        function getLength(token) {
            if (typeof token === 'string') {
                return token.length;
            } else if (typeof token.content === 'string') {
                return token.content.length;
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0);
            }
        }

        for (const token of tokens) {
            startText = endText;
            startOffset = endOffset;

            const length = getLength(token);
            const end = start + length;

            let available = startText.text.length - startOffset;
            let remaining = length;

            endOffset = startOffset + remaining;

            while (available < remaining) {
                endText = texts.shift();
                remaining = length - available;
                available = endText.text.length;
                endOffset = remaining;
            }

            if (typeof token !== 'string') {
                const dec = {
                    anchor: {
                        key: startText.key,
                        offset: startOffset
                    },
                    focus: {
                        key: endText.key,
                        offset: endOffset
                    },
                    mark: {
                        type: token.type
                    }
                };

                decorations.push(dec);
            }

            start = end;
        }

        return [...others, ...decorations];
    }
}

export default RichEditor;
