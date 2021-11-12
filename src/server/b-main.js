function firstUse() {
  // Format the spreadsheet
  const ss = SpreadsheetApp.openByUrl(DB);
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

function connectionTableFirstUse() {
  firstUse();

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

  const connection = SheetsDB.connect(DB, types);
  return connection.table('db', types);
}

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

  const connection = SheetsDB.connect(DB, types);

  const stock = (connection.table('db', types) || connectionTableFirstUse()).get();
  Logger.log(stock);
  const data = {
    stock,
    settings: SETTINGS,
  };
  return JSON.stringify(data, null, ' ');
}
