// using to call api google, the perpose of this using to login, register by google
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { API_URL } from '@/utils';
// Function to fetch CSRF token
export const fetchCsrfToken = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/csrf-token`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.csrf_token;
  } catch (error: any) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret:process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account }) {
      if (account && account.provider === 'google') {
        try {
          const csrfToken = await fetchCsrfToken();
          const res = await fetch(`${API_URL}/auth/callback/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
              token: account.id_token,
            }),
          });
          if (res.ok) {
            const result = await res.json();
            // Add token to the `account` object for the `jwt` callback
            account.accessToken = result.access_token;
            account.tokenType = result.token_type;
            account.expiresIn = result.expires_in;
            account.user = result.user;
            return true; // Allow sign-in
          } else {
            console.error('Failed to sign in:', res.statusText);
            return false; // Prevent sign-in
          }
        } catch (error) {
          console.error('Error during sign in:', error);
          return false; // Prevent sign-in
        }
      }
      return false; // Prevent sign-in
    },
    async jwt({ token, account }) {
      if (account) {
        // Store token information in JWT token
        token.accessToken = account.accessToken;
        token.tokenType = account.tokenType;
        token.expiresIn = account.expiresIn;
        token.user = account.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.tokenType = token.tokenType as string;
        session.expiresIn = token.expiresIn as number;
        session.user = token.user as any; // Replace `any` with a more specific type if possible
      }
      return session;
    },
  },
});
