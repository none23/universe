// @flow

import { Environment as RelayEnvironment } from 'relay-runtime';

import createRelayStore from './createRelayStore';
import RelayLogger from './RelayLogger';
import type { Environment } from './runtimeTypes.flow';

/**
 * This is just an alternative environment factory for LocalQueryRenderer. There is currently not
 * very much API around and should be extended as needed.
 */
export default function createLocalEnvironment(): Environment {
  return new RelayEnvironment({
    // notice this environment doesn't have network layer since it's not necessary
    log: RelayLogger,
    store: createRelayStore(),
  });
}
