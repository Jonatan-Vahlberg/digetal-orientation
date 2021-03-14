export default {
  LOGIN: {
    href: '/login',
    as: '/login',
  },
  REGISTER: {
    href: '/register',
    as: '/register',
  },
  HOME: {
    href: '/home',
    as: '/home',
  },
  ROUTE_OVERVIEW: (routeId: number) => ({
    href: `/route/${routeId}/overview`,
    as: `/route/${routeId}/overview`,
  }),
};
