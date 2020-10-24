import React from "react";
import { config } from "react-transition-group";
import { render, RenderResult, fireEvent, wait } from "@testing-library/react";
import {
  AutoComplete,
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";
import axios from 'axios'


// https://reactcommunity.org/react-transition-group/testing
config.disabled = true;

jest.mock('axios')
// mock axios 之后 有代码提示
const mockedAxios = axios as jest.Mocked<typeof axios>


interface ItemProps {
  value: string;
  number: number;
}

const testArray: Array<ItemProps> = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

const testRenderOption = (item: DataSourceType) => {
  const myItem = item as DataSourceType<ItemProps>;
  return (
    <div>
      <h2 className="render-item-name">Name: {myItem.value}</h2>
      <p className='render-item-number'>number: {myItem.number}</p>
    </div>
  );
};

let wrapper: RenderResult;
let inputNode: HTMLInputElement;


describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}></AutoComplete>);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      // react 异步渲染
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    // 下拉框有两项
    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);
    // 点击 ab 项
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toEqual("ab");
  });
  it("should provide keyboard support", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");
    // 按下键盘 下箭头
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    // 按下键盘 下箭头
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");
    expect(firstResult).not.toHaveClass("is-active");
    // 按下键盘 上箭头
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    expect(secondResult).not.toHaveClass("is-active");
    // 按下 enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", async () => {
    //  加入renderOption 重新渲染
    wrapper.rerender(
      <AutoComplete
        {...testProps}
        renderOption={testRenderOption}
      ></AutoComplete>
    );
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(wrapper.container.querySelectorAll(".render-item-name").length).toEqual(2)
      expect(wrapper.container.querySelectorAll(".render-item-number").length).toEqual(2)
    });
   
    // 点击 name
    fireEvent.click(wrapper.container.querySelectorAll(".render-item-name")[0]);
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value:'ab',
      number:11
    })
    expect(inputNode.value).toBe('ab')
    // 下拉 name 项消失
    expect(wrapper.container.querySelector(".render-item-name")).not.toBeInTheDocument()
  });
  it('async fetchSuggestions should works fine',async ()=>{
    mockedAxios.post.mockImplementation((value)=>{
      return Promise.resolve(testArray.filter(item=> item.value.includes(value)))
    })
    fireEvent.change(inputNode, { target: { value: "a" } });
    await wait(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toEqual(2);
    });
    fireEvent.change(inputNode, { target: { value: "abc" } });
    await wait(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toEqual(1);
    });
  })
});
