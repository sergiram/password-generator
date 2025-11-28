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
    // checkLowercase(value);
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

  const renderUppercaseItem = () => {
    if (isUppercase) {
      return (
        <li className="text-green-500">✓ Contiene al menos 1 Mayúsculas</li>
      );
    } else if (password.length > 0 && !isUppercase) {
      return <li className="text-red-500">X Contiene al menos 1 Mayúsculas</li>;
    } else {
      return <li>- Contiene al menos 1 Mayúsculas</li>;
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

            {renderUppercaseItem()}
            <li>- Contiene al menos 1 Minúsculas</li>
            <li>- Contiene al menos 1 Símbolo/s</li>
          </ul>
          <p>{active}</p>
          <button disabled={active !== 4}>Copiar al portapapeles</button>
        </div>
      </div>
    </div>
  );
};
