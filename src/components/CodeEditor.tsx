import Editor from "@monaco-editor/react";


interface CodeEditorProps {
    initialValue: string
    onChange(value: string): void
}


const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

    return <Editor height={200}
        onChange={(value) => {
            if (!value) value = '';
            onChange(value);
        }}
        language="javascript"
        theme="vs-dark"
        value={initialValue}
        options={{
            wordWrap: "on",
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 11,
            scrollBeyondLastLine: false,
            automaticLayout: true
        }} />

}

export default CodeEditor