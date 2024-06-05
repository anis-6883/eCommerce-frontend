'use client';

import { routes } from '@/config/routes';
import { useSuperAdminLoginMutation } from '@/features/auth/authApi';
import { userLoggedIn } from '@/features/auth/authSlice';
import { Field, Form, Formik } from 'formik';
import { divide } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { LuMail, LuUnlock } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Button, Input, Password } from 'rizzui';
import * as Yup from 'yup';

export default function LoginForm() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Required!').email('Invalid Email!'),
    password: Yup.string().required('Required!'),
  });

  const [superAdminLogin, { data: loginResponse, isSuccess: loginSuccess, isError: isLoginError, error: loginError }] =
    useSuperAdminLoginMutation();

  // Handle Login Response
  useEffect(() => {
    if (isLoginError) {
      setSubmitting(false);
      if ('status' in loginError) {
        console.log('loginError', loginError);
        if (loginError.status === 401) {
          toast.error('Invalid Credentials!');
        } else {
          toast.error('Something went wrong! Try Again...');
        }
      }
    }

    if (loginSuccess) {
      if (loginResponse?.status) {
        toast.success(loginResponse.message || 'Login Successful!');
        console.log(loginResponse);
        dispatch(userLoggedIn(loginResponse.data));
        replace(routes.admin.dashboard);
      } else {
        setSubmitting(false);
        toast.error(loginResponse?.message);
      }
    }
  }, [loginError, loginSuccess, loginResponse, replace, dispatch, isLoginError]);

  // Submit Handler
  const handleSubmit = (values: any) => {
    setSubmitting(true);

    superAdminLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form className="space-y-7">
            <Field name="email">
              {({ field, meta }: { field: any; meta: any }) => (
                <div>
                  <Input
                    size="lg"
                    label={
                      <p className="flex items-center gap-x-2">
                        <LuMail className="text-base" />
                        Email
                        <span className="font-bold text-red-600"> *</span>
                      </p>
                    }
                    variant="outline"
                    color="error"
                    labelClassName="text-base"
                    autoComplete="off"
                    placeholder={'john@example.com'}
                    error={meta.touched && meta.error}
                    {...field}
                  />
                </div>
              )}
            </Field>
            <Field name="password">
              {({ field, meta }: { field: any; meta: any }) => (
                <div>
                  <Password
                    size="lg"
                    label={
                      <p className="flex items-center gap-x-2">
                        <LuUnlock className="text-base" /> Password
                        <span className="font-bold text-red-600"> *</span>
                      </p>
                    }
                    variant="outline"
                    color="primary"
                    labelClassName="text-base"
                    autoComplete="off"
                    placeholder="********"
                    error={meta.touched && meta.error}
                    {...field}
                  />
                </div>
              )}
            </Field>
            <div>
              <Button
                color="primary"
                type="submit"
                className="flex w-full items-center justify-center font-semibold disabled:bg-[#1d58d8]"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-x-2">
                    Requesting... <ImSpinner9 className="animate-spin text-base" />
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
