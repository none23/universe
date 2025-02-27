---
id: managing-dependencies
title: Managing dependencies
sidebar_label: Managing dependencies
---

All our dependencies (minor and patch) are upgraded automatically via Automator so you don't have to care about it. However, it's quite important to have good tests to make sure everything works correctly even after the upgrade. Major upgrades are being done manually because of their nature to break things.

## Adding dependencies to your project

Your JavaScript workspace has `package.json` config where you define all your project dependencies. You should run `yarn install` from monorepo root when you add them. Yarn will download these dependencies into offline mirror (commit these files). It is also possible that nothing will happen because these dependencies are already there.

## Upgrading Flow for the whole monorepo

> These instructions are for monorepo maintainers.

We follow the same upgrade strategy as used internally at Facebook. You can try to upgrade Flow just like any other dependency and try to fix the problems if any but it can get difficult with many workspaces. Faster strategy is to do it like this:

1. clone Flow repository somewhere (`git@github.com:facebook/flow.git`)
2. jump into dev tools (`flow/packages/flow-dev-tools`) and install necessary deps using Yarn
3. you can now run `./tool` from the Flow repo root which enables you very useful utilities for the upgrades

There are basically 2 useful commands for the upgrades: `add-comments` and `remove-comments`. To add suppress comments run this comment (don't forget to adjust it):

```text
/path/to/tool add-comments --all --bin /path/to/flow --comment "\$FlowFixMe(>=0.1xx.0)" .
```

Our Flow config is configured so it understand the version in `$FlowFixMe` correctly (it suppresses the error only from the specified version up). Try to run this command without the `--all` flag to be able to fix the errors individually. Example of such a suppression comment:

```js
/* $FlowFixMe(>=0.102.0) This comment suppresses an error when upgrading Flow.
 * To see the error delete this comment and run Flow. */
```

Similarly for removing unused suppress comments:

```text
/path/to/tool remove-comments --bin /path/to/flow .
```

This command removes all unused suppress comments while keeping unused comments in flowtests (files ending with `*-flowtest.js` or files in `__flowtests__` directory).

Read this article for more details and justification of this approach: https://medium.com/flow-type/upgrading-flow-codebases-40ef8dd3ccd8

Tip: great way how to migrate some large scale changes is to use `npx flow-upgrade`.

## Flow-typed dependencies

We use [`flow-typed`](https://github.com/flow-typed/flow-typed) definitions to add some additional types when they are not part of the NPM package. We currently expect that `flow-typed` is installed globally:

```text
npm -g install flow-typed
```

Updating or installing new definitions is very simple. Just run `install` command and you should be good to go. Example:

```text
flow-typed install jest@^24
```

Please note, we consider these files to be a normal code (since they are only being downloaded once and not automatically). So it's possible that someone updated them manually to unblock us or to fix some issue. Please, review changes in these files.
