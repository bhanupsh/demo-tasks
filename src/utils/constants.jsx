// utils/constants.js

// Base URL of your app (no trailing slash!)
export const APP_URL = "https://demo-tasks-drab.vercel.app/";

export const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_si2vsazlq",
  client_id: "2dhfmd1rd9gg903g310g5uuqog",
  redirect_uri: "https://demo-tasks-drab.vercel.app/",
  response_type: "code",
  scope: "email openid phone",
};

export const clientId = "2dhfmd1rd9gg903g310g5uuqog";
//const logoutUri = "https://demo-tasks-drab.vercel.app/"; // Must match Cognito logout URL
export const cognitoDomain = "https://ap-south-1si2vsazlq.auth.ap-south-1.amazoncognito.com";