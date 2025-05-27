import { Button } from '@shared/shadcn-ui';
import { useTranslation } from 'react-i18next';
import UAFlag from '/ua.svg'
import GBFlag from '/gb.svg'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('translations');

  const lngs = {
    en: { nativeName: 'EN' },
    ua: { nativeName: 'UA' },
  };



  type LangKey = keyof typeof lngs;

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
            disabled={i18n.resolvedLanguage === key}
            >
              <img src={key === 'en' ? GBFlag : UAFlag} width={16} />
            {lngs[key].nativeName}
            </Button>
        );})}
    </div>
  );
};

export default LanguageSwitcher;
