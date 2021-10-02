function login(loginFormData) {
  const { username, password } = loginFormData;
  const auth = {
    successful: false,
    token: '',
  };

  if (App.auth(username, password)) {
    auth.successful = true;
    auth.token = generateRandomString(64);
    App.setCurrentToken(auth.token);
  }

  return auth;
}
