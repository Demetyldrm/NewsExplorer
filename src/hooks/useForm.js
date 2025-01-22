import { useState, useCallback } from "react";

const useForm = (userInputs) => {
  const [values, setValues] = useState(userInputs);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleChange };
};

const useFormWithValidation = (defaultValue) => {
  const [values, setValues] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = defaultValue, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, defaultValue]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
};

export { useForm, useFormWithValidation };
