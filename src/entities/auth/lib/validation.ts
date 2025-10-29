export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateUsername = (username: string): ValidationResult => {
  if (username.length < 8) {
    return {
      isValid: false,
      error: 'Имя пользователя должно содержать минимум 8 символов',
    };
  }
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Пароль должен содержать минимум 8 символов',
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasUpperCase) {
    return {
      isValid: false,
      error: 'Пароль должен содержать минимум 1 заглавную букву',
    };
  }

  if (!hasNumber) {
    return {
      isValid: false,
      error: 'Пароль должен содержать минимум 1 цифру',
    };
  }

  return { isValid: true };
};

export const validatePasswordConfirmation = (password: string, confirmation: string): ValidationResult => {
  if (password !== confirmation) {
    return {
      isValid: false,
      error: 'Пароли не совпадают',
    };
  }
  return { isValid: true };
};
