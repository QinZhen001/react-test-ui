import React from 'react';
import { Meta } from '@storybook/react';
import { Tooltip, TooltipProps } from './index';
import { Button } from '../button';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'default text',
    },
  },
};

export const Docs = (args) => {
  const text = <span>prompt text</span>;
  const buttonWidth = 70;

  return (
    <>
      <div style={{ marginTop: '50px' }}>
        <Tooltip {...args}>
          <span>Tooltip will show on mouse enter.</span>
        </Tooltip>
      </div>
      <div className="title">with color</div>
      <section className="wrapper">
        <Tooltip title="red" color="red">
          <span>Tooltip with red color</span>
        </Tooltip>
      </section>
      <div className="title">with direction</div>
      <section className="wrapper">
        <div className="tooltip-demo">
          <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
            <Tooltip placement="topLeft" title={text}>
              <Button>TL</Button>
            </Tooltip>
            <Tooltip placement="top" title={text}>
              <Button>Top</Button>
            </Tooltip>
            <Tooltip placement="topRight" title={text}>
              <Button>TR</Button>
            </Tooltip>
          </div>
          <div style={{ width: buttonWidth, float: 'left' }}>
            <Tooltip placement="leftTop" title={text}>
              <Button>LT</Button>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <Button>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text}>
              <Button>LB</Button>
            </Tooltip>
          </div>
          <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
            <Tooltip placement="rightTop" title={text}>
              <Button>RT</Button>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <Button>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text}>
              <Button>RB</Button>
            </Tooltip>
          </div>
          <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
            <Tooltip placement="bottomLeft" title={text}>
              <Button>BL</Button>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title={text}>
              <Button>BR</Button>
            </Tooltip>
          </div>
        </div>
      </section>
    </>
  );
};

export default meta;
