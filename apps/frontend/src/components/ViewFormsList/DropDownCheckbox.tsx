import * as React from 'react';

interface CheckboxProps {
    label: string;
    value: boolean;
    onChange: () => void;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
    return (
      <label>
        {label}
        <input type="checkbox" checked={value} onChange={onChange} />
      </label>
    );
  };

  export default Checkbox;