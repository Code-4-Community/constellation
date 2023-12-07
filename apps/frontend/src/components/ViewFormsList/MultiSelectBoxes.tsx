import React, { useState } from 'react';
import {
  Checkbox,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { StatesDropdownValues } from '../../enums/DropdownValues';

export default function MultiSelect(): JSX.Element {
  const [prevSelectedStates, setSelectedStates] = useState<
    (keyof typeof StatesDropdownValues)[]
  >([]);

  const toggleState = (state: keyof typeof StatesDropdownValues) => {
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

  return (
    <div>
      <Menu>
        <MenuButton
          as={Box}
          cursor="pointer"
          borderWidth="1px"
          padding="10px"
          borderRadius="md"
          width="25%"
          margin="15px"
        >
          Filter by State
        </MenuButton>
        <MenuList style={{ width: '200px' }}>
          {Object.entries(StatesDropdownValues).map(
            ([stateStr, value], index) => {
              const stateKey = stateStr as keyof typeof StatesDropdownValues;
              return (
                <MenuItem key={index} onClick={() => toggleState(stateKey)}>
                  <Checkbox
                    isChecked={prevSelectedStates.includes(stateKey)}
                    onChange={() => toggleState(stateKey)}
                  >
                    <Text>{value}</Text>
                  </Checkbox>
                </MenuItem>
              );
            }
          )}
        </MenuList>
      </Menu>
      <div>Selected States: {prevSelectedStates.join(', ')}</div>
    </div>
  );
}