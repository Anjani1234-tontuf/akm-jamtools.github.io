import React, { Component } from 'react';
import { render } from 'react-dom';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import './App.css'

class EditorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange: Function = (editorState) => {
        // console.log(editorState)
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return <div className = 'editor' >
            <
            Editor
        editorState = { editorState }
        onEditorStateChange = { this.onEditorStateChange }
        toolbar = {
            {
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }
        }
        /> <
        /div>
    }
}

const App = () => ( <
    div >
    <
    h2 > React Wysiwyg Rich Editor < /h2> <
    EditorContainer / >
    <
    /div>
);

render( < App / > , document.getElementById('root'));