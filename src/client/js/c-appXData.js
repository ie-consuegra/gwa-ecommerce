/* appXData uses the functions/variables declared in:
* a-utils.js: formatCurrency
* b-cart.js
* b-store.js: isAvailable, isActive
*/

function appXData() {
  return {
    // Store stuff
    data: [],
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
        .withSuccessHandler((stock) => {
          // Add inCart attribute to each stock item
          const stockData = JSON.parse(stock).map((item) => ({ ...item, inCart: 0 }));
          self.data = stockData;
        })
        .queryStock();
    },
  };
}
