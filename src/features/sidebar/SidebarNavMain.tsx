import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@shared/shadcn-ui';
import {
  ChevronRight as ChevronRightIcon,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type NavMainProps = {
  items: MenuItem[];
};

type MenuItemBase = {
  label: string;
  icon?: LucideIcon;
};

type MenuLink = MenuItemBase & {
  type: 'link';
  path: string;
  subItems?: never;
};

type MenuAccordion = MenuItemBase & {
  type: 'accordion';
  subItems: MenuLink[];
  path?: never;
};

type MenuItem = MenuLink | MenuAccordion;

export const SidebarNavMain = ({ items }: NavMainProps) => (
  <SidebarGroup className="overflow-visible">
    <SidebarMenu className="overflow-visible">
      {items.map((item) => {
        if (item.type === 'accordion') {
          return (
            <Collapsible key={item.label} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon && <item.icon size={16} />}
                    <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap text-base">
                      {item.label}
                    </span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.label}>
                        <Link to={subItem.path} className="text-sm">
                          <span>{subItem.label}</span>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuSubItem key={item.label}>
            <SidebarMenuButton tooltip={item.label}>
              <Link to={item.path} className="flex gap-2 items-center">
                {item.icon && <item.icon size={16} />}
                <span className='text-base'>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenu>
  </SidebarGroup>
);
