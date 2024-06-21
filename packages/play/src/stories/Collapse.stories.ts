import type { Meta, StoryObj } from '@storybook/vue3';
import { NCollapse, NCollapseItem } from 'sunlit-ui';

type Story = StoryObj<typeof NCollapse>;

const meta: Meta<typeof NCollapse> = {
  title: 'Example/Collapse',
  component: NCollapse,
  subcomponents: { NCollapseItem },
  tags: ['autodocs'],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      NCollapse,
      NCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <n-collapse v-bind="args">
      <n-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </n-collapse-item>
      <n-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </n-collapse-item>
      <n-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </n-collapse-item>
    </n-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ['a'],
  },
};

export default meta;
