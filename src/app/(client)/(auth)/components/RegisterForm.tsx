'use client';

import InputField from '@/components/formik/InputField';
import InputPassword from '@/components/formik/InputPassword';
import Button from '@/components/formik/Button';
import { SerializedError } from '@/features/api/apiSlice';
import { useCustomerRegisterMutation } from '@/features/auth/authApi';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BsCheck2Circle } from 'react-icons/bs';
import OtpModal from './OtpModal';

export default function RegisterForm() {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState(false);

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
  };

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('Required!'),
    email: Yup.string().required('Required!').email('Invalid Email!'),
    password: Yup.string().required('Required!').min(6, 'Password must be at least 6 characters long!'),
  });

  const [customerRegister, { data: registerResponse, isSuccess: registerSuccess, error: registerError }] = useCustomerRegisterMutation();

  // Handle register Response
  useEffect(() => {
    if (registerError) {
      setIsSubmitting(false);
      const myError = registerError as SerializedError;
      setIsSubmitting(false);
      toast.error(myError?.data?.message || 'Something went wrong!');
    }

    if (registerSuccess) {
      if (registerResponse?.status) {
        setIsSubmitting(false);
        setModalState(true);
        toast.success(registerResponse.message || 'OTP send successfully!');
        console.log('registerResponse', registerResponse);
      } else {
        setIsSubmitting(false);
        toast.error(registerResponse?.message);
      }
    }
  }, [registerError, registerSuccess, registerResponse, replace, dispatch]);

  // Submit Handler
  const handleSubmit = (values: any) => {
    setIsSubmitting(true);

    customerRegister({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="space-y-5">
              <InputField name="fullName" label="Full Name" placeholder="John Doe" />

              <InputField name="email" label="Email" placeholder="john.deo@email.com" />

              <InputPassword name="password" label="Password" placeholder="******" />

              <div>
                <p className="mb-1 text-end text-xs font-semibold">
                  Fields marked with <span className="text-red-600">*</span> are mandatory!
                </p>
                <p className="text-end text-xs font-semibold">Password must be at least 6 characters long!</p>
              </div>

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
      <OtpModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
}
