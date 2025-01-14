export const clearCookies = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    document.cookie = cookies[i] + "=;expires=" + new Date(0).toUTCString();
  }
};

export const redefineWindowLocation = (url: string) => {
  global.window = Object.create(window);
  Object.defineProperty(window, "location", {
    value: {
      href: url,
    },
    writable: true,
  });
};
