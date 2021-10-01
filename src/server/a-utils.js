/**
 * Generate a String made of random alphanumerical characters
 * @param {Number} length Length the string will have
 * @returns {String}
 */
function generateRandomString(length = 10) {
  return [...Array(length)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');
}
