const Endpoints = {
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
  ROUTE_OVERVIEW: (routeId: string) => ({
    href: `/route/${routeId}/overview`,
    as: `/route/${routeId}/overview`,
  }),
  ROUTE_ACTIVE: (routeId: string, title: string) => ({
    href: `/route/${routeId}/active?title=${title}`,
    as: `/route/${routeId}/active?title=${title}`,
  }),
  ROUTE_COMPLETED: (routeId: string) => ({
    href: `/route/${routeId}/completed`,
    as: `/route/${routeId}/completed`,
  }),
}

export default Endpoints
