import React,{FC,ReactElement,InputHTMLAttributes,ChangeEvent} from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
import { ifError } from 'assert'

type InputSize =  'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
  // 是否禁用
  disabled?:boolean
  size?:InputSize
  icon?:IconProp,
  // 前缀 
  prepend?: string | ReactElement
  // 后缀
  append?:string | ReactElement
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void 
}

// Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
export const Input:FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps 
  } = props
  
  const cnames = classNames('viking-input-wrapper',{
    [`input-size-${size}`]:size,
    'is-disabled':disabled,
    'input-group':prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  
  const fixControlledValue = (value:any) => {
    if(typeof value === 'undefined' || value === null){
      return ''
    }
    return value 
  }

  if('value' in props){
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div></div>
  )
} 