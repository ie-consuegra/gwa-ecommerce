function doGet() {
  const html = HtmlService.createHtmlOutputFromFile('frontend');
  output = html
    .setTitle('GWA ecommerce - Admin view')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output;
}
