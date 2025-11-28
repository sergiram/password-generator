import { useState } from 'react';

export const Generator = () => {
  const [password, setPassword] = useState<string>('');
  const [minimumLength, setMinimumLength] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setActive(0);
      setMinimumLength(false);
      setUppercase(false);
      setLowercase(false);
      setNumbers(false);
      setSymbols(false);
    }
    setPassword(value);
    checkLength(value.length);
    // checkUppercase(value);
  };

  const checkLength = (inputLength: number) => {
    if (minimumLength) return;

    if (inputLength >= 8) {
      setActive(active + 1);
      setMinimumLength(true);
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

            <li>- Contiene al menos 1 Mayúsculas</li>
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
