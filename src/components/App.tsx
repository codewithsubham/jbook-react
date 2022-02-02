import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { fetchPlugin } from "../plugins/fetch-plugin";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import CodeEditor from "./CodeEditor";

const App: React.FC = () => {

    let [input, setInput] = useState<string>('');
    let ref = useRef<boolean>(false);
    let frameRef = useRef<any>();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const onClick = async () => {
        if (!ref.current) return;

        frameRef.current.srcDoc = html;

        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.node.NODE_ENV': "production",
                global: "window"
            }
        })
        //setCode(result.outputFiles[0].text)

        frameRef.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
    }

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener("message", (event)=>{
                        try{
                            eval(event.data)
                        }catch(err){
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div>'
                               + err +
                            '</div>'
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;

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
            <CodeEditor onChange={(value) => {
                setInput(value)
            }} initialValue={input} />
            <textarea cols={30} rows={10} value={input} onChange={(e) => onChange(e)}></textarea>
        </div>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>

        <iframe ref={frameRef} sandbox="allow-scripts" srcDoc={html}></iframe>

    </>
}


export default App;