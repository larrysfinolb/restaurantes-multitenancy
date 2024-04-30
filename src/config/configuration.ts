export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appId: process.env.APP_ID || '00000000-0000-0000-0000-000000000000',
  domain: process.env.DOMAIN || 'localhost',
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      time: parseInt(process.env.JWT_ACCESS_TIME, 10),
    },
    confirmation: {
      secret: process.env.JWT_CONFIRMATION_SECRET,
      time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
    },
    resetPassword: {
      secret: process.env.JWT_RESET_PASSWORD_SECRET,
      time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      time: parseInt(process.env.JWT_REFRESH_TIME, 10),
    },
  },
});
