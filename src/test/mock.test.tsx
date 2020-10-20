import React from 'react'
import axios from 'axios'

const mockCallback = jest.fn(x => x +42)

jest.mock('axios')

// https://jestjs.io/docs/en/mock-functions
describe('test mock',()=>{
  it('mock fn',()=>{
    mockCallback(0)
    mockCallback(1)
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.calls[0][0]).toBe(0)
    expect(mockCallback.mock.calls[1][0]).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe(42)
  })
  // it('mock property',()=>{
  //   const myMock = jest.fn();
  //   const a = new myMock()
  //   const b = {}
  //   const bound = myMock.bind(b)
  //   bound();
  //   console.log('myMock.mock.instances',myMock.mock.instances)
  // })
  // it('mock function return value',()=>{
  //   const myMock = jest.fn();
  //   // console.log(myMock()) // undefined
  //   myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true)
  //   let res1 = myMock()
  //   let res2 = myMock()
  //   let res3 = myMock()
   
  //   expect(res1).toBe(10)
  //   expect(res2).toBe('x')
  //   expect(res3).toBe(true)
  // })
  // it('mock axios',()=>{
  //   const users = [{name: 'Bob'}];
  //   const resp = {data: users};
  //   axios.get.mockResolvedValue(resp);
  // })
})