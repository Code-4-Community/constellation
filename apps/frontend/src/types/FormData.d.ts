type FormData = {
  id: number;
  date: string;
  childsName: string;
  dob: string;
  hospital: string;
  address: {
    city: string;
    state: string;
  };
};

export default FormData;
