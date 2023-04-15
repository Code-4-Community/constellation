import React, { useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
  HStack,
  Input,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import testData from '../../testData.json';
import useSortingAndFiltering from '../../hooks/useSortingAndFiltering';
import { Filter, Filtering, Options } from '../../types/SortAndFilter';
import SortOrder from '../../enums/SortOrder';
import FormData from '../../types/FormData';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

export enum FormDataToEnglish {
  date = 'Last Updated',
  childsName = 'Child Name',
  dob = 'Date of Birth',
  hospital = 'Hospital',
  address = 'Location',
}

export default function ViewFormsList() {
  const [options, setOptions] = useState<Options>({});
  const reducedData = useSortingAndFiltering(testData, options);

  function updateSortOptions(field: keyof FormData): Options {
    const isSortingFieldSet = options.sorting?.field === field;
    let newSortOrder: SortOrder;
    if (!isSortingFieldSet) {
      newSortOrder = SortOrder.ASC;
    } else {
      newSortOrder =
        options.sorting?.sortOrder === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC;
    }

    const newSorting = { field, sortOrder: newSortOrder };
    const newOptions = { ...options, sorting: newSorting };
    return newOptions;
  }

  // Returns filter object to be added to the overall filter objects
  function addFilter(
    key: keyof FormData,
    value: FormData[keyof FormData]
  ): Options {
    const filter: Filter = buildFilterObject(key, value);
    let filteringObject: Filtering = { filters: [filter] };
    if (options.filtering) {
      filteringObject = { filters: [filter, ...options.filtering.filters] };
    }

    return {
      ...options,
      filtering: filteringObject,
    };
  }

  // Returns filter object to be removed from the overall filter object
  function removeFilter(
    key: keyof FormData,
    value: FormData[keyof FormData]
  ): Options {
    const filter: Filter = buildFilterObject(key, value);
    if (options.filtering) {
      const removedFiltersArray = options.filtering.filters.filter((filter) => {
        return filter.field === key && filter.value === value;
      });

      return { ...options, filtering: { filters: removedFiltersArray } };
    }
    return { ...options };
  }

  const handleCheckboxChange = (
    key: keyof FormData,
    value: FormData[keyof FormData],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setOptions(addFilter(key, value));
    } else {
      setOptions(removeFilter(key, value));
    }
  };

  return (
    <Box p={1}>
      <Center mb={1}>
        <Heading size="xl">Submitted Forms</Heading>
      </Center>
      {Object.entries(FormDataToEnglish).map(([enumKey, enumValue], index) => {
        return (
          <VStack>
            <Heading size="md">{enumValue}</Heading>
            <Input size="sm" placeholder={enumValue} />
            {getFieldValues(reducedData, enumKey as keyof FormData).map(
              (value) => {
                if (typeof value === 'string' || typeof value === 'number') {
                  return (
                    <Checkbox
                      onChange={(event) =>
                        handleCheckboxChange(
                          enumKey as keyof FormData,
                          value as FormData[keyof FormData],
                          event
                        )
                      }
                    >
                      {value}
                    </Checkbox>
                  );
                }
                return null;
              }
            )}
          </VStack>
        );
      })}
      <Table marginLeft="auto" marginRight="auto" width="98%" variant="striped">
        <Thead>
          <Tr>
            {Object.entries(FormDataToEnglish).map(
              ([enumKey, enumValue], index) => {
                return (
                  <Th
                    key={index}
                    onClick={() =>
                      setOptions(updateSortOptions(enumKey as keyof FormData))
                    }
                  >
                    {enumValue}
                    <chakra.span pl="4">
                      {options.sorting?.field === enumKey ? (
                        options.sorting?.field === enumKey &&
                        options.sorting?.sortOrder === SortOrder.ASC ? (
                          <TriangleDownIcon />
                        ) : (
                          <TriangleUpIcon />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              }
            )}
          </Tr>
        </Thead>
        <Tbody>
          {reducedData.map((child) => (
            <Tr key={child.id}>
              <Td>{new Date(child.date).toLocaleDateString()}</Td>
              <Td>{child.childsName}</Td>
              <Td>{new Date(child.dob).toLocaleDateString()}</Td>
              <Td>{child.hospital}</Td>
              <Td>{`${child.address.city}, ${child.address.state}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

const getFieldValues = (
  list: FormData[],
  field: keyof FormData
): Array<FormData[keyof FormData]> => {
  const values = list.map((item) => item[field]);
  return [...new Set(values)];
};

const buildFilterObject = (
  key: keyof FormData,
  value: FormData[keyof FormData]
): Filter => {
  return {
    field: key,
    value,
  };
};
