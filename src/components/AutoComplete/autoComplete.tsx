import React, {
  FC,
  ReactElement,
  KeyboardEvent,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import { useEffect } from "@storybook/addons";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState<string>(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue,300)

  // 点击组件外部 清空下拉选项
  useClickOutside(componentRef, ()=>{
    setSuggestions([])
  })


  useEffect(()=>{
    if(debouncedValue && triggerSearch.current){
      setSuggestions([])
      const results = fetchSuggestions(debouncedValue)
      if(results instanceof Promise){
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if(data.length > 0){
            setShowDropdown(true)
          }
        })
      }else{
        setSuggestions(results)
        if (results.length > 0) {
          setShowDropdown(true)
        } 
      }
    }else{
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  },[debouncedValue,fetchSuggestions])

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false)
        break;
      default:
        break;
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExit={() => {
          setSuggestions([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin></Icon>
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      ></Input>
      {generateDropdown()}
    </div>
  );
};
