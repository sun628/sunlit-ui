import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import type { ButtonType, ButtonSize } from './types';

import Button from './Button.vue';

describe('Button', () => {
  // Props: type
  it('should has the correct type class when type prop is set', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as ButtonType },
      });
      expect(wrapper.classes()).toContain(`n-button--${type}`);
    });
  });

  // Props: size
  it('should has the correct size class when size prop is set', () => {
    const sizes = ['large', 'default', 'small'];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as ButtonSize },
      });
      expect(wrapper.classes()).toContain(`n-button--${size}`);
    });
  });

  it.each([
    ['plain', 'is-plain'],
    ['round', 'is-round'],
    ['circle', 'is-circle'],
    ['disabled', 'is-disabled'],
    ['loading', 'is-loading'],
  ])('should has the correct class when prop %s is set to true', (prop, className) => {
    const wrapper = mount(Button, {
      props: { [prop]: true },
      global: {
        stubs: ['NIcon'],
      },
    });
    expect(wrapper.classes()).toContain(className);
  });

  it('should has the correct native type attribute when native-type prop is set', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' },
    });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect((wrapper.element as any).type).toBe('submit');
  });

  // Props: tag
  it('should renders the custom tag when tag prop is set', () => {
    const wrapper = mount(Button, {
      props: { tag: 'a' },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
  });
});
