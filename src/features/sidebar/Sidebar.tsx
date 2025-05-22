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
  ArrowBigUp as ArrowBigUpIcon,
  Banknote as BanknoteIcon,
  BarChart as BarChartIcon,
  Bot as BotIcon,
  Dices as DicesIcon,
  Gamepad2 as Gamepad2Icon,
  Newspaper as NewspaperIcon,
  UserCog as UserCogIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
// import { sharedStores } from '@admin-shared/stores';
import { type NavMainProps, SidebarNavMain } from './SidebarNavMain';
import logoSrc from '/logo.svg';

// import { SidebarNavUser } from './SidebarNavUser';

const menuItems: NavMainProps['items'] = [
  { type: 'accordion', label: 'Users', icon: UsersIcon, subItems: [] },
  {
    type: 'accordion',
    label: 'Financial Operations',
    icon: BanknoteIcon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Casino & Games',
    icon: DicesIcon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Marketing & Promotions',
    icon: ArrowBigUpIcon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Community Management',
    icon: UserCogIcon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Trading & Affiliate Program',
    icon: UserPlusIcon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Special Game Modes',
    icon: Gamepad2Icon,
    subItems: [],
  },
  {
    type: 'accordion',
    label: 'Content & Articles',
    icon: NewspaperIcon,
    subItems: [],
  },
  { type: 'accordion', label: 'Statistic', icon: BarChartIcon, subItems: [] },
  {
    type: 'accordion',
    label: 'System Administration',
    icon: BotIcon,
    subItems: [],
  },
];

export const Sidebar = ({
  ...props
}: React.ComponentProps<typeof SidebarBase>) => {
  // const { basicData } = sharedStores.profileBasicInfoStore;

  return (
    <SidebarBase collapsible="icon" {...props}>
      <SidebarHeader className="px-4 pb-4 pt-0 flex flex-row items-center gap-2">
        <Link to={ROUTE_PATHS.HOME}>
          <img src={logoSrc} className="logo h-16" alt="Vite logo" />
        </Link>
        <span className="text-sidebar-foreground text-2xl font-semibold">
          Events track
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMain items={menuItems} />
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
      <SidebarRail />
    </SidebarBase>
  );
};
