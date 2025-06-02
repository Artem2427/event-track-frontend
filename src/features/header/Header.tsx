import React from 'react';
import { ProfileLoadStatusValue } from '@entities/user/model';
import { useUserProfileStore } from '@entities/user/store';
import { useTheme } from '@shared/providers/theme.provider';
import { routeTitles } from '@shared/utils/routes';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';
import { AvatarDropdown } from './AvatarDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import DarkLogoSrc from '/dark-logo.svg';
import LightLogoSrc from '/light-logo.svg';

const usePageTitle = () => {
  const { t } = useTranslation('translations');
  const location = useLocation();

  const match = routeTitles.find(({ path }) =>
    matchPath(path, location.pathname),
  );
  return match ? t(match.titleKey, '') : '';
};

export const Header = React.memo(() => {
  const { theme } = useTheme();
  const { status } = useUserProfileStore();

  const pageTitle = usePageTitle();

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
