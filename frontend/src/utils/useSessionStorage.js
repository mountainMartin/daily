export const useSessionStorage = () => {
  const get = (key) => {
    const savedSession = sessionStorage.getItem(key);
    return savedSession ? JSON.parse(savedSession) : null;
  };

  const set = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    sessionStorage.removeItem(key);
  };

  const clear = () => {
    sessionStorage.clear();
  };

  return { get, set, remove, clear };
};
