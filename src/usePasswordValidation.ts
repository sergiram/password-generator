import { useState } from 'react';

export const usePasswordValidation = () => {
  const [password, setPassword] = useState<string>('');
  const [minimumLength, setMinimumLength] = useState<boolean>(false);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [isLowercase, setIsLowercase] = useState<boolean>(false);
  const [isNumbers, setIsNumbers] = useState<boolean>(false);
  const [isSymbols, setIsSymbols] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
