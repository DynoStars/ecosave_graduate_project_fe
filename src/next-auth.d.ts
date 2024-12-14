// types/next-auth.d.ts

import  { DefaultSession } from 'next-auth';

// Extend the default User type
declare module 'next-auth' {
  interface User {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  }
}

// Extend the default Session type
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    user?: {
      id?: number;
      name?: string;
      email?: string;
      // Add other properties if needed
    } & DefaultSession['user'];
  }
}
