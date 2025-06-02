import { Button } from '@shared/shadcn-ui';
import { useTranslation } from 'react-i18next';
import GBFlag from '/gb.svg';
import UAFlag from '/ua.svg';

const lngs = {
  en: { nativeName: 'EN' },
  ua: { nativeName: 'UA' },
};

type LangKey = keyof typeof lngs;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation('translations');

  return (
    <div className="flex items-center justify-center gap-2">
      {Object.keys(lngs).map((lng) => {
        const key = lng as LangKey;
        return (
          <Button
            variant="outline"
            type="submit"
            key={key}
            onClick={() => i18n.changeLanguage(key)}
            disabled={i18n.language === key}
          >
            <img src={key === 'en' ? GBFlag : UAFlag} width={16} />
            {lngs[key].nativeName}
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
