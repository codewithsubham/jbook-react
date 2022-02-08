import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { useEffect, useState } from "react";
import bundler from '../builders';
import CodeEditor from "./CodeEditor";
import Preiview from './Preiview';
import Resizable from './Resizable';
import "./CodeEditor.css"
import { Cell } from '../state';
import { useActions } from '../hooks/useAction';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

    let [code, setCode] = useState<string>('');
    const { updateCell } = useActions();


    useEffect(() => {

        const timer = setTimeout(async () => {
            setCode(await bundler(cell.content));
        }, 500)

        return () => {
            clearTimeout(timer);
        }
    }, [cell.content])



    return <Resizable direction='vertical'>
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
            <CodeEditor onChange={(value) => {
                updateCell(cell.id, value);
                //setInput(value)
            }} initialValue={cell.content} />
            <Preiview code={code} />
        </div>


    </Resizable>

}


export default CodeCell;


