interface ValidationItemProps {
  isValid: boolean;
  text: string;
  showError: boolean;
}

export const ValidationItem = ({
  isValid,
  text,
  showError,
}: ValidationItemProps) => {
  if (isValid) {
    return <li className="text-green-500">✓ {text}</li>;
  } else if (showError) {
    return <li className="text-red-500">X {text}</li>;
  } else {
    return <li>- {text}</li>;
  }
};
