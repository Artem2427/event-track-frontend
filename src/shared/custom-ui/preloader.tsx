import { Spinner } from '@shared/shadcn-ui';

export const Preloader = () => (
  <div className="flex items-center justify-center h-screen w-screen">
    <Spinner size="large" />
  </div>
);
