declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      NODE_ENV?: 'development' | 'test' | 'production';
    }
  }
}

export {};
