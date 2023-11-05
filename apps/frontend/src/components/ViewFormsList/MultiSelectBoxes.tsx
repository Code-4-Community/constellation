import React, { useState } from "react";
import { Checkbox, Text, Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { StatesDropdownValues } from "../../enums/DropdownValues";

const states: string[] = ["CT", "ME", "MA", "RI", "VT", "Other"];

const getStateName = (stateAbbr: string): string => {
  switch (stateAbbr) {
    case "CT":
      return StatesDropdownValues.CT;
    case "ME":
      return StatesDropdownValues.ME;
    case "MA":
      return StatesDropdownValues.MA;
    case "RI":
      return StatesDropdownValues.RI;
    case "VT":
      return StatesDropdownValues.VT;
    case "Other":
      return StatesDropdownValues.OTHERSTATES;
    default:
      return stateAbbr;
  }
};

export default function MultiSelect(): JSX.Element {
  const [selectedStates, setSelectedStates] = useState<(keyof typeof StatesDropdownValues)[]>([]);
  
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
        <MenuButton as={Box} cursor="pointer" borderWidth="1px" padding="10px" borderRadius="md" width="25%" margin="15px">
          Filter by State    
        </MenuButton>
        <MenuList style={{ width: "200px"}}>
          {states.map((stateAbbr, index) => {
            const stateKey = stateAbbr as keyof typeof StatesDropdownValues;
            return (
              <MenuItem key={index} onClick={() => toggleState(stateKey)}>
                <Checkbox
                  isChecked={selectedStates.includes(stateKey)}
                  onChange={() => toggleState(stateKey)}
                >
                  <Text>{getStateName(stateAbbr)}</Text>
                </Checkbox>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      {/* <div>Selected States: {selectedStates.map((stateAbbr) => getStateName(stateAbbr)).join(", ")}</div> */}
    </div>
  );
}
