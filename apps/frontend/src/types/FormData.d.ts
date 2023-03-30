// This will need to be updated to match the shape of the data we receive from the backend
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
