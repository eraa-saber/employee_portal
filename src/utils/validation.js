// Frontend validation rules that match backend
export const validateEmail = (email) => {
  if (!email) return 'البريد الإلكتروني مطلوب';
  if (!/\S+@\S+\.\S+/.test(email)) return 'البريد الإلكتروني غير صحيح';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'كلمة المرور مطلوبة';
  if (password.length < 6) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  
  errors.email = validateEmail(formData.email);
  errors.password = validatePassword(formData.password);
  
  return {
    isValid: !errors.email && !errors.password,
    errors
  };
}; 