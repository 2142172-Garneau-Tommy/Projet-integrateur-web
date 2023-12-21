/**
 * Express router paths go here.
 */

export default {
  Base: '/',
  Reservations: {
    Base: '/reservations',
    Get: '/',
    GetOne: '/:numeroFacture',
    Add: '/',
    Update: '/',
  },
  Services: {
    Base: '/services',
    Get: '/:nomService',
  },
  Stats: {
    Base: '/stats',
    Moyenne: '/:moyenne',
  },
} as const;
