import React from 'react';
import { ProfileLoadStatusValue } from '@entities/user/model';
import { useUserProfileStore } from '@entities/user/store';
import { storageService } from '@shared/services/storage.service';
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
import { ACCESS_TOKEN_KEY } from '@shared/utils/constants';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
  path: string;
};

export const AvatarDropdown = React.memo(() => {
  const { t } = useTranslation('translations');

  const options = [
    {
      label: t('header.pageNames.profile'),
      value: 'profile',
      path: ROUTE_PATHS.PROFILE,
    },
    { label: t('logout'), value: 'logout', path: ROUTE_PATHS.LOGIN },
  ];

  const { setStatus, user } = useUserProfileStore();

  const handleSelectItem = (option: Option) => {
    switch (option.value) {
      case 'logout': {
        storageService.remove(ACCESS_TOKEN_KEY);
        setStatus(ProfileLoadStatusValue.LOGGED_OUT);
      }
    }
  };

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
              src={user?.avatar ?? 'https://github.com/shadcn.png'}
              alt="user"
            />
            <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
          <span className="text-ellipsis overflow-hidden">
            {user?.lastName ?? user?.email}
          </span>
          <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        {options.map((item) => (
          <Link to={item.path} key={item.value}>
            <DropdownMenuItem onClick={() => handleSelectItem(item)}>
              {item.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
