import { useTranslation } from "react-i18next";

const MyEventsPage = () =>  {
    const { t } = useTranslation('translations');

    return (
    <div className="flex gap-4 items-center px-4">
      {t('header.pageNames.myEvents')}
    </div>
  )};

export default MyEventsPage;
  