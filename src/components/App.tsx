import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";

const App: React.FC = () => {

    let [input, setInput] = useState<string>('');
    let [code, setCode] = useState<string>('');
    let ref = useRef<any>();
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const onClick = async () => {
        if (!ref.current) return;
        const result = await esbuild.transform(input, {
            loader: "jsx",
            target: "es2015",
        })
        setCode(result.code);
    }

    const startService = async () => {
        const service = await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        ref.current = true;
        console.log(service);
    }

    useEffect(() => {
        startService()
    }, []);


    return <>
        <div>
            <textarea cols={30} rows={10} value={input} onChange={(e) => onChange(e)}></textarea>
        </div>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>
            {code}
        </pre>
    </>
}


export default App;