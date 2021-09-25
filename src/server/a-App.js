const App = {
  name: '',
  appSettings: {},
  properties: {},
  meta: {},
  url: '',

  get settings() {
    return this.appSettings;
  },

  set settings(settings) {
    this.appSettings = { ...settings };
  },

  get isSetup() {
    return Object.keys(this.appSettings).length > 0;
  },

  fetchProperties() {
    const properties = PropertiesService
      .getScriptProperties()
      .getProperties();

    if (Object.keys(properties).length > 0) {
      this.properties = properties;
    } else {
      this.properties = {};
    }
  },

  getAppUrl() {
    this.url = ScriptApp
      .getService()
      .getUrl();
  },

  getSettings() {
    if (this.isSetup) {
      this.settings = JSON.parse(this.properties.settings);
    }
  },

  init() {
    this.fetchProperties();
    this.getSettings();
    this.getAppUrl();

    const { appSettings, url } = this;

    this.meta = {
      appSettings,
      url,
    };
  },
};
