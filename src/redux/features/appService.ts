import {apiRoutes} from '@constants/apiRoutes';
import {baseApi} from '@redux/baseApi';

export interface ILoginParam {
  email: string;
  name: string;
}

const settingsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<[], ILoginParam>({
      query: body => ({
        method: 'POST',
        url: apiRoutes.login,
        body,
      }),
    }),
    getVendorData: builder.query<[], void>({
      query: () => apiRoutes.getData,
    }),
  }),
  overrideExisting: true,
});

export const {useLoginMutation, useLazyGetVendorDataQuery} = settingsApi;
