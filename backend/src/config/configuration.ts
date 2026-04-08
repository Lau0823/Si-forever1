export default () => ({
  port: process.env.PORT || 3001,
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
});
