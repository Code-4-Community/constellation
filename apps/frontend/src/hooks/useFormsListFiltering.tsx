import { useState, useEffect } from 'react';
import {
  HospitalsDropdownValues,
  StatesDropdownValues,
} from '../enums/DropdownValues';
import { FormData } from '../types/formData';

/**
 * Filter forms by search term and lists of hospital and state filtering options;
 * the setters returned by the hook allow the hospitals and states to filter for to be updated
 *
 * After filtering by search term, the forms list will be filtered such that only forms whose hospital is in the hospitalsIncluded array and whose state is in the statesIncluded array will be shown
 */
export default function useFormsListFiltering(
  forms: FormData[],
  setForms: (data: FormData[]) => void,
  searchTerm: string
) {
  // should contain hospital names as represented in the values
  // of the HospitalsDropdownValues enum / as they appear in the
  // "hospital" column of the table (e.g., ["Boston Childrens Hospital"])
  const [hospitalsIncluded, setHospitalsIncluded] = useState<
    HospitalsDropdownValues[]
  >(Object.values(HospitalsDropdownValues));

  // should contain state names as represented in the values of
  // the StatesDropdownValues enum (e.g., ["Connecticut"])
  const [statesIncluded, setStatesIncluded] = useState<StatesDropdownValues[]>(
    Object.values(StatesDropdownValues)
  );

  const filterBySearchTerm = (formsToDisplay: FormData[]) => {
    if (searchTerm.length === 0) {
      return formsToDisplay;
    }

    return formsToDisplay.filter((form) => {
      const formValues = Object.values({
        ...form.financialAssistanceForm,
        ...form.financialAssistanceForm.hospitalAddress,
      });

      return formValues.reduce((prev, val) => {
        return (
          prev ||
          (typeof val === 'string' &&
            val.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }, false);
    });
  };

  useEffect(() => {
    let formsToDisplay = forms;

    // filter by search term
    formsToDisplay = filterBySearchTerm(formsToDisplay);

    // filter by hospital
    formsToDisplay = formsToDisplay.filter((form) =>
      hospitalsIncluded.includes(
        HospitalsDropdownValues[
          form.financialAssistanceForm
            .hospital as keyof typeof HospitalsDropdownValues
        ]
      )
    );

    // filter by state
    formsToDisplay = formsToDisplay.filter((form) =>
      statesIncluded.includes(
        StatesDropdownValues[
          form.financialAssistanceForm.hospitalAddress
            .state as keyof typeof StatesDropdownValues
        ]
      )
    );

    setForms(formsToDisplay);
  }, [searchTerm, hospitalsIncluded, statesIncluded]);

  return {
    setHospitalsIncluded,
    setStatesIncluded,
  };
}
