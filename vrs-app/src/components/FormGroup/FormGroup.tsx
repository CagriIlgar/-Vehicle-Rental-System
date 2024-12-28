import React from "react";
import "./formGroup.css";

interface FormGroupProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  options?: string[];
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  name,
  type,
  placeholder = "",
  required = false,
  accept,
  options,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select id={id} name={name} required={required}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          accept={accept}
        />
      )}
    </div>
  );
};

export default FormGroup;
