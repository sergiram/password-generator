import { useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === '') {
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

  const handleCopyPassword = () => {
    if (!inputRef.current) return;
    inputRef.current.select();
    navigator.clipboard.writeText(password);

    toast.success('Contraseña copiada al portapapeles');
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const checkLength = (inputLength: number) => {
    setMinimumLength(inputLength >= 8);
  };

  const checkUppercase = (inputValue: string) => {
    setIsUppercase(/[A-Z]/.test(inputValue));
  };

  const checkLowercase = (inputValue: string) => {
    setIsLowercase(/[a-z]/.test(inputValue));
  };

  const checkNumber = (inputValue: string) => {
    setIsNumbers(/[0-9]/.test(inputValue));
  };

  const checkSymbol = (inputValue: string) => {
    setIsSymbols(/[!@#$%^&*()_+\-=[\]{};':",./<>?]/.test(inputValue));
  };

  const active = [
    minimumLength,
    isUppercase,
    isLowercase,
    isNumbers,
    isSymbols,
  ].filter(Boolean).length;

  return {
    password,
    handleInputChange,
    handleGeneratePassword,
    handleCopyPassword,
    handleShowPassword,
    showPassword,
    active,
    validations: {
      minimumLength,
      isUppercase,
      isLowercase,
      isNumbers,
      isSymbols,
    },
    inputRef,
  };
};
