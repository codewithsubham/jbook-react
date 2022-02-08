
import { ActionTypes } from "../action-types"
import { Action } from "../actions"
import { Cell } from "../cell"
import produce from "immer"
import { stat } from "fs"

interface CellState {
    loading: boolean,
    error: boolean,
    order: string[],
    data: {
        [key: string]: Cell
    }
}

const initialState: CellState = {
    loading: false,
    error: false,
    order: [],
    data: {}
}


const cellReducers = produce((state: CellState = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;

        case ActionTypes.INSERT_CELL_BEFORE:

            const cell: Cell = {
                content: "",
                type: action.payload.type,
                id: Math.random().toString(36).substring(2, 5)
            }

            state.data[cell.id] = cell;
            const newCellIndex = state.order.findIndex(id => id === action.payload.id);
            if (newCellIndex < 0) {
                state.order.push(cell.id)
            } else {
                state.order.splice(newCellIndex, 0, cell.id);
            }
            return state;

        case ActionTypes.MOVE_CELL:
            const { direction } = action.payload;
            const index = state.order.indexOf(action.payload.id);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length - 1) return state;
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;

        case ActionTypes.DELETE_CELL:
            state.data[id].content = content;
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
            return state;

        default:
            return state;
    }
})

export default cellReducers;