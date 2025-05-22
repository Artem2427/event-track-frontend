import { DashboardPageLazy } from '@pages/dashboard/Dashboard.page.lazy';
import { ROUTE_PATHS } from '@shared/utils/routes';
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AuthenticatedLayout } from './AuthenticatedLayout';

const routes: RouteObject[] = [
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <DashboardPageLazy />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
