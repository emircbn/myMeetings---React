export const debounce = (method, milis = 300) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      return method(...args);
    }, milis);
  };
};
