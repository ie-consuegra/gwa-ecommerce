/* appXData uses the functions/variables declared in:
* a-utils.js: formatCurrency
* b-cart.js
* b-store.js: isAvailable, isActive
*/

function appXData() {
  return {
    // Store stuff
    logoUrl: 'https://ik.imagekit.io/2kiozwxkybfj/logo_loading_ZRj7KyBo8.gif',
    stock: [],
    formatValue,
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
          // Get settings before loading products
          self.applySettings(dataObj.settings);
          // Add inCart attribute to each stock item
          self.stock = dataObj.stock.map((item) => ({ ...item, inCart: 0 }));
        })
        .queryStock();
    },

    initializeApp() {
      this.fetchStockOnInit();
      this.loadRegisteredCustomer(); // Method from cart.js
    },
  };
}
