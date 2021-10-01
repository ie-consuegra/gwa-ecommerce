function login(loginFormData) {
  const { username, password } = loginFormData;
  const auth = {
    successful: false,
    token: '',
  };

  if (username === App.auth.adminUsername) {
    if (password === App.auth.adminPassword) {
      auth.successful = true;
      auth.token = App.auth.currentToken;
    }
  }

  return auth;
}
