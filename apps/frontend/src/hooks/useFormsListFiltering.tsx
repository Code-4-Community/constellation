import { useState, useEffect } from 'react';
import {
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../enums/DropdownValues';
import { FormData } from '../types/formData';

// Custom hook to filter the given list of forms, set using the
// given state setter function, using the given search term
// and the hospitalsToFilter and statesToFilter state variables
// whose setters are returned by the hook
export default function useFormsListFiltering(
  forms: FormData[],
  setForms: (data: FormData[]) => void,
  searchTerm: string
) {
  // should contain hospital abbreviations as represented in the keys
  // of the HospitalsDropdownValues enum / as they appear in the
  // "hospital" column of the table (e.g., ["BOSHOSPITAL"])
  const [hospitalsToFilter, setHospitalsToFilter] = useState<
    (keyof typeof HospitalsDropdownValues)[]
  >([]);

  // should contain state abbreviations as represented in the keys of
  // the StatesDropdownValues enum / as they appear in the "location"
  // column of the table (e.g., ["MA", "NH"])
  const [statesToFilter, setStatesToFilter] = useState<
    (keyof typeof StatesDropdownValues)[]
  >([]);

  useEffect(() => {
    let formsToDisplay = forms;

    // filter by search term
    if (searchTerm.length > 0) {
      formsToDisplay = formsToDisplay.filter((form) => {
        const formValues = Object.values({
          ...form.financialAssistanceForm,
          ...form.financialAssistanceForm.hospitalAddress,
        });

        for (const val of formValues) {
          if (
            typeof val === 'string' &&
            val.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }

    // the forms list will be filtered such that only forms whose hospital
    // is in the hospitalsToFilter array and whose state is in the
    // statesToFilter array will be shown; if an array is empty, then that
    // type of filtering will not be performed

    // filter by hospital
    if (hospitalsToFilter.length > 0) {
      formsToDisplay = formsToDisplay.filter((form) =>
        (hospitalsToFilter as string[]).includes(
          form.financialAssistanceForm.hospital
        )
      );
    }

    // filter by state ("location")
    if (statesToFilter.length > 0) {
      formsToDisplay = formsToDisplay.filter((form) =>
        (statesToFilter as string[]).includes(
          form.financialAssistanceForm.hospitalAddress.state
        )
      );
    }

    setForms(formsToDisplay);
  }, [searchTerm, hospitalsToFilter, statesToFilter]);

  return {
    setHospitalsToFilter: setHospitalsToFilter,
    setStatesToFilter: setStatesToFilter,
  };
}
