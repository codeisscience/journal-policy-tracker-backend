import dayjs from "dayjs";

// ? Common Email Constants
export const LOGO_URL =
  "https://codeisscience-community.netlify.app/img/brand.png";
export const CODE_IS_SCIENCE_URL = "https://codeisscience.com";

export const SAMPLE_EMAIL_ADDRESS = "sample-email@sample-email.com";
export const SAMPLE_USERNAME = "sample-username";
export const CURRENT_DATE_AND_TIME = dayjs().format(
  "DD-MMM-YYYY HH:mm:ss Z [UTC]"
);

// ? Forgot Password Email Constants
export const FORGOT_PASSWORD_EMAIL_TITLE = "Reset Your Password";

export const FORGOT_PASSWORD_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const FORGOT_PASSWORD_IMAGE_URL_ALT = "Forgot your password?";

export const FORGOT_PASSWORD_TITLE_ONE = "FORGOT";
export const FORGOT_PASSWORD_TITLE_TWO = "YOUR PASSWORD?";
export const FORGOT_PASSWORD_SUBTITLE =
  "Not to worry, we got you! Let’s get you a new password.";

export const FORGOT_PASSWORD_BUTTON_TEXT = "RESET PASSWORD";
export const FORGOT_PASSWORD_BUTTON_POINTER_TEXT =
  "Reset your Code Is Science password";

// ? Account Verification Email Constants
export const ACCOUNT_VERIFICATION_EMAIL_TITLE = "Verify Your Account";

export const ACCOUNT_VERIFICATION_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const ACCOUNT_VERIFICATION_IMAGE_URL_ALT = "Verify your account";

export const ACCOUNT_VERIFICATION_TITLE_ONE = "WELCOME TO";
export const ACCOUNT_VERIFICATION_TITLE_TWO = "CODE IS SCIENCE";
export const ACCOUNT_VERIFICATION_SUBTITLE =
  "Press the button below to verify your email address.";

export const ACCOUNT_VERIFICATION_BUTTON_TEXT = "VERIFY ACCOUNT";
export const ACCOUNT_VERIFICATION_BUTTON_POINTER_TEXT =
  "Verify your Code Is Science account";

// ? New Email Address Verification Email Constants

export const NEW_EMAIL_ADDRESS_VERIFICATION_EMAIL_TITLE =
  "Verify Your New Email Address";
export const NEW_EMAIL_ADDRESS_VERIFICATION_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const NEW_EMAIL_ADDRESS_VERIFICATION_IMAGE_URL_ALT =
  "Verify your new email address";
export const NEW_EMAIL_ADDRESS_VERIFICATION_TITLE_ONE = "VERIFY YOUR";
export const NEW_EMAIL_ADDRESS_VERIFICATION_TITLE_TWO = "NEW EMAIL ADDRESS";
export const NEW_EMAIL_ADDRESS_VERIFICATION_SUBTITLE =
  "Press the button below to verify your new email address.";
export const NEW_EMAIL_ADDRESS_VERIFICATION_BUTTON_TEXT = "VERIFY EMAIL";
export const NEW_EMAIL_ADDRESS_VERIFICATION_BUTTON_POINTER_TEXT =
  "Verify your new email address";

// ? Username update alert email constants

export const USERNAME_UPDATE_ALERT_EMAIL_TITLE = "Username Update Alert";
export const USERNAME_UPDATE_ALERT_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const USERNAME_UPDATE_ALERT_IMAGE_URL_ALT = "Username Update Alert";
export const USERNAME_UPDATE_ALERT_TITLE_ONE = "YOUR USERNAME";
export const USERNAME_UPDATE_ALERT_TITLE_TWO = "WAS UPDATED";
export const USERNAME_UPDATE_ALERT_SUBTITLE = (newUsername, timeOfChange) =>
  `Your Code Is Science <i> username </i> was updated <br> <b> TO: </b> <i> ${newUsername} </i> <br> <b> AT: </b> <i> ${timeOfChange} </i> <br>`;

// ? Password update alert email constants

export const PASSWORD_UPDATE_ALERT_EMAIL_TITLE = "Password Update Alert";
export const PASSWORD_UPDATE_ALERT_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const PASSWORD_UPDATE_ALERT_IMAGE_URL_ALT = "Password Update Alert";
export const PASSWORD_UPDATE_ALERT_TITLE_ONE = "YOUR PASSWORD";
export const PASSWORD_UPDATE_ALERT_TITLE_TWO = "WAS UPDATED";
export const PASSWORD_UPDATE_ALERT_SUBTITLE = (timeOfChange) =>
  `Your Code Is Science <i> password </i> was updated <br> <b> AT: </b> <i> ${timeOfChange} </i> <br>`;

// ? Email address update alert email constants

export const EMAIL_ADDRESS_UPDATE_ALERT_EMAIL_TITLE =
  "Email Address Update Alert";
export const EMAIL_ADDRESS_UPDATE_ALERT_IMAGE_URL =
  "https://user-images.githubusercontent.com/59534570/205953467-e60d4683-ea80-40c0-9aa2-b885663de0d3.png";
export const EMAIL_ADDRESS_UPDATE_ALERT_IMAGE_URL_ALT =
  "Email Address Update Alert";
export const EMAIL_ADDRESS_UPDATE_ALERT_TITLE_ONE = "YOUR EMAIL ADDRESS";
export const EMAIL_ADDRESS_UPDATE_ALERT_TITLE_TWO = "WAS UPDATED";
export const EMAIL_ADDRESS_UPDATE_ALERT_SUBTITLE = (
  newEmailAddress,
  timeOfChange
) =>
  `Your Code Is Science <i> email address </i> was updated <br> <b> TO: </b> <i> ${newEmailAddress} </i> <br> <b> AT: </b> <i> ${timeOfChange} </i> <br>`;
