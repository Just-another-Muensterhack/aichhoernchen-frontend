import { GraphQLClient } from 'graphql-request';

const url = 'https://api.aichhoernchen.de/graphql/'

const client = new GraphQLClient(url);

export const fetcher = <TData, TVariables extends object | undefined>(
    query: string,
    variables?: TVariables
) => {
    return async (): Promise<TData> => {
        const hasFile =
            variables &&
            Object.values(variables).some((v) => v instanceof File || v instanceof Blob);

        if (hasFile) {
            const formData = new FormData();

            formData.append(
                'operations',
                JSON.stringify({
                    query,
                    variables: { ...variables as any, file: null }, // Added 'as any' for safety with spread
                })
            );

            formData.append(
                'map',
                JSON.stringify({
                    '0': ['variables.file'],
                })
            );

            const file = (variables as any).file as File;
            formData.append('0', file);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');
            const json = await res.json();
            return json.data as TData;
        }

        return client.request(query, variables);
    };
};
