// app/page.tsx or app/login/page.tsx (depending on your route structure)

import React from 'react';
import LoginPage from './LoginPage'; // Assuming this is the login page component
import { getCSRF } from '@/api'; // Function to fetch CSRF token from your API

// Server Component to fetch the CSRF token
export default async function Page() {
  try {
    // Fetch the CSRF token on the server side
    const csrfToken = await getCSRF();
    console.log(csrfToken)

    // Return the LoginPage component with the fetched CSRF token
    return (
      <div>
        <LoginPage csrf={csrfToken} />
      </div>
    );
  } catch (error) {
    error();
  }
}
