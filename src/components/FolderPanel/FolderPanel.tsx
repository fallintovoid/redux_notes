import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import s from './FolderPanel.module.scss'
import FolderItem from './FolderItem/FolderItem'
import { FaStickyNote } from 'react-icons/fa'

type Props = {}

const FolderPanel = (props: Props) => {
    const dispatch = useAppDispatch()
    const { folder } = useAppSelector(state => state.folder)

    const renderItems = (folder: any[], multi = 1): any[] => {
        return folder.map(({name, type, id, items, contains}: FolderItem) => {
            if (type === 'folder' || (contains && contains.length > 0)) {
                return [<FolderItem 
                    key={id}
                    name={name} 
                    type={type} 
                    id={id} 
                    contains={contains}
                    multi={multi}/>, renderItems(contains, multi + 1)]
            } else if (type === 'note') {
                return <FolderItem
                    key={id}  
                    name={name} 
                    type={type} 
                    id={id} 
                    contains={contains}
                    multi={multi}/>
            }
        })
    }

    return (
        <div className={s.folder_panel}>
            <div className={s.folder_panel_title}>
                <FaStickyNote
                    size='30px'
                    color='#BDFD44'/>
                <div className={s.folder_panel_title_name}>
                    evernote
                </div>
            </div>
            <div className={s.container}>
                {renderItems(folder)}
            </div>
        </div>
    )
}

export default FolderPanel