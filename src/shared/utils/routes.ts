export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
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

export type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
