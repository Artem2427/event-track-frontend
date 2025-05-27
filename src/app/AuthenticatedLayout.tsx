import { Header } from '@features/header/Header';
import { Sidebar } from '@features/sidebar';
import { SidebarProvider } from '@shared/shadcn-ui';
import { Outlet } from 'react-router-dom';

export const AuthenticatedLayout = () => (
  <SidebarProvider>
    <Sidebar />
    <main className="h-[calc(100vh)] flex flex-col flex-auto w-[calc(100vw-256px)] overflow-y-auto">
      <Header />
      <Outlet />
    </main>
  </SidebarProvider>
);
