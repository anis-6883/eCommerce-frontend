import { apiSlice } from '@/features/api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    superAdminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/api/secret-root/admin/auth/login`,
          method: 'POST',
          body: data,
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: '/api/user-logout',
          method: 'POST',
        };
      },
    }),
    getProfile: builder.query({
      query: (id: string) => `/user/${id}`,
      providesTags: ['userProfile'],
    }),
    getOwnProfile: builder.query({
      query: () => `/api/user-profile`,
      providesTags: ['userOwnProfile'],
    }),
  }),
});

export const { useGetProfileQuery, useSuperAdminLoginMutation, useGetOwnProfileQuery, useLogoutUserMutation } = authApi;
