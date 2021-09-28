/* appXData uses the functions/variables declared in:
* a-utils.js: formatCurrency
* b-cart.js
* b-store.js: isAvailable, isActive
*/

function appXData() {
  return {
    // Store stuff
    stock: [],
    formatCurrency,
    isAvailable,
    isActive,

    // View stuff
    storeVisible: true,
    toggleView() {
      this.storeVisible = !this.storeVisible;
    },

    // Cart stuff
    ...cart,

    // Server calls
    fetchStockOnInit() {
      const self = this;
      google
        .script
        .run
        .withSuccessHandler((data) => {
          const dataObj = JSON.parse(data);
          // Add inCart attribute to each stock item
          self.stock = dataObj.stock.map((item) => ({ ...item, inCart: 0 }));
          self.applySettings(dataObj.settings);
          console.log(dataObj.settings);
        })
        .queryStock();
    },
  };
}
