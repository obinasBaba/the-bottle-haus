import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.SALEOR_INSTANCE_URL,
  documents: 'src/lib/**/*.graphql',
  generates: {
    'src/lib/saleor/generated/': {
      preset: 'client',
      // plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      presetConfig: {
        fragmentMasking: false,
        dedupeFragments: true,
      },
      config: {
        useTypeImports: true,
        defaultScalarType: 'unknown',
        skipTypename: true,
        documentMode: 'string',
        exportFragmentSpreadSubTypes: true,
        dedupeFragments: true,
        scalars: {
          Date: 'string',
          DateTime: 'string',
          Decimal: 'number',
          JSONString: 'string',
          Metadata: 'Record<string, string>',
          PositiveDecimal: 'number',
          UUID: 'string',
          WeightScalar: 'number',
        },
      },
    },
  },
};

export default config;
