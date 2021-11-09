
const compose = (...fns) => (initialValue) =>
  fns.reduceRight((val, fn) => fn(val), initialValue)

// helpers
const convertString = (char) => (x = '') => x.split(' ').join(char)
const hyphenateString = convertString('-')
const specialCharactersRegex = new RegExp(/[^a-zA-Z]/g)
const removeSpecialChars = (s) => s.replace(specialCharactersRegex, ' ')
const trim = (x) => x.trim()

const sanitizeString = compose(hyphenateString, trim, removeSpecialChars)
const getCurrentTimestamp = () => new Date().toUTCString()
const formatFleekResponse = ({ data = new Uint8Array() }) =>
  JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)))
const calculateTokenSupply = (decimals) => (amount) =>
  Number(amount) / Math.pow(10, decimals)
export {
  calculateTokenSupply,
  formatFleekResponse,
  getCurrentTimestamp,
  sanitizeString
}
