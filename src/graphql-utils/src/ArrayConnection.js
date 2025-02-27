// @flow

import {
  connectionFromArray as relayConnectionFromArray,
  cursorToOffset,
  offsetToCursor,
  type Connection,
  type ConnectionArguments,
} from 'graphql-relay';

// There is open discusion how to handle bidirectional pagination:
// https://github.com/graphql/graphql-relay-js/issues/58
//
// Until Relay devs decide, let's try our implementation
export default function connectionFromArray<T>(
  // $FlowFixMe: https://github.com/graphql/graphql-relay-js/pull/228
  data: $ReadOnlyArray<T>,
  args: ConnectionArguments,
): $Exact<Connection<T>> {
  const { edges, pageInfo } = relayConnectionFromArray(data, args);
  const firstCursor = offsetToCursor(0);
  const lastCursor = offsetToCursor(data.length - 1);
  const lowerBound = cursorToOffset(pageInfo.startCursor ?? firstCursor);
  const upperBound = cursorToOffset(pageInfo.endCursor ?? lastCursor);

  // there are some data "before" current slice
  if (lowerBound > 0) {
    pageInfo.hasPreviousPage = true;
  }
  // there are some data "after" current slice
  if (upperBound < data.length - 1) {
    pageInfo.hasNextPage = true;
  }

  return { edges, pageInfo };
}
