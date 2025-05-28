import React from 'react';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { useTheme } from '@shared/providers/theme.provider';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AvatarDropdown } from './AvatarDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import DarkLogoSrc from '/dark-logo.svg';
import LightLogoSrc from '/light-logo.svg';

export const Header = React.memo(() => {
  const location = useLocation();
  const { theme } = useTheme();
  const { t } = useTranslation('translations');
  const { status } = useUserProfileStore();

  const getPageName = (pathname: string) => {
    switch (pathname) {
      case ROUTE_PATHS.HOME:
        return t('header.pageNames.allEvents');
      case ROUTE_PATHS.MYEVENTS:
        return t('header.pageNames.myEvents');
      case ROUTE_PATHS.PROFILE:
        return t('header.pageNames.profile');
      default:
        return '';
    }
  };

  const pageTitle = getPageName(location.pathname);

  const isAuthenticated = status === ProfileLoadStatusValue.AUTHORIZED;

  return (
    <div className="sticky top-0 z-50 p-4 w-full bg-sidebar h-16 flex justify-between items-center">
      {isAuthenticated ? (
        <span className="text-sidebar-foreground text-2xl font-semibold">
          {pageTitle}
        </span>
      ) : (
        <div className="flex items-center">
          <img
            src={theme === 'dark' ? DarkLogoSrc : LightLogoSrc}
            className="logo h-16"
            alt="Vite logo"
          />
          <span className="text-sidebar-foreground text-2xl font-semibold">
            Events track
          </span>
        </div>
      )}
      <div className="flex gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
        {isAuthenticated && <AvatarDropdown />}
      </div>
    </div>
  );
});
