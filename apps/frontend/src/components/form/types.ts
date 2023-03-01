/**
 * Common props for all form field components.
 */
export interface GenericFormFieldProps {
    /**
     * The label for the input field. By default this is also the id of the input field.
     */
    fieldName: string;
  
    /**
     * The prettified field name to be shown to the user.
     * For example, if the field name is "favoriteColor", the prettified name might be "Favorite Color".
     */
    displayName?: string;
  
    /**
     * A string to prefix the field name in the id attribute of the input field.
     * This is primarily used to ensure that the input field is unique.
     */
    idPrefix?: string;
    /**
     * Determines if this field is required.
     */
    isRequired?: boolean;
  }
  
  /**
   * Props for input field components.
   */
  export interface GenericInputFieldProps<ValueType> extends GenericFormFieldProps {
    /**
     * Given the value of the input field, determines if the field is valid or not,
     * and if it is not valid returns a string to be displayed as an error message.
     * Otherwise if valid, returns undefined.
     */
    // validate: (value: ValueType) => string | undefined;
  
    /**
     * The placeholder text for the input field.
     */
    placeholder?: string;
  }