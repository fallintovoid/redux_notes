import Folder from './Folder/Folder'
import Note from './Note/Note'

type Props = {
    name: string,
    type: 'folder' | 'note',
    contains: any[],
    id: string | number,
    multi: number
}

const FolderItem = (props: Props) => {

    const renderItem = (type: 'folder' | 'note') => {
        switch (type) {
            case 'folder' :
                return <Folder
                    {...props} />
            case 'note' :
                return <Note 
                    {...props}/>
            default: 
                return null
        }
    }

    return (
        <>
            {renderItem(props.type)}
        </>
    )
}

export default FolderItem