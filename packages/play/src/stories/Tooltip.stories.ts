import type { StoryObj, Meta } from '@storybook/vue3';

import { fn } from '@storybook/test';
import { NTooltip } from 'sunlit-ui';
import 'sunlit-ui/dist/theme/tooltip.css';

type Story = StoryObj<typeof NTooltip>;

const meta: Meta<typeof NTooltip> = {
  title: 'Example/Tooltip',
  component: NTooltip,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      options: ['hover', 'click', 'contextmenu'],
      control: {
        type: 'select',
      },
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    'onVisible-change': fn(),
  },
};

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    trigger: 'hover',
  },
  render: (args) => ({
    components: { NTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <NTooltip v-bind="args" style="padding-left:500px">
          <div style="height:30px;width:200px;background:red;padding:auto;">NTooltip</div>
      </NTooltip>
    `,
  }),
};

export default meta;
