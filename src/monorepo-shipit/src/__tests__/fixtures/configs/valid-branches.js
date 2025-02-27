// @flow strict

import path from 'path';

module.exports = {
  getBranchConfig() {
    return {
      source: 'source_branch',
      destination: 'destination_branch',
    };
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git',
    };
  },
  getPathMappings(): Map<string, string> {
    const ossRoot = 'src/apps/example-relay/';
    return new Map([
      [path.join(ossRoot, '__github__', '.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
};
