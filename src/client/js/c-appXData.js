/* appXData uses the functions declared in:
* a-utils.js: formatCurrency
* b-cart.js: isInCart, addToCart, substractToCart
* b-store.js: isAvailable, isActive
*/

function appXData() {
  return {
    // Store stuff
    data,
    formatCurrency,
    isAvailable,
    isActive,

    // View stuff
    shopVisible: true,
    toggleView() {
      this.shopVisible = !this.shopVisible;
    },

    // Cart stuff
    totalItemsInCart: 0,
    itemsBefore: 0,
    isInCart,
    addToCart,
    substractToCart,
    checkCartValueInput,
    updateTotalItems,
  };
}
