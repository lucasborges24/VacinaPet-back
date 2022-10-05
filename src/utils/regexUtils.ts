export const fullNameRegExp =
  /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]([-']?[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*( [a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]([-']?[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+)*)+$/;

export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
