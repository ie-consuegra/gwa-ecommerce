// STORE RELATED FUNCTIONS

/** Return the string will be displayed
 *  in the availability section of the item card
 * @param {Number} stock Quantity of items available
 * @returns {String}
 */
function isAvailable(stock) {
  return stock === 0 ? 'Agotado' : `${stock.toString()} disponibles`;
}

/** Return the "disabled" string
 * in case there is no stock available.
 * This class disables the add-to-cart button
 * @param {Object} item Store item object
 * @returns {String}
 */
function isActive(item) {
  return item.stock > 0 ? '' : 'disabled';
}
