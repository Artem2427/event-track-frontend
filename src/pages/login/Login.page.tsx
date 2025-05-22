import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t, i18n } = useTranslation('translations');

  const lngs: any = {
    en: { nativeName: 'English' },
    uk: { nativeName: 'Українська' },
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="flex flex-col gap-8 max-w-[412px] w-full justify-center items-center px-[26px]">
        {t('login')}
      </div>

      <div>
        {Object.keys(lngs).map((lng: any) => (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
