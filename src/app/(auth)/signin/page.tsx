import SigninForm from '@/components/authPage/SigninForm';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <SigninForm />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/PCBeaver2.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
