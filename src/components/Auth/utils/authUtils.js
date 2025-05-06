/**
 * Validates an email address using a regular expression.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a password to ensure it meets the minimum length requirement.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is at least 8 characters long.
 */
export const validatePassword = (password) => {
  return password.length >= 8;
};

/**
 * Calculates the strength of a password based on various criteria.
 * @param {string} password - The password to evaluate.
 * @returns {number} - A strength score between 0 and 5.
 */
export const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1; // Minimum length
  if (/[A-Z]/.test(password)) strength += 1; // Contains uppercase letters
  if (/[a-z]/.test(password)) strength += 1; // Contains lowercase letters
  if (/[0-9]/.test(password)) strength += 1; // Contains numbers
  if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Contains special characters
  return strength;
};