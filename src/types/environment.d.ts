export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      BCRYPT_SALT: number;
      JWT_SECRETKEY: string;
    }
  }
}
