// import { useTranslation } from 'react-i18next';
import { LoginForm } from './login-form/LoginForm';

const LoginPage = () => {
  // const { t, i18n } = useTranslation('translations');

  // const lngs: any = {
  //   en: { nativeName: 'English' },
  //   uk: { nativeName: 'Українська' },
  // };

  return (
    <div className="h-[calc(100vh-64px)] w-screen flex items-center justify-center bg-background">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
