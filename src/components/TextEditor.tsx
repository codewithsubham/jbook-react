
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { useActions } from '../hooks/useAction';
import { Cell } from '../state';


interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [value, setValue] = useState("");
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    const { updateCell } = useActions();

    useEffect(() => {
        cell
        const listener = (e: MouseEvent) => {
            if (editorContainerRef.current && e.target && editorContainerRef.current?.contains(e.target as Node)) return;
            setEditing(false);
        };

        document.addEventListener("click", listener, { capture: true });

        return () => {

            document.removeEventListener("click", listener, { capture: true });
        }
    })

    if (editing) {
        return (
            <div ref={editorContainerRef}>
                <MDEditor
                    value={value}
                    onChange={(e) => {
                        if (!e) e = "";
                        updateCell(cell.id, e);
                        setValue(e);
                    }}
                />
            </div>
        )
    }

    return (
        <div className="container" onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={"# header"} />
        </div>)

};

export default TextEditor;
