import {
  ChildInfoSection,
  GrantDetailsSection,
  HospitalInfoSection,
  MedDetailsSection,
  MedProfessionalDetailsSection,
  NotesSection,
} from '../FinancialAssistanceForm';
import Confirmation from './Confirmation';

interface FormPageSectionsProps {
  sectionNum: number;
  isMedicalProfessional: boolean | undefined;
  setIsMedicalProfessional: (resp: boolean | undefined) => void;
  isValidState: boolean | undefined;
  setIsValidState: (resp: boolean | undefined) => void;
}

const FormPageSections: React.FC<FormPageSectionsProps> = ({
  sectionNum,
  isMedicalProfessional,
  setIsMedicalProfessional,
  isValidState,
  setIsValidState,
}) => {
  switch (sectionNum) {
    case 0:
      return (
        <Confirmation
          confirmationQuestion={'Are you a medical professional?'}
          onConfirm={(response: boolean) => setIsMedicalProfessional(response)}
          value={isMedicalProfessional}
        />
      );
    case 1:
      return (
        <Confirmation
          confirmationQuestion={
            'Are you located in one of the following states?'
          }
          confirmationSubheading={
            'Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, Vermont'
          }
          onConfirm={(response: boolean) => setIsValidState(response)}
          value={isValidState}
        />
      );
    case 2:
      return <ChildInfoSection />;
    case 3:
      return <MedDetailsSection />;
    case 4:
      return <HospitalInfoSection />;
    case 5:
      return <GrantDetailsSection />;
    case 6:
      return <MedProfessionalDetailsSection />;
    case 7:
      return <NotesSection />;
    default:
      return <></>;
  }
};

export default FormPageSections;
