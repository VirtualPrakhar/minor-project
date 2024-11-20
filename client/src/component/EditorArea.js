import React, { useEffect, useRef} from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror";

function EditorArea(){
    const editorRef = useRef(null);
    useEffect(() => {
        const init = async () =>{
            const editor = Codemirror.fromTextArea(
                document.getElementById("realTimeEditor"),
                {
                    mode: {name: "javascript", json: true},
                    theme: "dracula",
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );
            editor.setSize(null, '100%');
        };
        init();
    },[]);
    return (
        <div style={{height:"600%"}}>
            <textarea id="realTimeEditor"></textarea>
        </div>
    );
}

export default EditorArea;