import { usePasswordValidation } from './usePasswordValidation';
import { ValidationItem } from './ValidationItem';

export const Generator = () => {
  const {
    password,
    handleInputChange,
    handleGeneratePassword,
    active,
    validations,
  } = usePasswordValidation();

  const showError = password.length > 0;

  return (
    <div className="container">
      <div className="generator-container">
        <h1>Generator</h1>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={handleInputChange}
          />
          <button onClick={() => handleGeneratePassword()}>Generar</button>
        </div>
        <div className="options-container">
          <ul>
            <ValidationItem
              isValid={validations.minimumLength}
              text="Longitud superior a 8 caracteres"
              showError={showError && !validations.minimumLength}
            />
            <ValidationItem
              isValid={validations.isUppercase}
              text="Contiene al menos 1 Mayúscula/s"
              showError={showError && !validations.isUppercase}
            />
            <ValidationItem
              isValid={validations.isLowercase}
              text="Contiene al menos 1 Minúscula/s"
              showError={showError && !validations.isLowercase}
            />
            <ValidationItem
              isValid={validations.isNumbers}
              text="Contiene al menos 1 Número/s"
              showError={showError && !validations.isNumbers}
            />
            <ValidationItem
              isValid={validations.isSymbols}
              text="Contiene al menos 1 Símbolo/s"
              showError={showError && !validations.isSymbols}
            />
          </ul>
          <button disabled={active !== 5}>Copiar al portapapeles</button>
        </div>
      </div>
    </div>
  );
};
