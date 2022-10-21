const getCookie = (name: string) => {
  const cookie = document.cookie
    .split(";")
    .find((item) => item.trim().slice(0, name.length) === name);

  if (cookie) {
    return cookie.split("=")[1];
  } else {
    return null;
  }
};

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export { getCookie, setCookie, deleteCookie };
