import { DashboardPageLazy } from '@pages/dashboard/Dashboard.page.lazy';
import { LoginPageLazy } from '@pages/login/Login.page.lazy';
import { MyEventsPageLazy } from '@pages/my-events/MyEvents.page.lazy';
import { MyProfilePageLazy } from '@pages/my-profile/MyProfile.page.lazy';
import { SignUpPageLazy } from '@pages/sign-up/SignUp.page.lazy';
import { UserProfilePageLazy } from '@pages/user-profile/UserProfile.page.lazy';
import { ROUTE_PATHS } from '@shared/utils/routes';
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import { GuardedRoute } from './GuardedRoute';
import { PublicLayout } from './PublicLayout';

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginPageLazy />,
      },
      {
        path: ROUTE_PATHS.SIGN_UP,
        element: <SignUpPageLazy />,
      },
    ],
  },

  {
    element: <GuardedRoute />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: ROUTE_PATHS.HOME,
            element: <DashboardPageLazy />,
          },
          {
            path: ROUTE_PATHS.MY_EVENTS,
            element: <MyEventsPageLazy />,
          },
          {
            path: ROUTE_PATHS.PROFILE,
            element: <MyProfilePageLazy />,
          },
          {
            path: `${ROUTE_PATHS.PROFILE}/:userId`,
            element: <UserProfilePageLazy />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
