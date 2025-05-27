import { LoginForm } from './login-form/LoginForm';

const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-screen flex items-center justify-center bg-background">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
