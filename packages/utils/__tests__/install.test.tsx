import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, createApp } from 'vue';

import {
  makeInstaller,
  withInstall,
  withInstallDirective,
  withInstallFunction,
  withNoopInstall,
} from '../install';

const AppComp = defineComponent({
  setup() {
    return () => <div>App</div>;
  },
});

const compA = withInstall(
  defineComponent({
    name: 'CompA',
    setup() {
      return () => <div>CompA</div>;
    },
  })
);

const compB = withInstall(
  defineComponent({
    name: 'CompB',
    setup() {
      return () => <div>CompB</div>;
    },
  })
);

const UnnamedComp = withInstall(
  defineComponent({
    setup() {
      return () => <div>Unnamed Component</div>;
    },
  })
);

// 测试 withInstallFunction
function myFunction() {
  console.log('Function called');
}
const compFunction = withInstallFunction(myFunction, 'myFunction');

// 测试 withInstallDirective
const myDirective = {
  mounted() {
    console.log('Directive mounted');
  },
};

// 测试 withNoopInstall
const compNoop = withNoopInstall(
  defineComponent({
    name: 'CompNoop',
    setup() {
      return () => <div>CompNoop</div>;
    },
  })
);

const compDirective = withInstallDirective(myDirective, 'myDirective');

describe('install', () => {
  it('withInstall should be worked', () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);

    app.use(compA).mount(wrapper.element);

    expect(compA.install).toBeDefined();
    expect(compB.install).toBeDefined();
    expect(app._context.components['CompA']).toBeTruthy();
    expect(app._context.components['CompB']).toBeFalsy();
  });

  it('withInstall should be worked with default name', async () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    app.use(UnnamedComp).mount(wrapper.element);
    expect(UnnamedComp.install).toBeDefined();
    // 验证组件是否使用默认名称 'UnnamedComponent' 安装
    expect(app._context.components['UnnamedComponent']).toBeTruthy();
  });

  it('makeInstaller should be worked', () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    const installer = makeInstaller([compA, compB]);
    app.use(installer).mount(wrapper.element);
    expect(installer).toBeDefined();
    expect(app._context.components['CompA']).toBeTruthy();
    expect(app._context.components['CompB']).toBeTruthy();
  });

  it('withInstallFunction should be worked', async () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    app.use(compFunction).mount(wrapper.element);
    expect(compFunction.install).toBeDefined();
    expect(app.config.globalProperties.myFunction).toBe(myFunction);
  });

  it('withInstallDirective should be worked', async () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    app.use(compDirective).mount(wrapper.element);
    expect(compDirective.install).toBeDefined();
    expect(app.directive('myDirective')).toBe(myDirective);
  });

  //   export const withNoopInstall = <T>(component: T) => {
  //   (component as SFCWithInstall<T>).install = noop;
  //   return component as SFCWithInstall<T>;
  // };
  it('withNoopInstall should be worked', async () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    app.use(compNoop).mount(wrapper.element);
    expect(compNoop.install).toBeDefined();
  });
});
