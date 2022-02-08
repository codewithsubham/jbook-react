
import { ActionTypes } from "../action-types"
import { CellTypes } from "../cell"

export interface MoveCell {
    type: ActionTypes.MOVE_CELL,
    payload: {
        id: string,
        direction: Direction
    }
}

export interface InsertCellBefore {
    type: ActionTypes.INSERT_CELL_BEFORE
    payload: { id: string, type: CellTypes }
}

export interface UpdateCell {
    type: ActionTypes.UPDATE_CELL,
    payload: {
        id: string,
        content: string
    }

}

export interface DeleteCell {
    type: ActionTypes.DELETE_CELL,
    payload: string
}


export type Action = | MoveCell | DeleteCell | InsertCellBefore | UpdateCell;


export type Direction = 'up' | 'down';