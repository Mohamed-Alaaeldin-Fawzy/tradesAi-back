let accessToken = "";
let refreshToken = "";
let tokenExpiry = 0;

export const setTokens = (access: string, refresh: string, expiry: number) => {
  accessToken = access;
  refreshToken = refresh;
  tokenExpiry = expiry;
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;
export const getTokenExpiry = () => tokenExpiry;

export const isTokenExpired = () => Date.now() >= tokenExpiry;
