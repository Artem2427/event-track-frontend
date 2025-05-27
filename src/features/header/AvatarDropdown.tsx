import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/shadcn-ui';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import { UserMock } from '../../mock/UserMock';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { Link } from 'react-router-dom';
import { useUserProfileStore } from '@entities/user-profile/store';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useTranslation } from 'react-i18next';

export const AvatarDropdown = React.memo(() => {
  const { t } = useTranslation('translations');
  const options = [
    { label: t('header.pageNames.profile'), value: 'profile', path: ROUTE_PATHS.PROFILE },
    { label: t('logout'), value: 'logout', path: ROUTE_PATHS.LOGIN },
  ];

  const { setStatus } = useUserProfileStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[200px] h-[40px] justify-between text-primary"
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={UserMock?.avatar ?? 'https://github.com/shadcn.png'}
              alt="user"
            />
            <AvatarFallback>{UserMock?.firstName?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-ellipsis overflow-hidden">
            {UserMock?.lastName ?? UserMock?.email}
          </span>
          <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((item) => (
          <Link to={item.path}>
            <DropdownMenuItem
              key={item.value}
              onClick={item.path === ROUTE_PATHS.LOGIN ? 
                () => setStatus(ProfileLoadStatusValue.LOGGED_OUT) : () => {}
              }
              // onClick={() => onSelect?.(item.value)}
            >
              {item.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
