import { useState } from 'react';

export const Generator = () => {
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

  const renderLengthItem = () => {
    if (password.length >= 8) {
      return (
        <li className="text-green-500">✓ Longitud superior a 8 caracteres</li>
      );
    } else if (password.length > 0) {
      return (
        <li className="text-red-500">X Longitud inferior a 8 caracteres</li>
      );
    } else {
      return <li>- Longitud superior a 8 caracteres</li>;
    }
  };

  const renderUpperCaseItem = () => {
    if (isUppercase) {
      return (
        <li className="text-green-500">✓ Contiene al menos 1 Mayúscula/s</li>
      );
    } else if (password.length > 0 && !isUppercase) {
      return (
        <li className="text-red-500">X Contiene al menos 1 Mayúscula/s</li>
      );
    } else {
      return <li>- Contiene al menos 1 Mayúscula/s</li>;
    }
  };
  const renderLowerCaseItem = () => {
    if (isLowercase) {
      return (
        <li className="text-green-500">✓ Contiene al menos 1 Minúscula/s</li>
      );
    } else if (password.length > 0 && !isLowercase) {
      return (
        <li className="text-red-500">X Contiene al menos 1 Minúscula/s</li>
      );
    } else {
      return <li>- Contiene al menos 1 Minúscula/s</li>;
    }
  };

  const renderNumberItem = () => {
    if (isNumbers) {
      return <li className="text-green-500">✓ Contiene al menos 1 Número/s</li>;
    } else if (password.length > 0 && !isNumbers) {
      return <li className="text-red-500">X Contiene al menos 1 Número/s</li>;
    } else {
      return <li>- Contiene al menos 1 Número/s</li>;
    }
  };

  const renderSymbolItem = () => {
    if (isSymbols) {
      return (
        <li className="text-green-500">✓ Contiene al menos 1 Símbolo/s</li>
      );
    } else if (password.length > 0 && !isSymbols) {
      return <li className="text-red-500">X Contiene al menos 1 Símbolo/s</li>;
    } else {
      return <li>- Contiene al menos 1 Símbolo/s</li>;
    }
  };

  return (
    <div className="container">
      <div className="generator-container">
        <h1>Generator</h1>
        <div className="input-container">
          <input type="text" value={password} onChange={handleInputChange} />
          <button>Generar</button>
        </div>
        <div className="options-container">
          <ul>
            {renderLengthItem()}

            {renderUpperCaseItem()}
            {renderLowerCaseItem()}
            {renderNumberItem()}
            {renderSymbolItem()}
          </ul>
          <button disabled={active !== 5}>Copiar al portapapeles</button>
        </div>
      </div>
    </div>
  );
};
