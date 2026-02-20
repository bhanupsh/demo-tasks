// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import * as constants from "./utils/constants";

// Cognito Auth config
const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_si2vsazlq",
  client_id: "2dhfmd1rd9gg903g310g5uuqog",
  redirect_uri: constants.APP_URL, // must match exactly with Cognito app client redirect URI
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap app with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);