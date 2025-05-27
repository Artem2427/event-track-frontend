// import { observer } from 'mobx-react-lite';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@shared/shadcn-ui';
import { ROUTE_PATHS } from '@shared/utils/routes';
import {
  Heart,
  MapPinned,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
// import { sharedStores } from '@admin-shared/stores';
import { type NavMainProps, SidebarNavMain } from './SidebarNavMain';
import LightLogoSrc from '/light-logo.svg';
import DarkLogoSrc from '/dark-logo.svg';
import { useTheme } from '@shared/providers/theme.provider';
import { useTranslation } from 'react-i18next';

// import { SidebarNavUser } from './SidebarNavUser';



export const Sidebar = ({
  ...props
}: React.ComponentProps<typeof SidebarBase>) => {
  const { t } = useTranslation('translations');
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems: NavMainProps['items'] = [
    { label: t('header.pageNames.allEvents'), icon: MapPinned, type: 'link', path: ROUTE_PATHS.HOME },
    { label: t('header.pageNames.myEvents'), icon: Heart, type: 'link', path: ROUTE_PATHS.MYEVENTS },
  ];

  // const { basicData } = sharedStores.profileBasicInfoStore;

  const { theme } = useTheme();

  return (
    <SidebarBase collapsible="none" {...props} className='h-screen border-r-2'>
      <SidebarHeader className="px-4 pb-4 pt-0 flex flex-row items-center gap-2">
        <Link to={ROUTE_PATHS.HOME}>
          <img src={theme === 'dark' ? DarkLogoSrc : LightLogoSrc} className="logo h-16" alt="Vite logo" />
        </Link>
        <span className="text-sidebar-foreground text-2xl font-semibold">
          Events track
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={menuItems}  />
      </SidebarContent>
      <SidebarFooter>
        {/* {basicData?.user && (
          <SidebarNavUser
            name={basicData.user.username}
            email={basicData.user.email}
            avatar={basicData.user.image}
          />
        )} */}
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </SidebarBase>
  );
};
