import { useSelector } from "react-redux";
import { RootState } from "../state";
import CellListItems from "./CellListItems";


const CellList: React.FC = ({ children }) => {

    const cells = useSelector((state: RootState) => state.cell?.order.map((id) => state.cell?.data[id]));

    const renderList = cells?.map((cell) => <CellListItems key={cell?.id} cell={cell || ""} />)

    return <div>{renderList}</div>;

};

export default CellList;
