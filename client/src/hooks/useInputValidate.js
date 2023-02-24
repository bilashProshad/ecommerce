import { useState } from "react";

export const useInputValidate = (data) => {
  const [value, setValue] = useState(data ? data : "");
  const [error, setError] = useState(false);

  const onBlurHandler = () => {
    if (value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return [value, setValue, error, onBlurHandler];
};
