import React, { FC, ReactElement } from 'react';
import { Branches } from '../../enums/Branches';
import Confirmation from './branches/Confirmation';
import Message from './branches/Message';

type FormBranchingProps = {
  currentStep: Branches;
  form: React.FC;
  confirmationQuestion: string;
  endMessage: string;
  onConfirm: (response: boolean) => void;
};

const FormBranching: FC<FormBranchingProps> = ({
  currentStep,
  form,
  confirmationQuestion,
  onConfirm,
  endMessage,
}): ReactElement | null => {
  switch (currentStep) {
    case 'CONFIRMATION':
      return (
        <Confirmation
          confirmationQuestion={confirmationQuestion}
          onConfirm={onConfirm}
        />
      );
    case 'FORM':
      return form({});
    case 'END':
      return <Message message={endMessage} />;
    default:
      return null;
  }
};

export default FormBranching;
