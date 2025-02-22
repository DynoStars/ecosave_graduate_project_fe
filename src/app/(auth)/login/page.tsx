import React  from "react";
import LoginPage from "./LoginPage"; // Assuming this is the login page component
import { getCSRF } from "@/api"; // Function to fetch CSRF token from your API

// Server Component to fetch the CSRF token
export default async function Page() {
  try {
    // Fetch the CSRF token on the server side
    const csrfToken = await getCSRF();
    console.log(csrfToken);

    return (
      <div>
        {/* Pass CSRF token to the LoginPage component */}
        <LoginPage csrf={csrfToken} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
