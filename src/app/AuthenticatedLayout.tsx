import { Header } from '@features/header/Header';
import { Sidebar } from '@features/sidebar';
// import { Breadcrumbs } from '@admin-features/breadcrumbs';

import { SidebarProvider } from '@shared/shadcn-ui';
import { Outlet } from 'react-router-dom';

export const AuthenticatedLayout = () => (
  <SidebarProvider>
    <Sidebar />
    <main className="flex flex-col flex-auto w-[calc(100vw-256px)]">
      <Header />
      <Outlet />
    </main>
  </SidebarProvider>
);
