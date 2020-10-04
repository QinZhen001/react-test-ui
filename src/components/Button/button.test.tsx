import React from 'react'
import {render,fireEvent} from '@testing-library/react'
import Button,{ButtonProps} from './button'


const defaultProps = {
  onClick:jest.fn()
}

const testProps:ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

describe('test Button component',()=>{
  it('should render the correct default button',()=>{
    const wrapper = render(
      <Button {...defaultProps}>Nice</Button>
    )
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect
  })
})













