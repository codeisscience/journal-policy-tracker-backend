import validator from "validator";

export const fullNameErrorHandler = (fullName) => {
  if (!validator.isLength(fullName, { min: 3, max: 50 })) {
    return {
      errors: [
        {
          field: "fullName",
          message: "full name must be between 3 and 50 characters long",
        },
      ],
    };
  }
};

export const usernameErrorHandler = (username) => {
  if (!validator.isAlphanumeric(username, "en-US", { ignore: "_-" })) {
    return {
      errors: [
        {
          field: "username",
          message:
            "username can only contain letters, numbers, underscores (_) and dashes (-)",
        },
      ],
    };
  }
};

export const emailErrorHandler = (email) => {
  if (!validator.isEmail(email)) {
    return {
      errors: [
        {
          field: "email",
          message: "invalid email address",
        },
      ],
    };
  }
};

export const passwordErrorHandler = (password) => {
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    return {
      errors: [
        {
          field: "password",
          message:
            "password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol",
        },
      ],
    };
  }
};

export const userCredentialsErrorHandler = (
  fullName,
  username,
  email,
  password
) => {
  if (fullNameErrorHandler(fullName)?.errors)
    return fullNameErrorHandler(fullName);

  if (usernameErrorHandler(username)?.errors)
    return usernameErrorHandler(username);

  if (emailErrorHandler(email)?.errors) return emailErrorHandler(email);

  if (passwordErrorHandler(password)?.errors)
    return passwordErrorHandler(password);
};
