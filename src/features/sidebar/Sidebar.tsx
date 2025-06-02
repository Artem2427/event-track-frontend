// import { observer } from 'mobx-react-lite';
import { useTheme } from '@shared/providers/theme.provider';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@shared/shadcn-ui';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { Heart, MapPinned } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { type NavMainProps, SidebarNavMain } from './SidebarNavMain';
import DarkLogoSrc from '/dark-logo.svg';
import LightLogoSrc from '/light-logo.svg';

export const Sidebar = ({
  ...props
}: React.ComponentProps<typeof SidebarBase>) => {
  const { t } = useTranslation('translations');

  const menuItems: NavMainProps['items'] = [
    {
      label: t('header.pageNames.allEvents'),
      icon: MapPinned,
      type: 'link',
      path: ROUTE_PATHS.HOME,
    },
    {
      label: t('header.pageNames.myEvents'),
      icon: Heart,
      type: 'link',
      path: ROUTE_PATHS.MY_EVENTS,
    },
  ];

  const { theme } = useTheme();

  return (
    <SidebarBase collapsible="none" {...props} className="h-screen border-r-2">
      <SidebarHeader className="px-4 pb-4 pt-0 flex flex-row items-center gap-2">
        <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
          <img
            src={theme === 'dark' ? DarkLogoSrc : LightLogoSrc}
            className="logo h-16"
            alt="Vite logo"
          />
          <span className="text-sidebar-foreground text-2xl font-semibold">
            Events track
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </SidebarBase>
  );
};
