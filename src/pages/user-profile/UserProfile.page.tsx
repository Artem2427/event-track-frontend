import { useMemo } from 'react';
import { userHooks } from '@entities/user/hooks';
import { Avatar, AvatarFallback, AvatarImage, Input } from '@shared/shadcn-ui';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { t } = useTranslation('translations');

  const params = useParams<{ userId: string }>();

  const { data } = userHooks.useGetUserByIdQuery(params.userId!);

  const userData = useMemo(() => {
    return {
      firstName: {
        value: data?.firstName,
        label: t('userFields.firstName'),
      },
      lastName: {
        value: data?.lastName,
        label: t('userFields.lastName'),
      },
      phoneNumber: {
        value: data?.phone,
        label: t('userFields.phone'),
      },
      email: {
        value: data?.email,
        label: t('userFields.email'),
      },
      role: {
        value: data?.role,
        label: t('userFields.role'),
      },
    };
  }, [data]);

  return (
    <div className="flex gap-4 items-start px-4 flex-col py-8">
      <div>
        <Avatar className="mr-2 size-25">
          <AvatarImage
            src={data?.avatar ?? 'https://github.com/shadcn.png'}
            alt="user"
          />
          <AvatarFallback>{data?.firstName?.[0] ?? 'U'}</AvatarFallback>
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

export default UserProfilePage;
