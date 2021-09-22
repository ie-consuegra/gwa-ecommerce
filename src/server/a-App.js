const App = {
  name: '',
  appSettings: {},

  get settings() {
    return this.appSettings;
  },

  set settings(settings) {
    this.appSettings = { ...settings };
  },

  get isSetup() {
    return Object.keys(this.appSettings).length > 0;
  },
};
