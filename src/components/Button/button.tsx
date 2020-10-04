import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'


interface BaseButtonProps {
  className?:string;
  // 是否禁用
  disabled?:boolean
  // 尺寸
  size?:ButtonSize
  // 类型
  btnType?:ButtonType
  children:React.ReactNode
  href?:string 
}


type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    size,
    disabled,
    children,
    href,
    ...restProps
  } = props

  const classes = classNames('btn',className,{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    'disabled':(btnType === 'link') && disabled
  })

  if(btnType === 'link' && href){
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
       >
         {children}
      </a>
    )
  }else{
    return (
      <button className={classes} disabled={disabled} {...restProps}>
       {children} 
      </button>
    )
  }
}

Button.defaultProps = {
  disabled:false,
  btnType:'default'
}

export default Button














