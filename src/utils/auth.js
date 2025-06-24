// src/utils/auth.js

export function isAuthenticated() {
  return !!localStorage.getItem("zklogin_signature");
}
