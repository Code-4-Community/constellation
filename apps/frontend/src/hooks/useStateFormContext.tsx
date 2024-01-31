import React, { createContext, useContext, ReactNode, useState } from 'react';

interface StateFormContextProps {
  isOtherStatesSelectedGrant: boolean;
  toggleOtherStatesGrant: (selectedString: string) => void;
  isOtherStatesSelectedMedical: boolean;
  toggleOtherStatesMedical: (selectedString: string) => void;
}

const StateFormContext = createContext<StateFormContextProps | undefined>(
  undefined
);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOtherStatesSelectedGrant, setIsOtherStatesSelectedGrant] =
    useState(false);
  const [isOtherStatesSelectedMedical, setIsOtherStatesSelectedMedical] =
    useState(false);

  const toggleOtherStatesGrant = (selectedState: string) => {
    setIsOtherStatesSelectedGrant(selectedState === 'OTHERSTATES');
  };
  const toggleOtherStatesMedical = (selectedState: string) => {
    setIsOtherStatesSelectedMedical(selectedState === 'OTHERSTATES');
  };

  return (
    <StateFormContext.Provider
      value={{
        isOtherStatesSelectedGrant,
        toggleOtherStatesGrant,
        isOtherStatesSelectedMedical,
        toggleOtherStatesMedical,
      }}
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
