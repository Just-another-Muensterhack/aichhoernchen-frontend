import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type DatetimeDatetimeFilterLookup = {
  date?: InputMaybe<IntComparisonFilterLookup>;
  day?: InputMaybe<IntComparisonFilterLookup>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['DateTime']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  hour?: InputMaybe<IntComparisonFilterLookup>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isoWeekDay?: InputMaybe<IntComparisonFilterLookup>;
  isoYear?: InputMaybe<IntComparisonFilterLookup>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  minute?: InputMaybe<IntComparisonFilterLookup>;
  month?: InputMaybe<IntComparisonFilterLookup>;
  quarter?: InputMaybe<IntComparisonFilterLookup>;
  /** Inclusive range test (between) */
  range?: InputMaybe<DatetimeRangeLookup>;
  second?: InputMaybe<IntComparisonFilterLookup>;
  time?: InputMaybe<IntComparisonFilterLookup>;
  week?: InputMaybe<IntComparisonFilterLookup>;
  weekDay?: InputMaybe<IntComparisonFilterLookup>;
  year?: InputMaybe<IntComparisonFilterLookup>;
};

export type DatetimeRangeLookup = {
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FoundObjectCreateType = {
  __typename?: 'FoundObjectCreateType';
  deposit?: Maybe<LostPropertyOfficeType>;
  description: Scalars['String']['output'];
  finderEmail: Scalars['String']['output'];
  finderName: Scalars['String']['output'];
  finderPhone: Scalars['String']['output'];
  key: Scalars['UUID']['output'];
  lat: Scalars['Float']['output'];
  long: Scalars['Float']['output'];
  longTitle: Scalars['String']['output'];
  pk: Scalars['Int']['output'];
  shortTitle: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type FoundObjectFilter = {
  AND?: InputMaybe<FoundObjectFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<FoundObjectFilter>;
  OR?: InputMaybe<FoundObjectFilter>;
  deposit?: InputMaybe<LostPropertyOfficeFilter>;
  description?: InputMaybe<StrFilterLookup>;
  distance?: InputMaybe<LocationType>;
  longTitle?: InputMaybe<StrFilterLookup>;
  search?: InputMaybe<Scalars['String']['input']>;
  shortTitle?: InputMaybe<StrFilterLookup>;
  timestamp?: InputMaybe<DatetimeDatetimeFilterLookup>;
};

export type FoundObjectInput = {
  deposit?: InputMaybe<OneToManyInput>;
  description: Scalars['String']['input'];
  finderEmail: Scalars['String']['input'];
  finderName: Scalars['String']['input'];
  finderPhone: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  long: Scalars['Float']['input'];
  longTitle: Scalars['String']['input'];
  shortTitle: Scalars['String']['input'];
};

export type FoundObjectOrder = {
  deposit?: InputMaybe<LostPropertyOfficeOrder>;
  description?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  longTitle?: InputMaybe<Ordering>;
  shortTitle?: InputMaybe<Ordering>;
  timestamp?: InputMaybe<Ordering>;
};

export type FoundObjectType = {
  __typename?: 'FoundObjectType';
  anonymizedEmail: Scalars['String']['output'];
  anonymizedName: Scalars['String']['output'];
  deposit?: Maybe<LostPropertyOfficeType>;
  description: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  long: Scalars['Float']['output'];
  longTitle: Scalars['String']['output'];
  pk: Scalars['Int']['output'];
  shortTitle: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type ImageAnalyserResponse = {
  __typename?: 'ImageAnalyserResponse';
  description: Scalars['String']['output'];
  longTitle: Scalars['String']['output'];
  shortTitle: Scalars['String']['output'];
  spamScore: Scalars['Int']['output'];
};

export type IntComparisonFilterLookup = {
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than. Filter will be skipped on `null` value */
  gt?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to. Filter will be skipped on `null` value */
  gte?: InputMaybe<Scalars['Int']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than. Filter will be skipped on `null` value */
  lt?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to. Filter will be skipped on `null` value */
  lte?: InputMaybe<Scalars['Int']['input']>;
  /** Inclusive range test (between) */
  range?: InputMaybe<IntRangeLookup>;
};

export type IntRangeLookup = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationType = {
  distance: Scalars['Float']['input'];
  lat: Scalars['Float']['input'];
  long: Scalars['Float']['input'];
};

export type LostPropertyOfficeFilter = {
  AND?: InputMaybe<LostPropertyOfficeFilter>;
  DISTINCT?: InputMaybe<Scalars['Boolean']['input']>;
  NOT?: InputMaybe<LostPropertyOfficeFilter>;
  OR?: InputMaybe<LostPropertyOfficeFilter>;
  address?: InputMaybe<StrFilterLookup>;
  distance?: InputMaybe<LocationType>;
  name?: InputMaybe<StrFilterLookup>;
};

export type LostPropertyOfficeOrder = {
  address?: InputMaybe<Ordering>;
  foundObjects?: InputMaybe<FoundObjectOrder>;
  name?: InputMaybe<Ordering>;
  pk?: InputMaybe<Scalars['Int']['input']>;
};

export type LostPropertyOfficeType = {
  __typename?: 'LostPropertyOfficeType';
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  foundObjects?: Maybe<FoundObjectType>;
  lat: Scalars['Float']['output'];
  link?: Maybe<Scalars['String']['output']>;
  long: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  pk: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteObject: Scalars['Boolean']['output'];
  foundObject: FoundObjectCreateType;
  readImage: ImageAnalyserResponse;
};


export type MutationDeleteObjectArgs = {
  key: Scalars['String']['input'];
  pk: Scalars['Int']['input'];
};


export type MutationFoundObjectArgs = {
  data: FoundObjectInput;
};


export type MutationReadImageArgs = {
  image: Scalars['Upload']['input'];
};

export type OffsetPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type OneToManyInput = {
  set?: InputMaybe<Scalars['ID']['input']>;
};

export enum Ordering {
  Asc = 'ASC',
  AscNullsFirst = 'ASC_NULLS_FIRST',
  AscNullsLast = 'ASC_NULLS_LAST',
  Desc = 'DESC',
  DescNullsFirst = 'DESC_NULLS_FIRST',
  DescNullsLast = 'DESC_NULLS_LAST'
}

export type Query = {
  __typename?: 'Query';
  foundObject: FoundObjectType;
  foundObjects: Array<FoundObjectType>;
  lostPropertyOffice: LostPropertyOfficeType;
  lostPropertyOffices: Array<LostPropertyOfficeType>;
};


export type QueryFoundObjectArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryFoundObjectsArgs = {
  filters?: InputMaybe<FoundObjectFilter>;
  ordering?: Array<FoundObjectOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryLostPropertyOfficeArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryLostPropertyOfficesArgs = {
  filters?: InputMaybe<LostPropertyOfficeFilter>;
  ordering?: Array<LostPropertyOfficeOrder>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type StrFilterLookup = {
  /** Case-sensitive containment test. Filter will be skipped on `null` value */
  contains?: InputMaybe<Scalars['String']['input']>;
  /** Case-sensitive ends-with. Filter will be skipped on `null` value */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Exact match. Filter will be skipped on `null` value */
  exact?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive containment test. Filter will be skipped on `null` value */
  iContains?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive ends-with. Filter will be skipped on `null` value */
  iEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive exact match. Filter will be skipped on `null` value */
  iExact?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive regular expression match. Filter will be skipped on `null` value */
  iRegex?: InputMaybe<Scalars['String']['input']>;
  /** Case-insensitive starts-with. Filter will be skipped on `null` value */
  iStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Exact match of items in a given list. Filter will be skipped on `null` value */
  inList?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Assignment test. Filter will be skipped on `null` value */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Case-sensitive regular expression match. Filter will be skipped on `null` value */
  regex?: InputMaybe<Scalars['String']['input']>;
  /** Case-sensitive starts-with. Filter will be skipped on `null` value */
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type FoundObjectMutationVariables = Exact<{
  o: FoundObjectInput;
}>;


export type FoundObjectMutation = { __typename?: 'Mutation', foundObject: { __typename?: 'FoundObjectCreateType', pk: number, shortTitle: string, longTitle: string, description: string, lat: number, long: number, finderName: string, finderEmail: string, finderPhone: string, key: any, verified: boolean } };

export type FoundObjectFieldsFragment = { __typename?: 'FoundObjectType', pk: number, shortTitle: string, longTitle: string, long: number, lat: number, timestamp: any, verified: boolean, description: string, anonymizedName: string, anonymizedEmail: string };

export type GetFoundObjectsQueryVariables = Exact<{
  filters: FoundObjectFilter;
  pagination: OffsetPaginationInput;
}>;


export type GetFoundObjectsQuery = { __typename?: 'Query', foundObjects: Array<{ __typename?: 'FoundObjectType', pk: number, shortTitle: string, longTitle: string, long: number, lat: number, timestamp: any, verified: boolean, description: string, anonymizedName: string, anonymizedEmail: string }> };

export type CaptionizeImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type CaptionizeImageMutation = { __typename?: 'Mutation', readImage: { __typename?: 'ImageAnalyserResponse', shortTitle: string, longTitle: string, description: string, spamScore: number } };


export const FoundObjectFieldsFragmentDoc = `
    fragment FoundObjectFields on FoundObjectType {
  pk
  shortTitle
  longTitle
  long
  lat
  timestamp
  verified
  description
  anonymizedName
  anonymizedEmail
}
    `;
export const FoundObjectDocument = `
    mutation foundObject($o: FoundObjectInput!) {
  foundObject(data: $o) {
    pk
    shortTitle
    longTitle
    description
    lat
    long
    finderName
    finderEmail
    finderPhone
    key
    verified
  }
}
    `;

export const useFoundObjectMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<FoundObjectMutation, TError, FoundObjectMutationVariables, TContext>) => {
    
    return useMutation<FoundObjectMutation, TError, FoundObjectMutationVariables, TContext>(
      {
    mutationKey: ['foundObject'],
    mutationFn: (variables?: FoundObjectMutationVariables) => fetcher<FoundObjectMutation, FoundObjectMutationVariables>(FoundObjectDocument, variables)(),
    ...options
  }
    )};

export const GetFoundObjectsDocument = `
    query GetFoundObjects($filters: FoundObjectFilter!, $pagination: OffsetPaginationInput!) {
  foundObjects(filters: $filters, pagination: $pagination) {
    ...FoundObjectFields
  }
}
    ${FoundObjectFieldsFragmentDoc}`;

export const useGetFoundObjectsQuery = <
      TData = GetFoundObjectsQuery,
      TError = unknown
    >(
      variables: GetFoundObjectsQueryVariables,
      options?: Omit<UseQueryOptions<GetFoundObjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFoundObjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFoundObjectsQuery, TError, TData>(
      {
    queryKey: ['GetFoundObjects', variables],
    queryFn: fetcher<GetFoundObjectsQuery, GetFoundObjectsQueryVariables>(GetFoundObjectsDocument, variables),
    ...options
  }
    )};

export const CaptionizeImageDocument = `
    mutation CaptionizeImage($file: Upload!) {
  readImage(image: $file) {
    ... on ImageAnalyserResponse {
      shortTitle
      longTitle
      description
      spamScore
    }
  }
}
    `;

export const useCaptionizeImageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CaptionizeImageMutation, TError, CaptionizeImageMutationVariables, TContext>) => {
    
    return useMutation<CaptionizeImageMutation, TError, CaptionizeImageMutationVariables, TContext>(
      {
    mutationKey: ['CaptionizeImage'],
    mutationFn: (variables?: CaptionizeImageMutationVariables) => fetcher<CaptionizeImageMutation, CaptionizeImageMutationVariables>(CaptionizeImageDocument, variables)(),
    ...options
  }
    )};
