// FORMAT CURRENCY
const CURRENCY_SYMBOL = '$ ';
const DECIMAL_SEPARATOR = ',';
const USE_CENTS = false;

/**
 * Get a series of digits and add thousands separators
 * @param {String} num String of a series of digits
 * @param {String} decSeparator Character used as decimal separator: Point or Comma
 * @returns {String} Number with thousands separator
 */
function formatDigits(num, decSeparator) {
  const thousandsSeparator = (decSeparator === '.' ? ',' : '.');
  return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
}

/**
 * Add zeroes to the right side of the number passed as argument
 * @param {String} num Number that gets the zeroes
 * @param {Number} zeroes Number of zeroes to be added
 * @returns {String}
 */
function addZeroes(num, zeroes) {
  let count = 0;
  let numWithZeroes = num;
  while (count < zeroes) {
    numWithZeroes = `${numWithZeroes}0`;
    count += 1;
  }
  return numWithZeroes;
}

/**
 * Format numbers whether they be integers or floats
 * @param {String} num Number to be formatted
 * @param {String} decSeparator Character used as decimal separator: Point or comma.
 * @param {Number} decimals Integer that limits the number of decimals accepted
 * @param {Boolean} addZero Define if the function must add zeroes to the decimals.
 * @returns {String} Formatted number
 */
function formatNumber(num, decSeparator = ',', decimals = 0, addZero = false) {
  let formattedNum = '';
  if (num) {
    if (num.indexOf(decSeparator) >= 0) {
      const decimalPos = num.indexOf(decSeparator);

      let leftSide = num.substring(0, decimalPos);
      let rightSide = num.substring(decimalPos);

      // Add thousand separator to left side of number
      leftSide = formatDigits(leftSide, decSeparator);
      // Validate right side
      rightSide = formatDigits(rightSide, decSeparator);

      // Add number
      if (addZero) {
        rightSide = addZeroes(rightSide, decimals);
      }

      // Limit decimal to number of digits sent by argument
      rightSide = rightSide.substring(0, decimals);
      // Join the pieces including the decimal separator
      formattedNum = leftSide + decSeparator + rightSide;
    } else {
      // no decimal entered
      // add commas or points to number
      // remove all non-digits
      formattedNum = formatDigits(num, decSeparator);

      if (addZero) {
        formattedNum = `${formattedNum}${decSeparator}${addZeroes('', decimals)}`;
      }
    }
  }
  return formattedNum;
}

/**
 * Take a number and format it to be used as a price, include a currency symbol too.
 * @param {Number, String} number Value to be formatted as a price
 * @returns {String} Value formatted as a price including currency symbol
 */
function formatCurrency(number) {
  let formattedCurrency = '';
  let numberStr = '';
  if (number) {
    if (typeof number === 'number') {
      numberStr = number.toString();
    }
    const integerSign = (Number(numberStr) < 0 ? '-' : '');
    const formattedNumber = formatNumber(numberStr, DECIMAL_SEPARATOR, 2, USE_CENTS);
    formattedCurrency = `${CURRENCY_SYMBOL}${integerSign}${formattedNumber}`;
  }
  return formattedCurrency;
}
