export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
} as const;

export const ROUTE_KEYS = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTRATION: 'registration',
} as const;

export const ROUTE_TITLES: Record<RouteKey, string> = {
  [ROUTE_KEYS.HOME]: 'Events',
  [ROUTE_KEYS.LOGIN]: 'Login',
  [ROUTE_KEYS.REGISTRATION]: 'Registration',
};

export type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];
export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
