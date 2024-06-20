import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NIcon from './Icon.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);

// 模拟 FontAwesomeIcon 组件
const MockFontAwesomeIcon = () => ({
  // 渲染一个 span 作为 font-awesome-icon 的占位符
  render: () => ({ default: () => '<span class="font-awesome-icon"></span>' }),
});

// 测试 NIcon 组件
describe('NIcon', () => {
  it('should render an icon with the correct type class', () => {
    const type = 'primary' as const;
    const wrapper = mount(NIcon, {
      props: {
        type,
        icon: 'fa-spinner',
      },
      slots: {
        default: 'Icon Content',
      },
      global: {
        components: { 'font-awesome-icon': MockFontAwesomeIcon },
      },
    });

    expect(wrapper.classes()).toContain(`n-icon`);
    expect(wrapper.classes()).toContain(`n-icon--${type}`);
  });

  it('should apply custom styles for color', () => {
    const color = 'red';
    const wrapper = mount(NIcon, {
      props: {
        color,
        icon: 'fa-spinner',
      },
      global: {
        components: { 'font-awesome-icon': MockFontAwesomeIcon },
      },
    });

    expect(wrapper.element.style.color).toBe(color);
  });
});
