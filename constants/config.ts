export const CONFIG = {
  baseUrl: process.env.BASE_URL || 'https://studykit.app/',
  timeout: 30000,
  navigationTimeout: 30000,
  defaultWait: 5000,
  slowMo: 0,
  headless: true,
};

export const TEST_USERS = {
  validUser: {
    email: 'bchothngc@gmail.com',
    password: 'Aa12345678',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword',
  },
};

export const ENDPOINTS = {
  login: '/login',
  dashboard: '/dashboard',
  library: '/library',
  deck: '/deck',
  study: '/study',
  practice: '/practice',
};
