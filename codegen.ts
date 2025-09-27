import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://api.aichhoernchen.de/graphql/',

    documents: 'api/graphql/**/*.graphql',

    generates: {
        'api/gql/generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-query',
            ],
            config: {
                fetcher: {
                    func: './fetcher#fetcher',
                    isReactHook: false,
                },
                reactQueryVersion: 5,
            },
        },
    },
};

export default config;
