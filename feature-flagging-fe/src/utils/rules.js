export const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || 'Enter a valid email address.'
  },
  number: (value) => !isNaN(value) || 'Enter a valid number.',
  minLength: (min) => (value) =>
    (value && value.length >= min) || `Minimum length is ${min} characters.`,
  maxLength: (max) => (value) =>
    (value && value.length <= max) || `Maximum length is ${max} characters.`,
  custom: (validatorFn, errorMessage) => (value) => validatorFn(value) || errorMessage,
  year(val) {
    const year = parseInt(val, 10);
    if (!val) {
      return true; // Allow empty input if it's optional
    }
    if (!/^\d{4}$/.test(val)) {
      return "Enter a valid year.";
    }
    if (year < 1970 || year > new Date().getFullYear()) {
      return `Year must be between 1970 and ${new Date().getFullYear()}.`;
    }
    return true;
  },
  youtubeLink: (val) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.+)?$/;
    return urlPattern.test(val) || 'Please enter a valid youtube link';
  },
}
