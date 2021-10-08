// STORE RELATED FUNCTIONS

/** Return the string will be displayed
 *  in the availability section of the item card
 * @param {Number} stock Quantity of items available
 * @returns {String}
 */
function isAvailable(item) {
  let availability = '';
  if (item.type.toUpperCase() === 'PRODUCTO') {
    availability = item.stock === 0 ? 'Agotado' : `${item.stock.toString()} disponibles`;
  }
  return availability;
}

/** Return the "disabled" string
 * in case there is no stock available.
 * This class disables the add-to-cart button
 * @param {Object} item Store item object
 * @returns {String}
 */
function isActive(item) {
  let active = '';
  if (item.type.toUpperCase() === 'PRODUCTO') {
    active = item.stock > 0 ? '' : 'disabled';
  }
  return active;
}
