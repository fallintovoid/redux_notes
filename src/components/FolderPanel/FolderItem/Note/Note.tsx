import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { openNote, setName } from '../../../../store/slices/folderSlice'
import { FaStickyNote } from 'react-icons/fa'
import {BsFillPencilFill} from 'react-icons/bs'

import s from './Note.module.scss'

type Props = {
    name: string,
    type: 'folder' | 'note',
    contains: any[],
    id: string | number,
    multi: number
}

const Note = ({ id, type, multi, name, contains }: Props) => {

    const dispatch = useAppDispatch()
    const mode = useAppSelector(state => state.folder.isChangingMode)
 
    const width = Math.floor(150 - (multi === 1 ? multi : multi * 7))

    const onClickHandler = ({name, id, type, contains}: Note) => {
        if (type === 'note' && mode === false) {
            const newViewPanel = {
                name,
                id,
                type,
                contains
            }
            dispatch(openNote(newViewPanel))
        }
    }

    return (
        <div 
            className={s.folder_panel_note} 
            onClick={() => onClickHandler({name, id, type, contains})}
            style={{width: `${width}px`}}>
                <div className={s.folder_panel_item_text}>
                    <FaStickyNote/>{name}
                </div>
        </div>
    )
}

export default Note