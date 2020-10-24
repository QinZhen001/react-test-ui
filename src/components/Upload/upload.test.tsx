import React,{MouseEvent, createContext} from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'
import Upload, { UploadProps } from './upload'

interface MockIconProps {
  icon:string,
  onClick:(e:MouseEvent)=>void
}

jest.mock('../Icon/icon',()=>{
  return({
    icon,
    onClick
  }:MockIconProps) => {
    return (
      <span onClick={onClick}>{icon}</span>
    )
  }
})

jest.mock('axios')
// mock axios 之后 有代码提示
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps:UploadProps = {
  action: "fakeurl.com",
  onSuccess:jest.fn(),
  onChange:jest.fn(),
  onRemove:jest.fn(),
  drag: true
}

const testFile = new File(['xyz'],'test.png',{
  type:'image/png'
})


let wrapper:RenderResult
let fileInput:HTMLInputElement
let uploadArea:HTMLElement

describe('test upload component',()=>{
  beforeEach(()=>{
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement 
  })
  it('upload process should works fine',async ()=>{
    const { queryByText } = wrapper
    // 模拟response
    mockedAxios.post.mockResolvedValue({
      data:'cool'
    })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput,{
      target:{files: [testFile]}
    })
    expect(queryByText('spinner')).toBeInTheDocument()
    await wait(()=>{
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    // remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times')!)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw:testFile,
      status:'success',
      name:'test.png'
    }))
  })
  it('drag and drop files should works fine',async ()=>{
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent,'dataTransfer',{
      value:{
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)
    await wait(()=>{
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })

})










