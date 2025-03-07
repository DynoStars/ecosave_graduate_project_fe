import  { DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface User {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  }
}
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    user?: {
      id?: number;
      name?: string;
      email?: string;
    } & DefaultSession['user'];
  }
}
