export const emailValidator = (value) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(value);
};

export const confirmEmailValidator = (value1, value2) => {
  return value1 === value2;
};
