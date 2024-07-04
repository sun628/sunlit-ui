import { isString } from 'lodash-es';

class SunlitUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SunlitUIError';
  }
}

function createErUIError(scope: string, msg: string) {
  return new SunlitUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createErUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? createErUIError(scope, msg!) : scope;
    console.warn(err);
  }
}
