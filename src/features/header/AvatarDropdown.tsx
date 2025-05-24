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

export const AvatarDropdown = React.memo(() => {
  const options = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' },
  ];

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
          <DropdownMenuItem
            key={item.value}
            // onClick={() => onSelect?.(item.value)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
