import { Avatar, AvatarFallback, AvatarImage, Input } from "@shared/shadcn-ui";
import { UserMock } from "../../mock/UserMock";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation('translations');

  const userData = {
    firstName: {
      value: UserMock.firstName,
      label: t('userFields.firstName')
    },
    lastName: {
      value: UserMock.lastName,
      label: t('userFields.lastName')
    },
    phoneNumber: {
      value: UserMock.phone,
      label: t('userFields.phone')
    },
    email: {
      value: UserMock.email,
      label: t('userFields.email')
    },
    role: {
      value: UserMock.role,
      label: t('userFields.role')
    },
  };

  return (
    <div className="flex gap-4 items-start px-4 flex-col">
      <div>
        <Avatar className="mr-2 size-25">
          <AvatarImage
            src={UserMock?.avatar ?? 'https://github.com/shadcn.png'}
            alt="user"
          />
          <AvatarFallback>{UserMock?.firstName?.[0] ?? 'U'}</AvatarFallback>
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

export default ProfilePage;
