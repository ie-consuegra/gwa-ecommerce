App.init();

function queryStock() {
  const { url } = App.ss('stock');

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

  const connection = SheetsDB.connect(url, types);

  const data = connection.table('db', types).get();
  return JSON.stringify(data, null, ' ');
}

function fetchAppMeta() {
  return App.meta;
}

function firstUse() {
  // Create the spreadsheet and format it

  const { id } = App.ss('stock');
  const ss = SpreadsheetApp.openById(id);
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

// Function for development purposes only
function deleteProperties() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}
