import React from 'react'
import {render,fireEvent,screen} from '@testing-library/react'
import {Input,InputProps} from './input'


const defaultProps:InputProps = {
  onChange:jest.fn(),
  placeholder: 'test-input'
}

describe('test Input component',()=>{
  it('should render the correct default Input',()=>{
    const wrapper = render(
      <Input {...defaultProps}></Input>
    )
    const testNode = wrapper.getByPlaceholderText('test-input')  as HTMLInputElement 
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('viking-input-inner')  
    fireEvent.change(testNode, {target:{value:'23'}})  
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(testNode.value).toEqual('23')
  })
  it('should render the disabled Input on disabled property',()=>{
    const wrapper = render(
      <Input disabled placeholder="disabled"></Input>
    )
    const testNode  = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    expect(testNode.disabled).toBeTruthy()
  })
  it('should render different input sizes on size property',()=>{
    const wrapper = render(
      <Input  placeholder="sizes" size="lg"></Input>
    )
    const testnNode = wrapper.container.querySelector('.viking-input-wrapper')
  })
})