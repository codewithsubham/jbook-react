import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellItemListProps {
    cell: Cell
}

const CellListItems: React.FC<CellItemListProps> = ({ cell }) => {

    let child: JSX.Element;

    if (cell?.type === 'code') {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />
    }

    return <div>{child}</div>;

};

export default CellListItems;
