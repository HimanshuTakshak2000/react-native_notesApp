const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidateEmail = (email: string) => {
  return emailRegex.test(email);
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isValidatePassword = (password: string) => {
  return passwordRegex.test(password);
};

export {isValidateEmail, isValidatePassword};
