import { describe, it, expect } from 'vitest';
import {
  validateUsername,
  validatePassword,
  validatePasswordConfirmation,
} from './validation';

describe('validateUsername', () => {
  describe('Позитивные тесты', () => {
    it('должен принять имя пользователя ровно 8 символов', () => {
      const result = validateUsername('username');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять имя пользователя длиннее 8 символов', () => {
      const result = validateUsername('verylongusername');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять имя пользователя с цифрами и спецсимволами', () => {
      const result = validateUsername('user1234!@#');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять имя пользователя с пробелами (если длина >= 8)', () => {
      const result = validateUsername('user name');
      expect(result).toEqual({ isValid: true });
    });
  });

  describe('Негативные тесты', () => {
    it('должен отклонить имя пользователя короче 8 символов', () => {
      const result = validateUsername('user');
      expect(result).toEqual({
        isValid: false,
        error: 'Имя пользователя должно содержать минимум 8 символов',
      });
    });

    it('должен отклонить имя пользователя из 7 символов', () => {
      const result = validateUsername('usernam');
      expect(result).toEqual({
        isValid: false,
        error: 'Имя пользователя должно содержать минимум 8 символов',
      });
    });

    it('должен отклонить пустую строку', () => {
      const result = validateUsername('');
      expect(result).toEqual({
        isValid: false,
        error: 'Имя пользователя должно содержать минимум 8 символов',
      });
    });

    it('должен отклонить имя из одного символа', () => {
      const result = validateUsername('u');
      expect(result).toEqual({
        isValid: false,
        error: 'Имя пользователя должно содержать минимум 8 символов',
      });
    });
  });
});

describe('validatePassword', () => {
  describe('Позитивные тесты', () => {
    it('должен принять валидный пароль с заглавной буквой и цифрой', () => {
      const result = validatePassword('Password1');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль ровно 8 символов с заглавной буквой и цифрой', () => {
      const result = validatePassword('Pass1234');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять длинный пароль с заглавной буквой и цифрой', () => {
      const result = validatePassword('VeryLongPassword123456');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль со спецсимволами', () => {
      const result = validatePassword('Pass1234!@#$');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль с несколькими заглавными буквами и цифрами', () => {
      const result = validatePassword('PASSWORD123');
      expect(result).toEqual({ isValid: true });
    });
  });

  describe('Негативные тесты - длина', () => {
    it('должен отклонить пароль короче 8 символов', () => {
      const result = validatePassword('Pass1');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 8 символов',
      });
    });

    it('должен отклонить пустой пароль', () => {
      const result = validatePassword('');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 8 символов',
      });
    });

    it('должен отклонить пароль из 7 символов даже с заглавной буквой и цифрой', () => {
      const result = validatePassword('Pass123');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 8 символов',
      });
    });
  });

  describe('Негативные тесты - заглавная буква', () => {
    it('должен отклонить пароль без заглавной буквы', () => {
      const result = validatePassword('password123');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 заглавную букву',
      });
    });

    it('должен отклонить пароль из строчных букв и цифр', () => {
      const result = validatePassword('lowercasepass1');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 заглавную букву',
      });
    });
  });

  describe('Негативные тесты - цифра', () => {
    it('должен отклонить пароль без цифры', () => {
      const result = validatePassword('PasswordOnly');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 цифру',
      });
    });

    it('должен отклонить пароль из заглавных и строчных букв без цифр', () => {
      const result = validatePassword('PasswordWord');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 цифру',
      });
    });
  });

  describe('Граничные случаи', () => {
    it('должен принять пароль с заглавной буквой в начале', () => {
      const result = validatePassword('Password1');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль с заглавной буквой в конце', () => {
      const result = validatePassword('password1P');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль с цифрой в начале', () => {
      const result = validatePassword('1Password');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять пароль с цифрой в конце', () => {
      const result = validatePassword('Password1');
      expect(result).toEqual({ isValid: true });
    });

    it('должен отклонить пароль только из цифр', () => {
      const result = validatePassword('12345678');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 заглавную букву',
      });
    });

    it('должен отклонить пароль только из спецсимволов', () => {
      const result = validatePassword('!@#$%^&*');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароль должен содержать минимум 1 заглавную букву',
      });
    });
  });
});

describe('validatePasswordConfirmation', () => {
  describe('Позитивные тесты', () => {
    it('должен принять одинаковые пароли', () => {
      const result = validatePasswordConfirmation('Password123', 'Password123');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять одинаковые пустые строки', () => {
      const result = validatePasswordConfirmation('', '');
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять одинаковые длинные пароли', () => {
      const password = 'VeryLongPassword123!@#';
      const result = validatePasswordConfirmation(password, password);
      expect(result).toEqual({ isValid: true });
    });

    it('должен принять одинаковые пароли со спецсимволами', () => {
      const result = validatePasswordConfirmation('P@ssw0rd!', 'P@ssw0rd!');
      expect(result).toEqual({ isValid: true });
    });
  });

  describe('Негативные тесты', () => {
    it('должен отклонить разные пароли', () => {
      const result = validatePasswordConfirmation('Password123', 'Password124');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пароли с разным регистром', () => {
      const result = validatePasswordConfirmation('Password123', 'password123');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пароли с разной длиной', () => {
      const result = validatePasswordConfirmation('Password123', 'Password1234');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пароль и пустую строку', () => {
      const result = validatePasswordConfirmation('Password123', '');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пустую строку и пароль', () => {
      const result = validatePasswordConfirmation('', 'Password123');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пароли, отличающиеся пробелом в начале', () => {
      const result = validatePasswordConfirmation('Password123', ' Password123');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });

    it('должен отклонить пароли, отличающиеся пробелом в конце', () => {
      const result = validatePasswordConfirmation('Password123', 'Password123 ');
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });
  });

  describe('Граничные случаи', () => {
    it('должен принять одинаковые пароли из одного символа', () => {
      const result = validatePasswordConfirmation('1', '1');
      expect(result).toEqual({ isValid: true });
    });

    it('должен отклонить почти одинаковые пароли', () => {
      const result = validatePasswordConfirmation('Password123', 'Password12З'); // последний символ - кириллица
      expect(result).toEqual({
        isValid: false,
        error: 'Пароли не совпадают',
      });
    });
  });
});

