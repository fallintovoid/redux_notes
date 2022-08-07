import React, { useEffect, useState, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import NoteRender from './NoteRender/NoteRender'
import s from './ViewPanel.module.scss'
import { setName, setChangingMode } from '../../store/slices/folderSlice'
import { BsFillPencilFill } from 'react-icons/bs'

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
                onChange={(e) => setInputName(e.target.value)}/>
        } else {
            return !viewPanel.id ? 
                viewPanel.name : 
                <span className={s.title_name}>
                    {viewPanel.name}
                </span>
        }
    }

    return (
        <div className={s.view_panel}>
            <div className={s.container}>
                <div className={s.title}>
                    {isChangingMode(mode)}
                    <BsFillPencilFill   
                        className={s.edit}
                        size='20px'
                        color={mode ? '#E400FF' : undefined}
                        onClick={() => dispatch(setChangingMode(!mode))}/>
                </div>
                <main>
                    <NoteRender 
                        items={viewPanel.contains}/>
                </main>
            </div>
        </div>
    )
}

export default ViewPanel