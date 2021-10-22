App.init();
const stockDB = App.ss('stock');

function queryStock() {
  const types = {
    1: {
      code: 'S',
      name: 'S',
      unit: 'S',
      type: 'S',
      category: 'S',
      cost: 'N',
      price: 'N',
      minimumStock: 'S',
      stock: 'S',
      imgUrl: 'S',
    },
  };

  const connection = SheetsDB.connect(stockDB.url, types);

  const stock = connection.table('db', types).get();
  const data = {
    stock,
    settings: App.meta.settings,
  };
  return JSON.stringify(data, null, ' ');
}

function fetchAppMeta() {
  return App.meta;
}

function firstUse() {
  // Create the spreadsheet and format it
  const ss = SpreadsheetApp.openById(stockDB.id);
  // If the spreadsheet is not formatted, do it
  if (!ss.getSheetByName('stock')) {
    const stockSheet = ss.insertSheet().setName('stock');
    const sheets = ss.getSheets();
    const db = sheets[0];
    db.setName('db');

    const dbHeaders = ['code', 'name', 'unit', 'type', 'category', 'cost', 'price', 'minimumStock', 'stock', 'imgUrl'];

    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const dbContent = [[]];

    dbContent[0] = dbHeaders;

    for (let index = 1; index <= 501; index += 1) {
      dbContent.push([]);
      abc.forEach((item) => {
        dbContent[index].push(`=stock!${item}${(index + 1).toString()}`);
      });
    }

    const stockHeaders = [['Código', 'Nombre', 'Unidad', 'Tipo', 'Categoría', 'Costo', 'Precio', 'Mínimo en stock', 'Stock', 'Url de imagen']];
    stockSheet.getRange(1, 1, 1, 10).setValues(stockHeaders);
    db.getRange(1, 1, 502, 10).setValues(dbContent);

    db.showSheet();
    db.hideSheet();
  }
}

function saveSettings(settings) {
  App.setSettings(settings);
}

function updateSettings(settingsObj) {
  if (App.isCurrentToken(settingsObj.token)) {
    delete settingsObj.token;
    App.updateSettings(settingsObj);
  } else {
    Logger.log('There was an authorization error');
  }
}

function changePassword(formData) {
  const currentPass = formData['current-admin-password'];
  const newPass = formData['new-admin-password'];
  let changeSuccessful = false;

  if (App.isCurrentPassword(currentPass)) {
    App.setNewPassword(newPass);
    changeSuccessful = true;
  }

  return changeSuccessful;
}

function recoverPassword(username) {
  let recoverSuccessful = false;
  if (App.isAdmin(username)) {
    const newTempPassword = generateRandomString(8);
    App.setNewPassword(newTempPassword);

    const ss = SpreadsheetApp.openByUrl(stockDB.url);
    const sheet = ss.insertSheet('PasswordRecovery');

    const values = [['Su nueva contraseña:'],
      [newTempPassword],
      ['Esta hoja (PasswordRecovery) se creó solo para guardar la nueva contraseña temporal, puede eliminarla cuando desee']];

    sheet.getRange(1, 1, 3, 1).setValues(values);
    recoverSuccessful = true;
  }
  return recoverSuccessful;
}

// Function for development purposes only
function deleteProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}

function createAppFolder() {
  
}

// Configuration backup/restore functions
function restoreConfig() {
  let restoreSuccess = false;
  const folders = DriveApp.getFoldersByName('IC_APPS');

  // There must be only one folder in the iterator
  if (folders.hasNext()) {
    const appFolder = folders.next();
    const files = appFolder.getFilesByName('IC_APPS_CONFIG');
    // There must be only one file
    if (files.hasNext()) {
      const appFile = files.next();
      const appSS = SpreadsheetApp.openById(appFile.getId());
      const appSheet = appSS.getSheetByName('GWA_ECOMMERCE');
      const appData = appSheet.getDataRange().getValues();
      let configDataJSON = '';
      appData.forEach((row) => {
        if (row[0] === 'CONFIG') {
          configDataJSON = row[1];
        }
      });
      Logger.log(configDataJSON);
      restoreSuccess = true;
    }
  }
  return restoreSuccess;
}

function backupConfig() {
  let backupSuccess = false;
  const scriptProperties = PropertiesService.getScriptProperties().getProperties();
  // Remove sensible/unnecesary data
  scriptProperties.currentToken = '';
  const settings = JSON.parse(scriptProperties.settings);
  settings['admin-username'] = '';
  settings['admin-password'] = '';
  scriptProperties.settings = settings;

  const appConfigJSON = JSON.stringify(scriptProperties);

  const folders = DriveApp.getFoldersByName('IC_APPS');

  // There must be only one folder in the iterator
  if (folders.hasNext()) {
    const appFolder = folders.next();
    const files = appFolder.getFilesByName('IC_APPS_CONFIG');
    // There must be only one file
    if (files.hasNext()) {
      const appFile = files.next();
      const appSS = SpreadsheetApp.openById(appFile.getId());
      const appSheet = appSS.getSheetByName('GWA_ECOMMERCE');
      const appData = appSheet.getDataRange().getValues();
      let configDataJSON = '';
      appData.forEach((row) => {
        if (row[0] === 'CONFIG') {
          configDataJSON = row[1];
        }
      });
      Logger.log(configDataJSON);
      restoreSuccess = true;
    }
  } else {
    const appFolder = DriveApp.createFolder('IC_APPS');
    let appSheet = {}; // Sheet object
    // Pending: Check if the spreadsheet exists
    const appSS = SpreadsheetApp.create('IC_APPS_CONFIG');
    if (appSS.getSheetByName('GWA_ECOMMERCE')) {
      appSheet = appSS.getSheetByName('GWA_ECOMMERCE');
    } else {
      appSheet = appSS.insertSheet('GWA_ECOMMERCE');
    }

    const values = [['CONFIG', appConfigJSON]];
    appSheet.getRange(1, 1, 1, 2).setValues(values);

    // Move file to the app folder
    const ssFiles = DriveApp.getFilesByName('IC_APPS_CONFIG');
    const ssFile = ssFiles.hasNext() ? ssFiles.next() : null;
    if (ssFile) {
      ssFile.moveTo(appFolder);
    }

    backupSuccess = true;
  }
  return backupSuccess;
}
