import React, {useState} from 'react'
import { useAppDispatch } from '../../../../hooks/hooks'
import { addItem, setName } from '../../../../store/slices/folderSlice'
import { AiFillFolder } from 'react-icons/ai'
import { FaStickyNote } from 'react-icons/fa'
import {BsFillPencilFill} from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

import s from './Folder.module.scss'

type Props = {
    name: string,
    type: 'folder' | 'note',
    id: string | number,
    multi: number
}

const Folder = ({multi, name, id}: Props) => {

    const dispatch = useAppDispatch()
    const [renameFolder, setRenameFolder] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [placeholder, setPlaceholder] = useState('')
    
    const width = Math.floor(150 - (multi === 1 ? multi : multi * 7))


    const addNewNote = (id: number | string) => {
        const newNote: Note = {
            name: 'New Note',
            contains: [
                {
                    type: 'text',
                    text: '',
                    id: uuidv4()
                }
            ],
            id: uuidv4(),
            type: 'note'
        } 
        dispatch(addItem({id, obj: newNote}))
    }

    const addNewFolder = (id: number | string) => {
        const newFolder: Folder = {
            type: 'folder',
            id: uuidv4(),
            open: false,
            name: 'New Folder',
            contains: []
        } 
        dispatch(addItem({id, obj: newFolder}))
    }

    const onKeyDownHandler = (name: string, id: string | number) => {
        if (name.length < 12) {
            setRenameFolder(false)
            dispatch(setName({id, newName: name}))

            setNameInput('')
            setPlaceholder('')
        } else {
            setNameInput('')
            setPlaceholder('Long name!')
        }
        
    }

    const interactIconsFolder = !renameFolder ? 
    [
        <AiFillFolder 
            size='20px'
            onClick={() => addNewFolder(id)}/>,
        <BsFillPencilFill
            size='20px'
            onClick={() => setRenameFolder(prev => !prev)}/>,
        <FaStickyNote 
            size='20px'
            onClick={() => addNewNote(id)}/>
    ] :
    <input 
        style={{width: '80%'}}
        value={nameInput}
        autoFocus
        placeholder={placeholder}
        onChange={(e) => setNameInput(e.currentTarget.value)}
        onKeyDown={(e) => e.key === 'Enter' ? onKeyDownHandler(nameInput, id) : null}></input>

    return (
        <div 
            className={s.folder_panel_folder} 
            style={{width: `${width}px`}}
            onMouseOut={() => {
                setRenameFolder(false)
                setNameInput('')
                setPlaceholder('')
            }}>
                <div className={s.folder_panel_item_text}>
                    <AiFillFolder/>{name}
                </div>
                <div className={s.folder_panel_item_choose}>
                    {interactIconsFolder}
                </div>
        </div>
    )
}

export default Folder