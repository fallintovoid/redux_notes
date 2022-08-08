import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import NoteRender from './NoteRender/NoteRender'
import s from './ViewPanel.module.scss'
import { setName, setChangingMode, addItemNote } from '../../store/slices/folderSlice'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { v4 as uuidv4 } from 'uuid'

type Props = {}

const ViewPanel = (props: Props) => {
    const { viewPanel } = useAppSelector(state => state.folder)
    const mode = useAppSelector(state => state.folder.isChangingMode)
    const [name, setInputName] = useState(viewPanel.name)
    const dispatch = useAppDispatch() 

    useEffect(() => {
        if (mode === false && viewPanel.id) {
            dispatch(setName({
                id: viewPanel.id,
                newName: name
            }))
        }
    }, [mode])

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && mode === true) {
            dispatch(setChangingMode(false))
        }
    })

    useEffect(() => {
        setInputName(viewPanel.name)
    }, [viewPanel.name])
    
    const isChangingMode = (mode: boolean) => {
        if (mode) {
            return <input
                value={name}
                autoFocus
                onChange={(e) => setInputName(e.target.value)}/>
        } else {
            return !viewPanel.id ? 
                viewPanel.name : 
                <span className={s.title_name}>
                    {viewPanel.name}
                </span>
        }
    }

    const addItemHandler = (id: string | number) => {
        const newItem = {
            type: 'text',
            text: '',
            id: uuidv4()
        }
        dispatch(addItemNote({id, newItem}))
    }

    const plusMode = mode ? 
        <AiOutlinePlusCircle
            size='50px'
            className={s.plus}
            onClick={() => addItemHandler(viewPanel.id)}/> :
        null

    return (
        <div className={s.view_panel}>
            <div className={s.container}>
                <div className={s.title}>
                    {isChangingMode(mode)}
                    <BsFillPencilFill   
                        className={s.edit}
                        size='20px'
                        color={mode ? '#BDFD44' : 'white'}
                        onClick={() => dispatch(setChangingMode(!mode))}/>
                </div>
                <main>
                    <NoteRender 
                        items={viewPanel.contains}/>
                    {plusMode}
                </main>
            </div>
        </div>
    )
}

export default ViewPanel