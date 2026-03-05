import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    authParams?: any;
    googleAuthCode?: string;
    views?: number;
  }
}
