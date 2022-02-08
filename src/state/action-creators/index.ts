import { DeleteCell, Direction, InsertCellBefore, MoveCell, UpdateCell } from "../actions";
import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";


export const updateCell = (id: string, content: string): UpdateCell => {
    return {
        type: ActionTypes.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}



export const moveCell = (id: string, direction: Direction): MoveCell => {
    return {
        type: ActionTypes.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const insertCellBefore = (id: string, type: CellTypes): InsertCellBefore => {

    return {
        type: ActionTypes.INSERT_CELL_BEFORE,
        payload: { id, type }
    }
}
export const deleteCell = (id: string): DeleteCell => {
    return {
        type: ActionTypes.DELETE_CELL,
        payload: id
    }
}