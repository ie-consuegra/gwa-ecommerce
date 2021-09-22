function doGet(e) {
  let output;

  if (App.isSetup) {
    if (e.parameter.gwa === 'admin') {
      const template = HtmlService.createTemplateFromFile('login');
      output = template.evaluate()
        .setTitle('GWA ecommerce - Admin Area')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } else {
      const template = HtmlService.createTemplateFromFile('frontend');
      output = template.evaluate()
        .setTitle('GWA ecommerce')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
  } else {
    const template = HtmlService.createTemplateFromFile('adminpage');
    output = template.evaluate()
      .setTitle('GWA ecommerce - Admin Area')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return output;
}
