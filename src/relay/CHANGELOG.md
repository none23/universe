# Unreleased

# 0.2.0
- rename `kiwicom-fetch-schema` -> `adeira-fetch-schema`
- rename `kiwicom-relay-compiler` -> `adeira-relay-compiler`

---

Changelog before our fork:

```text
# Unreleased

This is a **breaking** release!

- Relay upgraded to the latest version 7.0.0 (see: https://github.com/facebook/relay/releases/tag/v7.0.0)
- Old Relay logger has been replaced with new event-based logger.
- Removed all custom Relay Compiler validations.
- Improve `RefetchOptions` type

# 4.7.0

- Improved flow type coverage of Relay store.
- Compiler: added `include` and `exclude` arg options.

# 4.6.0

- Fixed Flow types for `createFragmentContainer`, `createPaginationContainer` and `createRefetchContainer`. This may yield many new errors especially if you didn't type your React components correctly. But don't worry, the upgrade can be very simple and automated - contact us directly. :)
- Compiler: added support for experimental FS persist mode (see Relay Example project).

# 4.5.0

- Function `commitMutation` is now defined with generic Flow type. You can now use types generated by Relay compiler: `commitMutation<NamedMutation>(...)`.
- New experimental function `commitMutationAsync` added - this function is the same like `commitMutation` except it returns Promise.

# 4.4.0

- Burst cache timeout changed to 2 seconds.

# 4.3.0

- Added invariant check for correct container factories usages.
- Added support for `readInlineData` (should be combined with `@inline`, see: https://relay.dev/docs/en/graphql-in-relay.html#inline).
- Export `DeclarativeMutationConfig` Flow type.

# 4.2.0

- Expose new experimental `RelayEnvironmentProvider` component and `useRelayEnvironment` hook.

# 4.1.0

- Added typed `fetchQuery` to the public interface (see: https://relay.dev/docs/en/fetch-query)

# 4.0.0

- **Breaking**: Relay upgraded to the latest version 6.0.0 (see: https://github.com/facebook/relay/releases/tag/v6.0.0). We also added Flow interface for the new `LocalQueryRenderer` (with new `createLocalEnvironment`) but please remember that this interface is currently experimental and doesn't have the same capabilities like our `QueryRenderer`. The interface is not finished yet and it may change in the future.
- **Breaking**: Direct usage of `relay-compiler` is no longer officially supported. Use `kiwicom-relay-compiler` instead.

# 3.6.0

- Enable `--watch` mode in our experimental Relay compiler.
- Enable `--validate` mode in our experimental Relay compiler. This mode returns code `101` in case of outdated generated files.
- Relay compiler now outputs ES6 modules.
- Added support for official Relay package `relay-config` which allows you to centralize Relay configuration in files like `relay.config.js`. Example:

```js
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './src',
  schema: './data/schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
```

# 3.5.0

- Experimental Relay compiler now shows warnings when you access deprecated field in your application code.
- Script `kiwicom-fetch-schema` now signs the generated files and sorts fields lexicographically.
- Experimental Relay compiler now verifies the signature generated by `kiwicom-fetch-schema`.

# 3.4.0

- This version contains upgraded dependencies and more accurate Flow types.

# 3.3.0

- New QueryRenderer property `dataFrom` with values `STORE_THEN_NETWORK` and `NETWORK_ONLY` (more info here: https://relay.dev/docs/en/next/query-renderer#props).
- Many internal updates mostly targeting OSS development experience.

# 3.2.0

- New bin script `kiwicom-fetch-schema` available. This little script helps you with the download of your remote schema. Please, read README file to see how to use it.

# 3.1.0

- Flow types of some object types are now more accurate
- Reverted breaking change enforcing correct Environment usage from version 3.0.0

# 3.0.0

- _(reverted in 3.1.0)_ Breaking: functions `commitMutation`, `requestSubscription` and `commitLocalUpdate` now require correct usage of Relay environment which is being passed down from props. Example of how to properly use mutations:

```js
import {
  type RelayProp, // or `PaginationRelayProp` or `RefetchRelayProp` types
} from '@adeira/relay';

type Props = {| +relay: RelayProp |};

function Component(props: Props) {
  useEffect(() => {
    commitMutation(
      props.relay.environment, // <<< this Environment is not being imported but rather reused from `props.relay`
      { mutation: graphql` ... ` },
    );
  });
}
```

- Relay updated to version 5.0, see: https://github.com/facebook/relay/releases/tag/v5.0.0
- This release also contains new _experimental_ Relay Compiler with support for persistent queries. This is currently undocumented feature and you should not use it. Expect breaking changes without any announcements.

# 2.3.0

- You can now pass custom GraphiQL Printer into Relay environment factory. There is a default printer enabled for https://graphql.kiwi.com/ - you can just click on the GraphiQL link in your dev console and it will open current query with variables so you can debug it easily.

# 2.2.0

- Experimental Flow support for operation loader (needed for `@match` and `@module`).

# 2.1.0

- Babel Relay preset is now part of this package. Removed from `@adeira/babel-preset-adeira` in version 3.0.0. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: ['relay'],
};
```

# 2.0.0

- Upgraded to Relay version 4.0.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0). Our previous versions 1.x disallowed some deprecated usages of Relay so this upgrade should be relatively straightforward. Check new testing tools in this release - especially `MockPayloadGenerator` and `RelayMockEnvironment`. There is also an improved support for `@match`/`@module` directives (available from `@adeira/relay` version 1.0) which works well with `@adeira/babel-preset-adeira` from version 3.0. Please give it a try and give us your feedback.

# 1.2.0

- Network fetcher now accepts optional `refetchConfig` to be able to adjust `fetchTimeout` and `retryDelays` (see for more details: https://github.com/kiwicom/fetch)

# 1.1.0

- `Disposable` Flow type exposed publicly
- `Environment` (incomplete) Flow type exposed publicly
```
