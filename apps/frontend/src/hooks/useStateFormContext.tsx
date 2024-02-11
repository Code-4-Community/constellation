import React, { createContext, useContext, ReactNode, useState } from 'react';

interface StateFormContextProps {
  isOtherStatesSelected: boolean;
  toggleOtherStates: (selectedString: string) => void;
}

const StateFormContext = createContext<StateFormContextProps | undefined>(
  undefined,
);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOtherStatesSelected, setIsOtherStatesSelected] = useState(false);

  const toggleOtherStates = (selectedState: string) => {
    setIsOtherStatesSelected(selectedState === 'OTHERSTATES');
  };

  return (
    <StateFormContext.Provider
      value={{ isOtherStatesSelected, toggleOtherStates }}
    >
      {children}
    </StateFormContext.Provider>
  );
};

export const useStateFormContext = () => {
  const context = useContext(StateFormContext);
  if (!context) {
    throw new Error('useFormContext is not used within a FormProvider');
  }
  return context;
};
