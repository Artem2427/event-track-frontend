import React from 'react';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { useTheme } from '@shared/providers/theme.provider';
import { ROUTE_PATHS, ROUTE_TITLES, type RouteKey } from '@shared/utils/routes';
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

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const { status } = useUserProfileStore();

  const pageName = React.useMemo(() => {
    const dynamicBreadcrumbs = pathSegments.map((segment, index) => {
      const fullPath = `/${pathSegments.slice(0, index + 1).join('/')}`;

      return {
        path: fullPath,
        label: ROUTE_TITLES[segment as RouteKey],
      };
    });

    return [
      {
        path: ROUTE_PATHS.HOME,
        label: t('header.pageNames.allEvents'),
      },
      {
        path: ROUTE_PATHS.MYEVENTS,
        label: t('header.pageNames.myEvents'),
      },
      {
        path: ROUTE_PATHS.PROFILE,
        label: t('header.pageNames.profile'),
      },
      ...dynamicBreadcrumbs,
    ];
  }, [pathSegments]);

  const isAuthenticated = status === ProfileLoadStatusValue.AUTHORIZED;

  return (
    <div className="sticky top-0 z-50 p-4 w-full bg-sidebar h-16 flex justify-between items-center">
      {isAuthenticated ? (
        pageName[0].label
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
