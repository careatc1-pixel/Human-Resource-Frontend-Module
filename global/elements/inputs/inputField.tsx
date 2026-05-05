'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  onChangeAction?: (value: string) => void;
}

const InputField = ({
  id,
  label,
  className,
  defaultValue,
  disabled = false,
  error,
  onBlur,
  placeholder,
  readOnly,
  required = false,
  type = 'text',
  value,
  onChangeAction,
}: InputFieldProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const isControlled = value !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    if (onChangeAction) onChangeAction(newValue);
  };

  return (
    <div className={className}>
      <Label htmlFor={id} className="ml-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={isControlled ? value : internalValue}
        onChange={handleChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className="mt-2"
      />
      {error && <p className="mt-1 text-sm text-destructive text-left">{error}</p>}
    </div>
  );
};

export default InputField;