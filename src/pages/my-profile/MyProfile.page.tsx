import { useMemo } from 'react';
import { useUserProfileStore } from '@entities/user/store';
import { Avatar, AvatarFallback, AvatarImage, Input } from '@shared/shadcn-ui';
import { useTranslation } from 'react-i18next';

const MyProfilePage = () => {
  const { t } = useTranslation('translations');

  const { user } = useUserProfileStore();

  const userData = useMemo(() => {
    return {
      firstName: {
        value: user?.firstName,
        label: t('userFields.firstName'),
      },
      lastName: {
        value: user?.lastName,
        label: t('userFields.lastName'),
      },
      phoneNumber: {
        value: user?.phone,
        label: t('userFields.phone'),
      },
      email: {
        value: user?.email,
        label: t('userFields.email'),
      },
      role: {
        value: user?.role,
        label: t('userFields.role'),
      },
    };
  }, []);

  return (
    <div className="flex gap-4 items-start px-4 flex-col py-8">
      <div>
        <Avatar className="mr-2 size-25">
          <AvatarImage
            src={user?.avatar ?? 'https://github.com/shadcn.png'}
            alt="user"
          />
          <AvatarFallback>{user?.firstName?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {Object.entries(userData).map(([key, { label, value }]) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <Input value={value ?? ''} disabled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
