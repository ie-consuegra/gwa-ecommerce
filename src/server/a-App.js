const App = {
  name: '',
  appSettings: {},
  properties: {},
  meta: {},
  url: '',
  spreadsheetsIds: {},

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

  getSpreadsheetIds() {
    if (this.properties.spreadsheetsIds) {
      this.spreadsheetsIds = JSON.parse(this.properties.spreadsheetsIds);
    }
  },

  init() {
    this.fetchProperties();
    this.getSettings();
    this.getSpreadsheetIds();
    this.getAppUrl();

    const { appSettings, url } = this;

    this.meta = {
      appSettings,
      url,
    };
  },

  ss(name) {
    let id = '';
    if (name && typeof name === 'string') {
      if (!this.spreadsheetsIds[name]) {
        this.ssCreate(name);
      }
    } else {
      throw new Error('Invalid argument');
    }

    id = this.spreadsheetsIds[name];
    return {
      get id() { return id; },
      get url() { return `https://docs.google.com/spreadsheets/d/${id}`; },
    };
  },

  ssCreate(name) {
    if (name && typeof name === 'string') {
      const ss = SpreadsheetApp.create(name);
      ssId = ss.getId();
      this.ssRegister(ssId, name);
    }
  },

  ssRegister(ssId, name) {
    this.spreadsheetsIds[name] = ssId;
    const ssIds = JSON.stringify(this.spreadsheetsIds);
    PropertiesService
      .getScriptProperties()
      .setProperty('spreadsheetIds', ssIds);
  },
};
