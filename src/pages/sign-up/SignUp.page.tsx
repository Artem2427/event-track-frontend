import { SignUpForm } from './sign-up-form/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-screen flex items-center justify-center bg-background">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
