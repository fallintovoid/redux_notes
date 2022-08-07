import { createSlice } from "@reduxjs/toolkit";
import { idText } from "typescript";

interface InitialState {
    folder: any[],
    viewPanel: Note,
    isChangingMode: boolean
}

interface SetNamePayload {
    id: string,
    newName: string
}

interface SetNameAction {
    payload: SetNamePayload
}

interface SetTextAction {
    payload: SetTextPayload
}

interface SetTextPayload {
    idText: string,
    text: string
}

const initialState: InitialState = {
    folder: [
        {
            type: 'folder',
            id: 'global',
            open: false,
            name: 'Global',
            contains: []
        }
        
    ],
    viewPanel: {
        id: 0,
        name: 'Open new note, or create to start!',
        contains: [],
        type: 'note'
    },
    isChangingMode: false
}


function findById(acc: any, el: any, id: number | string) {
    if ( el.id === id ) return el;
    if ( el.contains ) return el.contains.reduce((acc: any, el: any) => findById(acc, el, id), acc);
    return acc;
}

const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        openNote: (state, action) => {
            state.viewPanel = action.payload
        },
        addItem: (state, action) => {
            state.folder.reduce((acc, el) => findById(acc, el, action.payload.id), null).contains.push(action.payload.obj)
        },
        setName: (state, action) => {
            const typedAction: SetNameAction = action
            
            const foundedItem = state.folder.reduce((acc, el) => findById(acc, el, typedAction.payload.id), null)
            foundedItem.name = typedAction.payload.newName
            if (foundedItem.type !== 'folder') {
                state.viewPanel.name = typedAction.payload.newName
            }
        },
        setChangingMode: (state, action) => {
            state.isChangingMode = action.payload
        },
        setText: (state, action) => {
            const typedAction: SetTextAction = action

            const foundText = state.folder.reduce((acc, el) => findById(acc, el, typedAction.payload.idText), null)
            foundText.text = typedAction.payload.text
            state.viewPanel.contains.find((item: any) => item.id === typedAction.payload.idText).text = typedAction.payload.text
        }
    }
})

const { reducer, actions } = folderSlice
export { reducer }
export const {
    openNote,
    addItem,
    setName,
    setChangingMode,
    setText
} = actions