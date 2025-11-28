import { useState } from 'react';

export const Generator = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(8);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [symbols, setSymbols] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="container">
      <div className="generator-container">
        <h1>Generator</h1>
        <div className="input-container">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Generar</button>
        </div>
        <div className="options-container">
          <ul>
            <li>- Longitud</li>
            <li>- Mayusculas</li>
            <li>- Minusculas</li>
            <li>- Simbolos</li>
          </ul>
          <button disabled={active}>Copiar al portapapeles</button>
        </div>
      </div>
    </div>
  );
};
