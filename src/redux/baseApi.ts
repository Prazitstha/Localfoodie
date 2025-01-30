import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {BASE_URL1, BASE_URL2} from '@constants/config';

// import {signOut} from './features/auth';
import {RootState} from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL2}`,
});

const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('Resulttt@!!!!!', result);

  if (result.error && result.error.status === 401) {
    api.dispatch(baseApi.util.resetApiState());
    // api.dispatch(signOut());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
});
