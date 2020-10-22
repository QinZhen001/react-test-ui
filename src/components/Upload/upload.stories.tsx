import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload from "./upload";
import Icon from "../Icon/icon";

const uploadAction =
  "https://run.mocky.io/v3/3e152113-db19-40e1-b8dc-0484d8ba69c7";

const simpleUpload = () => {
  return (
    <Upload
      action={uploadAction}
      onChange={action("changed")}
      onRemove={action("removed")}
      name="fileName"
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <p>单文件上传</p>
    </Upload>
  );
};

const multipleUpload = () => {
  return (
    <Upload
      action={uploadAction}
      onChange={action("changed")}
      onRemove={action("removed")}
      onProgress={action("progressed")}
      onSuccess={action("succeed")}
      onError={action("error")}
      name="fileName"
      multiple
    >
      <p>多文件上传</p>
    </Upload>
  );
};

const dragUpload = () => {
  return (
    <Upload
      action={uploadAction}
      onChange={action("changed")}
      onRemove={action("removed")}
      onProgress={action("progressed")}
      onSuccess={action("succeed")}
      onError={action("error")}
      drag
    ></Upload>
  );
};

storiesOf("Upload component", module)
  .add("simpleUpload", simpleUpload)
  .add("multipleUpload", multipleUpload)
  .add('dragUpload',dragUpload)
