import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  app: {
    name: 'Sentiment Analyzer API',
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME || 'admin',
    password: process.env.DATABASE_PASSWORD || '',
    synchronize: process.env.DATABASE_SYNC === 'true',
  },
  vendor: {
    gcpAuthFile: process.env.GCP_AUTH_FILE || '',
  }
});
