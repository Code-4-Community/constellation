export enum CancersDropdownValues {
  BRAINCANCERS = 'Brain Cancers',
  LEUKEMIAS = 'Leukemias',
  LYMPHOMAS = 'Lymphomas',
  THYROIDCANCER = 'Thyroid Cancer',
  GERMCELLTUMORS = 'Germ Cell & Gonadal Tumors',
  NEUROBLASTOMAS = 'Neuroblastomas',
  OSTEOSARCOMA = 'Osteosarcoma',
  OTHERCANCERS = 'Other',
}

export enum HospitalsDropdownValues {
  BOSHOSPITAL = "Boston Children's Hospital",
  CTHOPSITAL = "Connecticut Children's Hospital",
  DANAHOSPITAL = 'Dana-Farber Cancer Institute',
  HASBROHOSPITAL = "Hasbro Children's Hospital",
  HOPEHOSPITAL = 'Hope Health Hospice',
  MASSGENHOSPITAL = 'Massachusetts General Hospital (MGH)',
  TUFTSHOSPITAL = 'Tufts Medical Center',
  UMASSHOSPITAL = 'UMass Memorial Cancer Center',
  VERMONTHOSPITAL = "University of Vermont Children's Hospital",
  OTHERHOSPITALS = 'Other',
}

export interface GrantFormValues {
  childName: string;
  dob: Date;
  gender: string;
  parentName: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipcode: number;
  phoneNumber: string;
  cellPhoneNumber: string;
  email: string;
  grantDollarAmount: number;
  useOfGrant: string;
  parentSignature: string;
  parentSignatureDate: Date;
  grantFormNotes: string;
}

export interface MedicalFormValues {
  childDiagnosis: string;
  otherCancer: string;
  diagnosisDate: Date;
  childPhysician: string;
  hospitalName: string;
  otherHospital: string;
  hospitalAddress: string;
  hospitalCity: string;
  hospitalState: string;
  hospitalZipcode: string;
  hospitalPhone: string;
  doctorsExplanation: string;
  doctorName: string;
  doctorTitle: string;
  doctorSignature: string;
  doctorSignatureDate: Date;
  socialWorkerEmail: string;
  medicalFormNotes: string;
}
