import { useEffect, useRef } from "react";
import "./preview.css"

interface PreviewProps {
    code: string
}



const html = `
<html>
    <head>
        <title>asdas<title>
    </head>
    <body>
        <div id="root" class="test"></div>
        <script>
            console.log("Asdasd")
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

const Preiview: React.FC<PreviewProps> = ({ code }) => {

    let frameRef = useRef<any>();


    useEffect(() => {
        frameRef.current.srcDoc = html;

        setTimeout(() => {
            frameRef.current.contentWindow.postMessage("console.log('asd')", "*");
        }, 500)


    }, [code])


    return <div className="preview-wrapper"><iframe style={{ backgroundColor: "white", height: "100%" }} title="asd" ref={frameRef} sandbox="allow-scripts" srcDoc={html} /></div>;
};
export default Preiview;
