import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu,{MenuProps} from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const defaultMenu = () => (
  <Menu onSelect={action("select")}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <MenuItem>cool link 3</MenuItem>
    <MenuItem>cool link 4</MenuItem>
  </Menu>
);

export const verticalMenu = () => (
  <Menu mode="vertical" onSelect={action("select")}>
    <MenuItem>cool link 1</MenuItem>
    <SubMenu title="SubMenu1">
      <MenuItem>item 1</MenuItem>
      <MenuItem>item 2</MenuItem>
    </SubMenu>
    <MenuItem>cool link 2</MenuItem>
    <SubMenu title="SubMenu2">
      <MenuItem>item 1</MenuItem>
      <MenuItem>item 2</MenuItem>
      <MenuItem>item 3</MenuItem>
    </SubMenu>
  </Menu>
);


const verticalActiveMenuProps:MenuProps  = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

export const verticalActiveMenu = () => (
  <Menu {...verticalActiveMenuProps}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>xyz</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
    </SubMenu>
    <SubMenu title="opened">
      <MenuItem>opened1</MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf("Menu Component", module)
  .add("defaultMenu", defaultMenu)
  .add("verticalMenu", verticalMenu)
  .add("verticalActiveMenu", verticalActiveMenu);
