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
    customerGetProfile: builder.query({
      query: () => `api/customer/profile`,
      // providesTags: ['customerProfile'],
    }),
    customerRegister: builder.mutation({
      query: (data) => {
        return {
          url: `api/customer/auth/register`,
          method: 'POST',
          body: data,
        };
      },
    }),
    customerOtpVerify: builder.mutation({
      query: (data) => {
        return {
          url: `api/customer/auth/otp-verify`,
          method: 'POST',
          body: data,
        };
      },
    }),
    customerResendOtp: builder.mutation({
      query: (data) => {
        return {
          url: `api/customer/auth/resend-otp`,
          method: 'POST',
          body: data,
        };
      },
    }),
    customerLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/api/customer/auth/login`,
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

export const {
  useGetProfileQuery,
  useGetOwnProfileQuery,
  useLogoutUserMutation,
  useCustomerLoginMutation,
  useSuperAdminLoginMutation,
  useCustomerRegisterMutation,
  useCustomerResendOtpMutation,
  useCustomerOtpVerifyMutation,
} = authApi;
