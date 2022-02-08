
import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css'

interface ResizableProps {
    direction: 'horizontal' | 'vertical',
}


const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    let resizableProps: ResizableBoxProps;

    let [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const listener = () => {

            setInnerHeight(window.innerHeight);
        }
        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        }

    }, [])

    if (direction === 'vertical') {
        resizableProps = {
            resizeHandles: ['s'],
            height: 300,
            maxConstraints: [Infinity, innerHeight * 0.9],
            width: Infinity
        }
    } else {
        resizableProps = {
            className: 'resize-horizontal',
            resizeHandles: ['e'],
            height: Infinity,
            minConstraints: [innerHeight * 0.2, Infinity],
            maxConstraints: [innerHeight * 0.75, Infinity],
            width: innerHeight * 0.75
        }
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
