import React,{FC, ReactElement,useState, useRef, ChangeEvent} from 'react'
import classNames from 'classnames'
import Input,{InputProps} from '../Input/input'
import  Icon from '../Icon/icon'
import Transition from '../Transition/transition'



interface DataSourceObject {
  value:string 
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
  fetchSuggestions:(str:string) => DataSourceType[] | Promise< DataSourceType[]>
  onSelect?:(item:DataSourceType) => void
  renderOption?:(item:DataSourceType) => ReactElement
}


export const AutoComplete:FC<AutoCompleteProps> = (props) => {
  const  {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps 
  } = props 

  const [inputValue,setInputValue] = useState(value as string)
  const [suggestions,setSuggestions] = useState<DataSourceType[]>([])
  const componentRef = useRef<HTMLDivElement>(null)
  const triggerSearch = useRE


  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value 
    setInputValue(value)

  }

  const handleKeyDown = ()=>{}
  
  return (
    <div className='viking-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      ></Input>
    </div>
  )
}