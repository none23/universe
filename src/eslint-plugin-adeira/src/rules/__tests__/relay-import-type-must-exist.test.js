// @flow

const RuleTester = require('eslint').RuleTester;

const rule = require('../relay-import-type-must-exist');

jest.mock('../../readFileSync', () => (path, options) => {
  expect(options.encoding).toEqual('utf-8');
  if (path === '/path/__generated__/Module_data.graphql.js') {
    return `
          declare export opaque type Module_data$ref: FragmentReference;
          export type Module_data = any;
        `;
  }
  throw new Error('File not found');
});

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint'),
});

ruleTester.run('type-must-exist', rule, {
  valid: [
    {
      // not a Relay import
      code: "import { graphql } from '@adeira/relay';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import with "import type"
      code: "import type { Module_data } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import with "import { type"
      code: "import { type Module_data } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import from artifact directory with "import type"
      code: "import type { Module_data } from '__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // valid Relay import from artifact directory with "import { type"
      code: "import { type Module_data } from '__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // value imports are ignored by this rule
      code: "import Module_data from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
    },
    {
      // filename including the extension
      code: "import type { Module_data } from './__generated__/Module_data.graphql.js';",
      filename: '/path/Module.js',
    },
  ],

  invalid: [
    {
      code: "import type { Wrong_type } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      code: "import type { Wrong_type } from '../path/__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      // one valid, one invalid
      code: "import type { Module_data, Wrong_type } from './__generated__/Module_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message:
            '"Wrong_type" is not exported from the generated file (exported types: Module_data, Module_data$ref)',
        },
      ],
    },
    {
      // file doesn't exist
      code: "import type { WrongFile_data } from './__generated__/WrongFile_data.graphql';",
      filename: '/path/Module.js',
      errors: [
        {
          message: "Can't read the file",
        },
      ],
    },
  ],
});
