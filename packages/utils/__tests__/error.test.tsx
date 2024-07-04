// 假设你的文件路径是 src/index.ts
import { describe, expect, it, vi } from 'vitest';
import { throwError, debugWarn } from '../error';

describe('throwError', () => {
  it('throwError should be worked', () => {
    expect(() => {
      throwError('scope', 'msg');
    }).toThrowError('[scope]:msg');
  });
  it('debugWarn should be worked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    debugWarn('scope', 'msg');
    debugWarn(new SyntaxError('custom error'));
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      [
        [
          [SunlitUIError: [scope]:msg],
        ],
        [
          [SyntaxError: custom error],
        ],
      ]
    `);
  });

  it('should not call console.warn when in production environment', () => {
    const scope = 'TestScope';
    const message = 'Test message';
    const warnSpy = vi.spyOn(console, 'warn');

    // 模拟生产环境
    process.env.NODE_ENV = 'production';
    debugWarn(scope, message);

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore(); // 恢复console.warn
  });
});
