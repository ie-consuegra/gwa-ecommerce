App.init();

function queryStock() {
  const url = 'https://docs.google.com/spreadsheets/d/1zME7BfSEP1CtYHNklxXWAVtcf4n5XH1lhjRxLoKK470/edit';

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

  const refs = connection.getSheetRefs();
  Logger.log(`\nList of refs:\n ${JSON.stringify(refs, null, ' ')}`);

  const data = connection.table('db', types).get();
  return JSON.stringify(data, null, ' ');
}

function fetchAppMeta() {
  return App.meta;
}
