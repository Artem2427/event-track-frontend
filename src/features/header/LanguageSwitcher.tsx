import { Button } from '@shared/shadcn-ui';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('translations');

  const lngs = {
    en: { nativeName: 'English' },
    uk: { nativeName: 'Українська' },
  };

  type LangKey = keyof typeof lngs;

  return (
    <div className="flex items-center justify-center">
      <div>
      {Object.keys(lngs).map((lng) => {
        const key = lng as LangKey;
        return (
            <Button
            type="submit"
            key={key}
            onClick={() => i18n.changeLanguage(key)}
            disabled={i18n.resolvedLanguage === key}
            >
            {lngs[key].nativeName}
            </Button>
        );})}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
