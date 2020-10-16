import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./menu";
import MenuItem from "./menuItem";

export const defaultMenu = () => (
  <Menu onSelect={(index) => action(`asdsd ${index}`)}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <MenuItem>cool link 3</MenuItem>
    <MenuItem>cool link 4</MenuItem>
  </Menu>
);

storiesOf("Menu Component", module).add("Menu", defaultMenu);
