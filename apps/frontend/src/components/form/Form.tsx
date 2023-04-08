import { Button, Center } from '@chakra-ui/react';
import { Form as FormBody, Formik, FormikProps } from 'formik';
import React, { PropsWithoutRef, ReactNode } from 'react';

interface FormProps
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  children?: ReactNode;
  submitText?: string;
  /**
   * Handles form submission.
   * @param values the values of the form. Note that there is no assurance that any value is contained in the form. You must assert its existence and cast appropriately.
   * @returns a promise that resolves when the form is done submitting.
   * @example ```tsx
   * const onSubmit = async (values: { [key: string]: any }) => {
   *  // do something with the values
   */
  onSubmit: (values: FormValues) => Promise<void>;
  initialValues?: FormikProps<FormValues>['initialValues'];
}
export type FormValues = Record<string, string | undefined>;

/**
 * A generic form component that contains the logic for handing form state and submission.
 * To be used in conjunction with other Field components.
 */
const Form: React.FC<FormProps> = ({
  children,
  initialValues,
  onSubmit,
  submitText,
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Formik
    initialValues={initialValues || {}}
    onSubmit={async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        actions.setSubmitting(false);
      }
    }}
  >
    {(props) => <FormBody>{children}</FormBody>}
  </Formik>
);

export default Form;
