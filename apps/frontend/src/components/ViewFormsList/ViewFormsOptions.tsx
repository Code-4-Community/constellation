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
  searchTerm: string;
}

const ViewFormsOptions: React.FC<ViewFormsOptionsProps> = ({
  forms,
  allForms,
  setForms,
  searchTerm,
}) => {
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.NAME);

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
        flexDirection="column"
        alignItems="start"
        rowGap="10px"
        mb="10px"
        mt="10px"
        marginLeft="auto"
        marginRight="auto"
        width="98%"
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
        <Select
          width="100%"
          onChange={(event) => setSortBy(event.target.value as SortOptions)}
        >
          <option value={SortOptions.NAME}>Sort by Name</option>
          <option value={SortOptions.LASTUPDATED}>Sort by Last Updated</option>
        </Select>

        <Select
          width="100%"
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
