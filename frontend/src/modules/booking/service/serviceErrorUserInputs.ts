export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string) =>
  /^[0-9]{7,15}$/.test(phone.replace(/\s/g, ""));
