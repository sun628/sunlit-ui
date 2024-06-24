import { each, isFunction } from 'lodash-es';
import shell from 'shelljs';

export default function ModifyFiles({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: 'ModifyFiles',
    buildStart() {
      each(rmFiles, (fName) => shell.rm('-rf', fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      !err && isFunction(afterBuild) && afterBuild();
    },
  };
}
