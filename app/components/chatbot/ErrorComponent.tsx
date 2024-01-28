// ErrorComponent.js

import React from 'react';
type ErrorComponentType = {
  errorMessage: string;
  onRetry: () => void;
}
const ErrorComponent = ({ errorMessage, onRetry }: ErrorComponentType) => {
  return (
    <div className="error">
      <p>{errorMessage}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorComponent;
