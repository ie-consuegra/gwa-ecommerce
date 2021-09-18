// CART RELATED FUNCTIONS

/** Check if there are items added to cart
 * Returns true whether the argument passed is higher than zero
 * @param {Number} itemsInCart Items added to cart by user
 * @returns {Boolean} True if there's at least 1 item added to cart, false if is equal to zero
 */
function isInCart(itemsInCart) {
  return Number(itemsInCart) > 0;
}

/** Add one item to the cart
 * Increase by one the value of item.inCart
 * the final value can't be higher than the stock available
 * @param {Object} item Store item object
 */
function addToCart(item) {
  item.inCart = Number(item.inCart);
  item.stock = Number(item.stock);
  if (item.inCart < item.stock && item.stock > 0) {
    item.inCart += 1;
    this.totalItemsInCart += 1;
  }
}

/** Substract one item to the cart
 * Decrease by one the value of item.inCart
 * the final value can't be lower than zero
 * @param {Object} item Store item object
 */
function substractToCart(item) {
  item.inCart = Number(item.inCart);
  if (item.inCart > 0) {
    item.inCart -= 1;
    this.totalItemsInCart -= 1;
  }
}

/** Avoid the user input any value higher
 * than the stock available
 * @param {Object} item Store item object
 */
function checkCartValueInput(item) {
  if (item.inCart > Number(item.stock)) {
    item.inCart = Number(item.stock);
  }
}

/** Update the global counter of items
 * when user inputs a value manually not using
 * the add or substract buttons
 * @param {Object} item Store item object
 */
function updateTotalItems(item) {
  const itemsNow = item.inCart - this.itemsBefore;
  this.totalItemsInCart += itemsNow;
}

/** Remove one item from the cart.
 * Substract the number of items from the total
 * and set inCart value to zero
 * @param {Object} item Store item object
 */
function removeFromCart(item) {
  this.totalItemsInCart -= item.inCart;
  item.inCart = 0;
}
