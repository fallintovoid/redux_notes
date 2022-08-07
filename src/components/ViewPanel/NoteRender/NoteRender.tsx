import React from 'react'
import Text from './NoteTypes/Text/Text'

import { v4 as uuidv4 } from 'uuid'

type Props = {
    items: any[]
}

const NoteRender = ({items}: Props) => {

    const renderNotes = (items: any[]): any[] => {
        return items.map((notePart, id) => {
            switch (notePart.type) {
                case 'text': 
                    return (
                        <Text 
                            key={notePart.id}
                            idText={notePart.id}
                            text={notePart.text}/>
                    )
                default: 
                    return null
            }
        })
    }

    return (
        <>
            {renderNotes(items)}
        </>
    )
}

export default NoteRender