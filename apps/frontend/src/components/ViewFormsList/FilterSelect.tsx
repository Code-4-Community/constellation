import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';

type FilterOptions = StatesDropdownValues | HospitalsDropdownValues;

interface FilterSelectProps<T extends FilterOptions> {
  title: string;
  filterOptions: T[];
  updateFilteredForms: (selected: T[]) => void;
}

const FilterSelect = <T extends FilterOptions>({
  title,
  filterOptions,
  updateFilteredForms,
}: FilterSelectProps<T>): JSX.Element => {
  const [selectedStates, setSelectedStates] = useState<T[]>(filterOptions);

  const toggleState = (state: T) => {
    setSelectedStates((prevSelectedStates) => {
      if (prevSelectedStates.includes(state)) {
        // Deselect the state
        return prevSelectedStates.filter((s) => s !== state);
      } else {
        // Select the state
        return [...prevSelectedStates, state];
      }
    });
  };

  useEffect(() => {
    updateFilteredForms(selectedStates);
  }, [selectedStates]);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Box}
        cursor="pointer"
        borderWidth="1px"
        padding="10px"
        borderRadius="md"
        width="100%"
      >
        {title}
      </MenuButton>
      <MenuList>
        {filterOptions.map((option) => {
          return (
            <MenuItem key={option} onClick={() => toggleState(option)}>
              <Checkbox
                isChecked={selectedStates.includes(option)}
                onChange={() => toggleState(option)}
              >
                <Text>{option}</Text>
              </Checkbox>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default FilterSelect;
