// CART RELATED ATTRIBUTES AND METHODS

const cart = {
  totalItemsInCart: 0,
  itemsBefore: 0,
  subtotal: 0,
  deliveryCost: 0,
  totalToPay: 0,

  // METHODS

  /** Check if there are items added to cart
   * Returns true whether the argument passed is higher than zero
   * @param {Number} itemsInCart Items added to cart by user
   * @returns {Boolean} True if there's at least 1 item added to cart, false if is equal to zero
   */
  isInCart(itemsInCart) {
    return Number(itemsInCart) > 0;
  },

  /** Add one item to the cart
   * Increase by one the value of item.inCart
   * the final value can't be higher than the stock available
   * @param {Object} item Store item object
   */
  addToCart(item) {
    item.inCart = Number(item.inCart);
    item.stock = Number(item.stock);
    if (item.inCart < item.stock && item.stock > 0) {
      item.inCart += 1;
      this.totalItemsInCart += 1;
      this.subtotal += item.price;
      this.updateTotalToPay();
    }
  },

  /** Substract one item to the cart
   * Decrease by one the value of item.inCart
   * the final value can't be lower than zero
   * @param {Object} item Store item object
   */
  substractToCart(item) {
    item.inCart = Number(item.inCart);
    if (item.inCart > 0) {
      item.inCart -= 1;
      this.totalItemsInCart -= 1;
      this.subtotal -= item.price;
      this.updateTotalToPay();
    }
  },

  /** Avoid the user input any value higher
   * than the stock available
   * @param {Object} item Store item object
   */
  checkCartValueInput(item) {
    if (item.inCart > Number(item.stock)) {
      item.inCart = Number(item.stock);
    }
  },

  /** Update the global counter of items
   * when user inputs a value manually not using
   * the add or substract buttons
   * @param {Object} item Store item object
   */
  updateTotalItems(item) {
    const itemsNow = item.inCart - this.itemsBefore;
    const priceNow = (item.inCart * item.price) - (this.itemsBefore * item.price);
    this.totalItemsInCart += itemsNow;
    this.subtotal += priceNow;
    this.updateTotalToPay();
    this.itemsBefore = item.inCart;
  },

  /** Remove one item from the cart.
   * Substract the number of items from the total
   * and set inCart value to zero
   * @param {Object} item Store item object
   */
  removeFromCart(item) {
    this.totalItemsInCart -= item.inCart;
    this.subtotal -= item.inCart * item.price;
    item.inCart = 0;
  },

  /**
   * Update the total value the user
   * must to pay
   */
  updateTotalToPay() {
    this.totalToPay = this.subtotal + this.deliveryCost;
  },
};
