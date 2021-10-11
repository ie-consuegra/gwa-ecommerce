// CART RELATED ATTRIBUTES AND METHODS

const cart = {
  totalItemsInCart: 0,
  itemsBefore: 0,
  subtotal: 0,
  deliveryCost: 0,
  totalToPay: 0,
  settings: {},
  hasPickup: false,
  hasDelivery: false,
  hasDeliveryOther: false,
  deliveryDetails: '',
  deliveryChosen: '',
  paymentMethods: [],
  paymentMethodDetails: '',

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

  /**
   * Take the settings object and adapt cart
   * according to it
   */
  applySettings(settings) {
    // Set parameters in the global variables
    CURRENCY_SYMBOL = settings.currency;
    DECIMAL_SEPARATOR = settings['decimal-separator'];
    USE_CENTS = settings.cents === 'true';

    this.settings = settings;

    // Set logo url
    if (settings.logo) {
      this.logoUrl = settings.logo;
    }

    this.hasPickup = !!settings.pickup;
    if (this.hasPickup) {
      document.getElementById('pickup').checked = true;
    }

    this.hasDelivery = !!settings['delivery-option'];
    if (this.hasDelivery) {
      document.getElementById('pickup').checked = false;
      document.getElementById('delivery').checked = true;
    }

    this.hasDeliveryOther = !!settings['delivery-other'];
    if (this.hasDeliveryOther) {
      document.getElementById('delivery').checked = false;
      document.getElementById('delivery-other').checked = true;
    }

    this.showDeliveryDetails();

    // Create the array of payment methods
    const paymentMethods = [];
    let paymentMethodsIndex = 0;
    let attributeName = `paymentMethodName${paymentMethodsIndex}`;

    while (settings[attributeName]) {
      const attributeDetails = `paymentMethodDetails${paymentMethodsIndex}`;
      paymentMethods.push({
        name: settings[attributeName],
        details: settings[attributeDetails],
      });
      paymentMethodsIndex += 1;
      attributeName = `paymentMethodName${paymentMethodsIndex}`;
    }

    this.paymentMethods = paymentMethods;
    document.getElementById('payment-method-details').innerText = paymentMethods[0].details;
  },

  showDeliveryDetails() {
    const optionChosen = document.querySelector('form').elements['delivery-pickup'].value;

    switch (optionChosen) {
      case 'pickup':
        this.deliveryDetails = this.settings['pickup-details'];
        this.deliveryCost = 0;
        this.deliveryChosen = 'Recoger en sitio';
        break;
      case 'delivery':
        this.deliveryDetails = this.settings['delivery-details'];
        this.deliveryCost = Number(this.settings['delivery-price']) || 0;
        this.deliveryChosen = 'Entrega a domicilio';
        break;
      case 'delivery-other':
        this.deliveryDetails = this.settings['delivery-other-details'];
        this.deliveryCost = Number(this.settings['delivery-other-price']) || 0;
        this.deliveryChosen = 'Otra forma de entrega';
        break;
      default:
        break;
    }
    // Update the total to pay
    this.updateTotalToPay();
  },

  showPaymentDetails() {
    const paymentChosen = document.getElementById('payment-method').value;

    let paymentDetails = '';
    this.paymentMethods.forEach((item) => {
      if (item.name === paymentChosen) {
        paymentDetails = item.details;
      }
    });

    this.paymentMethodDetails = paymentDetails;
  },

  /** Return an array of all the items the customer has put in cart:
   * Any item which inCart value is higher than 0
   * @returns {Object[]} Array of items put in cart
   */
  getItemsInCart() {
    const cartList = this.stock.filter((item) => item.inCart > 0);
    return cartList;
  },

  /** Join WhatsApp API URL, parameters and message text
   * Message text must be encoded
   * @param {String} text WhatsApp Message text
   * @returns {String}
   */
  whatsappApiUrlGenerator(text) {
    const WHATSAPP_API_URL = 'https://api.whatsapp.com/send';
    const WHATSAPP_PHONE_PARAM = `?phone=${this.settings['business-whatsapp']}`;
    const WHATSAPP_TEXT_PARAM = `&text=${text}`;

    return `${WHATSAPP_API_URL}${WHATSAPP_PHONE_PARAM}${WHATSAPP_TEXT_PARAM}`;
  },

  /**  Get an array of product items and
   * return a formatted string to be used in
   * the WhatsApp body text
   * @param {Object[]} cartList Array of items in cart
   * @returns {String}
   */
  formatCartList(cartList) {
    let cartListRawStr = '';

    cartList.forEach((item) => {
      const { inCart, name, price } = item;
      const subtotal = Number(inCart) * Number(price);

      const formattedPrice = formatCurrency(price);
      const formattedSubtotal = formatCurrency(subtotal);

      const detailsLine = `*${inCart} x ${name}* | Precio ${formattedPrice} | total ${formattedSubtotal}`;

      cartListRawStr = `${cartListRawStr}
${detailsLine}`;
    });

    return cartListRawStr;
  },

  formatHeaderText(cartFormData) {
    const name = cartFormData.get('name');
    const contactNumber = cartFormData.get('contact');
    const address = cartFormData.get('address');
    const landmarkOrZip = cartFormData.get('landmark-zip') || '---';
    const businessHeader = `*_${this.settings['business-name']} ::: Pedido/Orden Digital_* 

`;
    const detailHeader = `

*Detalle*`;

    const customerDataLine = `*Nombre:* ${name} | *WhatsApp:* ${contactNumber} | *Dirección:* ${address} (Punto de referencia/Código Zip: ${landmarkOrZip})`;

    return `${businessHeader}${customerDataLine}${detailHeader}`;
  },

  formatFooterText(cartFormData) {
    let delivery = '';
    switch (cartFormData.get('delivery-pickup')) { // TRANSLATE DELIVERY METHOD WORKAROUND
      case 'pickup':
        delivery = 'Recoger en sitio';
        break;
      case 'delivery':
        delivery = 'Entregar a domicilio';
        break;
      case 'delivery-other':
        delivery = 'Otra forma de entrega';
        break;
      default:
        break;
    }
    const paymentMethod = cartFormData.get('payment-method');
    const extraInfo = cartFormData.get('extra-info') || '---';

    const {
      subtotal,
      deliveryCost,
      totalToPay,
      paymentMethodDetails,
    } = this;

    const deliveryLine = `

*Entrega/despacho: ${delivery}* | Costo: ${formatCurrency(deliveryCost)}
`;
    const extraInfoLine = `*Información adicional:* ${extraInfo}
`;

    const subtotalLine = `
*SUBTOTAL: ${formatCurrency(subtotal)}*`;

    const totalToPayLine = `
*TOTAL A PAGAR: ${formatCurrency(totalToPay)}*`;

    const paymentMethodLine = `
*Medio de pago: ${paymentMethod}* | ${paymentMethodDetails}`;

    const footerRawText = deliveryLine
      + extraInfoLine
      + subtotalLine
      + totalToPayLine
      + paymentMethodLine;

    return footerRawText;
  },

  launchWhatsapp(event) {
    if (document.getElementById('remember-me').checked) {
      this.registerCustomer();
    }
    const cartFormData = new FormData(event.target);
    const cartList = this.getItemsInCart();

    const cartListText = this.formatCartList(cartList);
    const headerText = this.formatHeaderText(cartFormData);
    const footerText = this.formatFooterText(cartFormData);

    const whatsappText = `${headerText}${cartListText}${footerText}`;
    const encodedWhatsappText = encodeURI(whatsappText);

    const waUrl = this.whatsappApiUrlGenerator(encodedWhatsappText);

    window.open(waUrl, '_blank');
  },

  loadRegisteredCustomer() {
    if (localStorage.getItem('customerInfo')) {
      const customerInfoJSON = localStorage.getItem('customerInfo');
      const customerInfo = JSON.parse(customerInfoJSON);

      Object.entries(customerInfo).forEach((field) => {
        const fieldName = field[0];
        const fieldValue = field[1];

        const inputElem = document.getElementById(fieldName);
        inputElem.value = fieldValue;
      });
    }
  },

  registerCustomer() {
    const inputsIds = ['name', 'address', 'contact', 'landmark-zip', 'extra-info'];
    const customerInfo = {};

    inputsIds.forEach((inputId) => {
      customerInfo[inputId] = document.getElementById(inputId).value;
    });

    const customerInfoJSON = JSON.stringify(customerInfo);
    localStorage.setItem('customerInfo', customerInfoJSON);
  },
};
