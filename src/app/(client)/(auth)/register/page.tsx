import { metaObject } from '@/config/site.config';
import RegisterForm from '../components/RegisterForm';
import Link from 'next/link';

export const metadata = {
  ...metaObject('Registration Page'),
};

export default async function Page() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#061626] p-5 text-white md:p-0">
      <div className="w-[600px] rounded-md bg-[#1C2632] p-5 shadow-xl md:p-10">
        <div className="p-2">
          <img src="/images/online-shop.png" className="m-auto my-5 w-28" alt="logo" />
          <h2 className="mb-5 text-center text-lg font-semibold">Customer Registration</h2>
          <RegisterForm />
          <p className="mt-5 text-sm">
            Already member?{' '}
            <Link className="font-medium text-primary" href="/login">
              Login
            </Link>{' '}
            Here
          </p>
        </div>
      </div>
    </section>
  );
}
