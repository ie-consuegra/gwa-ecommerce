/* appXData uses the functions/variables declared in:
* a-utils.js: formatCurrency
* b-cart.js
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
    storeVisible: true,
    toggleView() {
      this.storeVisible = !this.storeVisible;
    },

    // Cart stuff
    ...cart,
  };
}
