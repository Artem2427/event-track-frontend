export const ROUTE_PATHS = {
  HOME: '/',
  MY_EVENTS: '/my-events',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
} as const;

export const ROUTE_KEYS = {
  HOME: 'home',
  LOGIN: 'login',
  SIGN_UP: 'sign-up',
} as const;

export const ROUTE_TITLES: Record<RouteKey, string> = {
  [ROUTE_KEYS.HOME]: 'header.pageNames.allEvents',
  [ROUTE_KEYS.LOGIN]: 'Login',
  [ROUTE_KEYS.SIGN_UP]: 'Sign Up',
};

export const routeTitles = [
  { path: ROUTE_PATHS.HOME, titleKey: 'header.pageNames.allEvents' },
  { path: ROUTE_PATHS.MY_EVENTS, titleKey: 'header.pageNames.myEvents' },
  { path: ROUTE_PATHS.PROFILE, titleKey: 'header.pageNames.profile' },
  {
    path: `${ROUTE_PATHS.PROFILE}/:userId`,
    titleKey: 'header.pageNames.userProfile',
  },
];

export type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
