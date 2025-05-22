import React from 'react';
import { ROUTE_PATHS, ROUTE_TITLES, type RouteKey } from '@shared/utils/routes';
import { useLocation } from 'react-router-dom';
import { useHasRole } from '@entities/user-profile/hooks';
import { useUserProfileStore } from '@entities/user-profile/store';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { ThemeSwitcher } from './ThemeSwitcher';
import { AvatarDropdown } from './AvatarDropdown';
import LanguageSwitcher from './LanguageSwitcher';

export const Header = React.memo(() => {
  const location = useLocation();
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
        label: ROUTE_TITLES.home,
      },
      ...dynamicBreadcrumbs,
    ];
  }, [pathSegments]);

  const isAuthentificated = status === ProfileLoadStatusValue.AUTHORIZED;

  return (
    <div className="p-4 w-full bg-sidebar h-16 flex justify-between items-center">
        {pageName[0].label}
        <div className="flex gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {isAuthentificated && (
                <AvatarDropdown />
            )}
        </div>
    </div>);
});
