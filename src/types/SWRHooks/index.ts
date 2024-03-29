import type { SWRConfiguration } from 'swr';
import type { CommerceError } from '@/util/errors';
import type { ResponseState } from '@/util/use-swr';
import { ProductFilterInput } from '@/schema';

/**
 * Returns the properties in T with the properties in type K, overriding properties defined in T
 */
export type Override<T, K> = Omit<T, keyof K> & K;

/**
 * Returns the properties in T with the properties in type K changed from optional to required
 */
export type PickRequired<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type HookSchemaBase = {
  // Data obj returned by the hook
  data: any;
  // Input expected by the hook
  input?: Record<string, any>;
  // Body object expected by the fetch operation
  body?: Record<string, any>;
  // Input expected before doing a fetch operation (aka fetch handler)
  fetcherInput?: Record<string, any>;
  // Data returned by the fetch operation
  fetchData?: any;
};

export type SWRHookSchemaBase = HookSchemaBase & {
  // Custom state added to the response object of SWR
  swrState?: Record<string, any>;
  // Instances of MutationSchemaBase that the hook returns for better DX
  mutations?: Record<string, ReturnType<MutationHook<any>['useHook']>>;
};

export type MutationSchemaBase = HookSchemaBase & {
  // Input expected by the action returned by the hook
  actionInput?: Record<string, any>;
};

export type FetcherOptions<Body = any> = {
  url?: string;
  query?: string;
  method?: string;
  variables?: any;
  body?: Body;
};

/**
 * Core fetcher added by CommerceProvider
 */
export type Fetcher<T = any, B = any> = (options: FetcherOptions<B>) => T | Promise<T>;

export type HookFetcherOptions = { method?: string } & (
  | { query: string; url?: string }
  | { query?: string; url: string }
);

export type HookFetcher<Data, Input = null, Result = any> = (
  options: HookFetcherOptions | null,
  input: Input,
  fetch: <T = Result, Body = any>(options: FetcherOptions<Body>) => Promise<T>,
) => Data | Promise<Data>;

export type HookFetcherFn<H extends HookSchemaBase> = (
  context: HookFetcherContext<H>,
) => H['data'] | Promise<H['data']>;

export type HookFetcherContext<H extends HookSchemaBase> = {
  options: HookFetcherOptions;
  input: H['fetcherInput'];
  fetch: <
    // if fetchData exist, then that is the type, if not( is 'unknown' ) the type is 'any'
    T = H['fetchData'] extends Record<string, any> | null ? H['fetchData'] : any,
    B = H['body'],
  >(
    options: FetcherOptions<B>,
  ) => Promise<T>;
};

export type HookInputValue = string | number | boolean | undefined | ProductFilterInput;

export type HookSWRInput = [string, HookInputValue][];

export type HookFetchInput = { [k: string]: HookInputValue };

export type HookFunction<
  Input extends Record<string, unknown> | undefined,
  T,
> = keyof Input extends never
  ? () => T
  : Partial<Input> extends Input
  ? (input?: Input) => T
  : (input: Input) => T;

export type SwrOptions<Data, Input = null, Result = any> = SWRConfiguration<
  Data,
  CommerceError,
  HookFetcher<Data, Input, Result>
>;

export type SWRHookContext<H extends SWRHookSchemaBase> = {
  fetcherWrapper(context?: {
    input?: HookFetchInput | HookSWRInput;
    swrOptions?: SwrOptions<H['data'], H['fetcherInput']>;
  }): ResponseState<H['data']>;
};

/**
 * Generates a SWR hook handler based on the schema of a hook
 */
export type SWRHook<H extends SWRHookSchemaBase = SWRHookSchemaBase> = {
  fetchOptions: HookFetcherOptions;
  fetcher?: HookFetcherFn<H>;
  useHook( // a wrapper around the above fetcher
    context: SWRHookContext<H>,
  ): HookFunction<
    H['input'] & { swrOptions?: SwrOptions<H['data'], H['fetcherInput']> },
    ResponseState<H['data']> & H['swrState'] & H['mutations']
  >;
};

export type MutationHookContext<H extends MutationSchemaBase> = {
  fetcherWrapper: // keyof H['fetcherInput'] extends never
  // ?
  // () => H['data'] | Promise<H['data']>
  // : Partial<H['fetcherInput']> extends H['fetcherInput']?
  // (context?: { input?: H['fetcherInput'] }) => H['data'] | Promise<H['data']>
  // :
  (context: { input: H['fetcherInput'] }) => Promise<H['data']>;
};

/**
 * Generates a mutation hook handler based on the schema of a hook
 */
export type MutationHook<H extends MutationSchemaBase = MutationSchemaBase> = {
  useHook(
    context: MutationHookContext<H>,
  ): HookFunction<H['input'], HookFunction<H['actionInput'], Promise<H['data']>>>;

  fetchOptions: HookFetcherOptions;
  fetcher?: HookFetcherFn<H>;
};
