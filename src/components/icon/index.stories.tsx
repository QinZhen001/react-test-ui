import React from "react";
import { Meta } from "@storybook/react";
import { Icon } from "./index";

const meta: Meta = {
  title: "Components/Icon",
  component: Icon,
};

type DocsProps = {};

export const Docs = ({}: DocsProps) => (
  <>
    <div>
      <i className="el-icon-delete" style={{ fontSize: "30px", color: "red" }}></i>
      <Icon name="delete" style={{ fontSize: "20", color: "red" }}></Icon>
    </div>
  </>
);

Docs.args = {};

export default meta;
