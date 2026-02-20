import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import * as constants from "./utils/constants";

function App() {
  const auth = useAuth();

  // Persist user session in localStorage
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      // Save relevant user info
      localStorage.setItem("userEmail", auth.user.profile.email);
      localStorage.setItem("idToken", auth.user.id_token);
      localStorage.setItem("accessToken", auth.user.access_token);
    } else {
      // Clear user info on logout
      localStorage.removeItem("userEmail");
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
    }
  }, [auth.isAuthenticated, auth.user]);

  const signOutRedirect = () => {
    const clientId = "2dhfmd1rd9gg903g310g5uuqog";
    const cognitoDomain =
      "https://ap-south-1si2vsazlq.auth.ap-south-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      constants.APP_URL
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre>Hello: {auth.user?.profile.email}</pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to the Demo Tasks App</h2>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;