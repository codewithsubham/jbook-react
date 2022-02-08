import { combineReducers } from "redux";
import cellReducers from "./cellReducers";

const reducers = combineReducers({
    cell: cellReducers
})


export default reducers;


export type RootState = ReturnType<typeof reducers>;