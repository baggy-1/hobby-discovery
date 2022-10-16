const getToken = (name: string) => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.split("=")[0] === name)
    ?.split("=")[1];

  return token;
};

export default getToken;
