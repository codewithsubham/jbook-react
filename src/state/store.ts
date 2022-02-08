import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ActionTypes } from "./action-types";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));


const stores = store.getState();


store.dispatch({
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: "null",
        type: 'text'
    }
})

store.dispatch({
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
        id: "null",
        type: 'code'
    }
})



