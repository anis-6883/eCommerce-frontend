'use client';

import InputField from '@/components/formik/InputField';
import InputPassword from '@/components/formik/InputPassword';
import Button from '@/components/formik/Button';
import { routes } from '@/config/routes';
import { SerializedError } from '@/features/api/apiSlice';
import { useSuperAdminLoginMutation } from '@/features/auth/authApi';
import { userLoggedIn } from '@/features/auth/authSlice';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BsCheck2Circle } from 'react-icons/bs';

export default function LoginForm() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Required!').email('Invalid Email!'),
    password: Yup.string().required('Required!'),
  });

  const [superAdminLogin, { data: loginResponse, isSuccess: loginSuccess, error: loginError }] = useSuperAdminLoginMutation();

  // Handle Login Response
  useEffect(() => {
    if (loginError) {
      setIsSubmitting(false);
      const myError = loginError as SerializedError;
      setIsSubmitting(false);
      toast.error(myError?.data?.message || 'Something went wrong!');
    }

    if (loginSuccess) {
      if (loginResponse?.status) {
        toast.success(loginResponse.message || 'Login Successful!');
        console.log(loginResponse);
        dispatch(userLoggedIn(loginResponse.data));
        replace(routes.admin.dashboard);
      } else {
        setIsSubmitting(false);
        toast.error(loginResponse?.message);
      }
    }
  }, [loginError, loginSuccess, loginResponse, replace, dispatch]);

  // Submit Handler
  const handleSubmit = (values: any) => {
    setIsSubmitting(true);

    superAdminLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form className="space-y-5">
            <InputField name="email" label="Email" placeholder="admin@email.com" />

            <InputPassword name="password" label="Password" placeholder="******" />

            <p className="text-end text-xs font-semibold">
              Fields marked with <span className="text-red-600">*</span> are mandatory!
            </p>

            <Button
              color="primary"
              className="w-full"
              type="submit"
              text="Submit"
              postIcon={<BsCheck2Circle className="text-base" />}
              isSubmitting={isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
