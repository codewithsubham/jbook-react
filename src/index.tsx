import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";
import App from "./components/App"
import CellList from "./components/CellList";



ReactDom.render(<Provider store={store}>
    <CellList>
        <App />
    </CellList>
</Provider>, document.querySelector("#root"));