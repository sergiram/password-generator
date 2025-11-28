import { useState, type ChangeEvent } from 'react';

const generateRandomPassword = () => {
  const length = 12;
  const numbers = '1234567890';
  const symbols = '!@#$%^&*()_+{}[]|:;<>,.?/~';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const allChars = numbers + symbols + uppercase + lowercase;

  let newPassword = '';
  // Ensure at least one of each required type
  newPassword += numbers[Math.floor(Math.random() * numbers.length)];
  newPassword += symbols[Math.floor(Math.random() * symbols.length)];
  newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
  newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];

  // Fill the rest
  for (let i = 4; i < length; i++) {
    newPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  return newPassword
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};

export const usePasswordValidation = () => {
  const [password, setPassword] = useState<string>('');
  const [minimumLength, setMinimumLength] = useState<boolean>(false);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [isLowercase, setIsLowercase] = useState<boolean>(false);
  const [isNumbers, setIsNumbers] = useState<boolean>(false);
  const [isSymbols, setIsSymbols] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === '') {
      setActive(0);
      setMinimumLength(false);
      setIsUppercase(false);
      setIsLowercase(false);
      setIsNumbers(false);
      setIsSymbols(false);
      return;
    }

    checkLength(value.length);
    checkUppercase(value);
    checkLowercase(value);
    checkNumber(value);
    checkSymbol(value);
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);
    checkLength(newPassword.length);
    checkUppercase(newPassword);
    checkLowercase(newPassword);
    checkNumber(newPassword);
    checkSymbol(newPassword);
  };

  const checkLength = (inputLength: number) => {
    const isLengthValid = inputLength >= 8;
    if (!minimumLength && isLengthValid) {
      setActive((prev) => prev + 1);
      setMinimumLength(true);
    } else if (minimumLength && !isLengthValid) {
      setActive((prev) => prev - 1);
      setMinimumLength(false);
    }
  };

  const checkUppercase = (inputValue: string) => {
    const hasUppercase = /[A-Z]/.test(inputValue);
    if (!isUppercase && hasUppercase) {
      setActive((prev) => prev + 1);
      setIsUppercase(true);
    } else if (isUppercase && !hasUppercase) {
      setActive((prev) => prev - 1);
      setIsUppercase(false);
    }
  };

  const checkLowercase = (inputValue: string) => {
    const hasLowercase = /[a-z]/.test(inputValue);
    if (!isLowercase && hasLowercase) {
      setActive((prev) => prev + 1);
      setIsLowercase(true);
    } else if (isLowercase && !hasLowercase) {
      setActive((prev) => prev - 1);
      setIsLowercase(false);
    }
  };

  const checkNumber = (inputValue: string) => {
    const hasNumber = /[0-9]/.test(inputValue);
    if (!isNumbers && hasNumber) {
      setActive((prev) => prev + 1);
      setIsNumbers(true);
    } else if (isNumbers && !hasNumber) {
      setActive((prev) => prev - 1);
      setIsNumbers(false);
    }
  };

  const checkSymbol = (inputValue: string) => {
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':",./<>?]/.test(inputValue);
    if (!isSymbols && hasSymbol) {
      setActive((prev) => prev + 1);
      setIsSymbols(true);
    } else if (isSymbols && !hasSymbol) {
      setActive((prev) => prev - 1);
      setIsSymbols(false);
    }
  };

  return {
    password,
    handleInputChange,
    handleGeneratePassword,
    active,
    validations: {
      minimumLength,
      isUppercase,
      isLowercase,
      isNumbers,
      isSymbols,
    },
  };
};
