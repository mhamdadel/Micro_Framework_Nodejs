enum AuthTerms {
    // Auth Errors
    ERR_NAME_REQUIRED = "ERR_NAME_REQUIRED", // error in name field it is required
    ERR_EMAIL_REQUIRED = "ERR_EMAIL_REQUIRED", // error in email field it is required
    ERR_EMAIL_NOT_VALID = "ERR_EMAIL_NOT_VALID", // error in email not valid
    ERR_PASSWORD_REQUIRED = "ERR_PASSWORD_REQUIRED", // error in password field it is required
    ERR_CO_PASSWORD_REQUIRED = "ERR_CO_PASSWORD_REQUIRED", // error in password confirmation field it is required
    ERR_PASSWORD_NOT_EQUAL = "ERR_PASSWORD_NOT_EQUAL",  // error password and password confirmation field are not equal
    ERR_CURRENT_PASSWORD_WRONG = "ERR_CURRENT_PASSWORD_WRONG",  // error password are wrong
    ERR_TOKEN_INVALID_OR_EXPIRED = "ERR_TOKEN_INVALID_OR_EXPIRED", // your token invalid or expired please relogin
    ERR_NO_USER_WITH_THIS_EMAIL = "ERR_NO_USER_WITH_THIS_EMAIL", // no user with this email
    ERR_YOU_NOT_AUTHORIZED = "ERR_YOU_NOT_AUTHORIZED", // you are not authorized
    ERR_EMAIL_PASSWORD_WRONG = "ERR_EMAIL_PASSWORD_WRONG", // your credintioal you put it are wrong
    ERR_EMAIL_PASSWORD_REQUIRED = "ERR_EMAIL_PASSWORD_REQUIRED", // error email and password fields are required
    ERR_MAIL_NOT_SENDED_TRY_AGAIN = "ERR_MAIL_NOT_SENDED_TRY_AGAIN",  // email not sended please send it agian
    
    // Auth Worinings
    WR_USER_CHANGE_PASSWORD_RELOGIN = "WR_USER_CHANGE_PASSWORD_RELOGIN", // the password was changed please relogin
    WR_USER_WITH_TOKEN_NOT_EXIST = "WR_USER_WITH_TOKEN_NOT_EXIST", // the user with this token are not exisit
  
    // Auth success
    EMAIL_SENT = "EMAIL_SENT", // the mail was sent
  }
  
  export default AuthTerms;
  