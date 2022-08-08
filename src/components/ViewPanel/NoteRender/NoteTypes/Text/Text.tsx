import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { setText } from '../../../../../store/slices/folderSlice'
import s from './Text.module.scss'

type Props = {
  text: string,
  idText: string | number
}

const Text = ({text, idText}: Props) => {
  const mode = useAppSelector(state => state.folder.isChangingMode)
  const dispatch = useAppDispatch()

  const [areaValue, setAreaValue] = useState(text)

  useEffect(() => {
    if (mode === false) {
      dispatch(setText({
        text: areaValue,
        idText
      }))
    }
  }, [mode])

  if (mode) {
    return (
      <textarea 
        value={areaValue} 
        className={s.text_edit}
        placeholder='Write something here...'
        onChange={(e) => setAreaValue(e.target.value)}/>
    )
  } else if (mode === false && areaValue){
    return (
      <div className={s.text}>
        {areaValue}
      </div>
    )
  } else {
    return null
  }
  
}

export default Text