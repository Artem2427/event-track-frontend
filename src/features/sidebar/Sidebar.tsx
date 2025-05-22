// import { observer } from 'mobx-react-lite';
import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@shared/shadcn-ui';
import { ROUTE_PATHS } from '@shared/utils/routes';
import {
  Heart,
  MapPinned,
} from 'lucide-react';
import { Link } from 'react-router-dom';
// import { sharedStores } from '@admin-shared/stores';
import { type NavMainProps, SidebarNavMain } from './SidebarNavMain';
import LightLogoSrc from '/light-logo.svg';
import DarkLogoSrc from '/dark-logo.svg';
import { useTheme } from '@shared/providers/theme.provider';

// import { SidebarNavUser } from './SidebarNavUser';

const menuItems: NavMainProps['items'] = [
  { label: 'All events', icon: MapPinned, type: 'link', path: '/' },
  { label: 'My events', icon: Heart, type: 'link', path: '/my-events' },
];

export const Sidebar = ({
  ...props
}: React.ComponentProps<typeof SidebarBase>) => {
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
