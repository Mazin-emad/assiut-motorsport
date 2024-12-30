export const saveTokenWithExpiration = (token) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  const tokenData = {
    token,
    expiration: expirationDate.toISOString(),
  };
  localStorage.setItem("authToken", JSON.stringify(tokenData));
};

export const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  if (!tokenData) return null;

  const { token, expiration } = tokenData;
  const now = new Date();

  if (new Date(expiration) > now) {
    return token;
  } else {
    localStorage.removeItem("authToken");
    return null;
  }
};
