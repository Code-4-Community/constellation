import { Box, Input, Select } from '@chakra-ui/react';
import {
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../../enums/DropdownValues';
import { SortOptions, SortOrder } from '../../enums/SortOrder';
import useFormsListFiltering from '../../hooks/useFormsListFiltering';
import FilterSelect from './FilterSelect';
import { FormData } from '../../types/formData';
import { useSort } from '../../hooks/useSort';
import {
  lastUpdatedCompareFunction,
  nameCompareFunction,
} from '../../utils/sortFunctions';
import { useState } from 'react';

interface ViewFormsOptionsProps {
  forms: FormData[];
  allForms: FormData[];
  setForms: (data: FormData[]) => void;
}

const ViewFormsOptions: React.FC<ViewFormsOptionsProps> = ({
  forms,
  allForms,
  setForms,
}) => {
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const compareFunction =
    sortBy === SortOptions.NAME
      ? nameCompareFunction
      : lastUpdatedCompareFunction;
  const { setSortOrder } = useSort(forms, compareFunction, setForms);

  const { setHospitalsIncluded, setStatesIncluded } = useFormsListFiltering(
    allForms,
    setForms,
    searchTerm
  );

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        columnGap={16}
        ml={4}
        mb={8}
      >
        <FilterSelect
          title={'Filter by State'}
          filterOptions={Object.values(StatesDropdownValues)}
          updateFilteredForms={(selected: StatesDropdownValues[]) =>
            setStatesIncluded(selected)
          }
        />
        <FilterSelect
          title={'Filter by Hospital'}
          filterOptions={Object.values(HospitalsDropdownValues)}
          updateFilteredForms={(selected: HospitalsDropdownValues[]) =>
            setHospitalsIncluded(selected)
          }
        />

        <Input
          width="25%"
          alignSelf={'flex-end'}
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        columnGap={16}
        ml={4}
        mb={8}
      >
        <Select
          width="25%"
          onChange={(event) => setSortBy(event.target.value as SortOptions)}
        >
          <option value={SortOptions.NAME}>Sort by Name</option>
          <option value={SortOptions.LASTUPDATED}>Sort by Last Updated</option>
        </Select>

        <Select
          width="25%"
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value={SortOrder.ASC}>Ascending</option>
          <option value={SortOrder.DESC}>Descending</option>
        </Select>
      </Box>
    </Box>
  );
};

export default ViewFormsOptions;
