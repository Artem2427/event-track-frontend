import { Sidebar } from '@features/sidebar';
// import { Breadcrumbs } from '@admin-features/breadcrumbs';

import { SidebarProvider } from '@shared/shadcn-ui';
import { Outlet } from 'react-router-dom';

export const AuthenticatedLayout = () => (
  <SidebarProvider>
    <Sidebar />
    <main className="p-4 flex flex-col flex-auto">
      {/* <Breadcrumbs /> */}
      <Outlet />
    </main>
  </SidebarProvider>
);
