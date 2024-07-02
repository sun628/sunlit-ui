export const defaultNamespace = 'el';

/**
 * BEM命名字符拼接函数
 * @param { String } namespace 命名空间
 * @param { String } block 块
 * @param { String } blockSuffix 子级块
 * @param { String } element 元素
 * @param { String } modifier 修改器
 * @returns
 */
export const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  blockSuffix && (cls += `-${blockSuffix}`);
  element && (cls += `__${element}`);
  modifier && (cls += `--${modifier}`);
  return cls;
};
