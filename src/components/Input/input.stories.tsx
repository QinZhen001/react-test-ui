import React, { useState, ChangeEvent, Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "./input";



const defaultInput = () => (
    <Input
      style={{ width: "300px" }}
      placeholder="placeholder"
      onChange={action("changed")}
    />
);

const disabledInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="disabled input"
    disabled
  ></Input>
);

const iconInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="input with icon"
    icon="search"
  ></Input>
);

const sizeInput = () => (
  <>
    <Input
      style={{width:'300px'}}
      defaultValue="large size"
      size='lg'
    ></Input>
    <Input
      style={{width:'300px'}}
      placeholder="small size"
      size='sm'  
    ></Input>
  </>
);

const pandInput = () => (
  <>
    <Input 
      style={{width: '300px'}}
      defaultValue="prepend text"
      prepend="https://"
    ></Input>
    <Input
    style={{width: '300px'}}
    defaultValue="google"
    append=".com"
  />
  </>
)


storiesOf("Input component", module)
  .add("Input", defaultInput)
  .add("被禁用的 Input", disabledInput)
  .add("带图标的 Input", iconInput)
  .add("大小不同的 Input", sizeInput)
  .add('带前后缀的 Input', pandInput)
