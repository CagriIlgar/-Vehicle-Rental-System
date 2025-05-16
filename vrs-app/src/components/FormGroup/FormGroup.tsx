import React from "react";
import "./form-group.css";

interface FormGroupProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  options?: string[];
  defaultValue?: any;
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
  defaultValue,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {options ? (
        <select id={id} name={name} required={required} defaultValue={defaultValue}>
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
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
};

export default FormGroup;
