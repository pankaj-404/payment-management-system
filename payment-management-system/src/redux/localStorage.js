export const getData = (key) => {
  try {
    let data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
