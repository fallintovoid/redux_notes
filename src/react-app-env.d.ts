/// <reference types="react-scripts" />

interface FolderItem {
    type: 'folder' | 'note',
    id: number | string,
    open: boolean,
    name: string,
    contains: any[],
    items: any[]
}

interface Folder {
    type: 'folder',
    id: number | string,
    open: boolean,
    name: string,
    contains: any[]
}

interface Note {
    type: 'note' | 'folder',
    id: string | number,
    contains: any[],
    name: string
}