import { useState } from "react";

export const useInputValidate = () => {
  const [value, setValue] = useState("");
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
