import { Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { putMultipleCSVForms } from '../../utils/sendRequest';

export default function CSVImport() {
  const [uploadedCSV, setUploadedCSV] = useState<File | null>(null);

  // called when the user uploads a new file via the "choose file" button
  // stores the uploaded file if it is a CSV file, or alerts the user
  // if they uploaded the wrong file type
  function handleFileUpload() {
    const csv_input = document.getElementById('csv_upload') as HTMLInputElement;
    const files = csv_input.files;
    setUploadedCSV(null);
    if (files?.length === 1) {
      const uploadedFile = files[0];
      if (uploadedFile.type === 'text/csv') {
        setUploadedCSV(uploadedFile);
      } else {
        alert('Please upload a CSV file');
        csv_input.value = '';
      }
    }
  }

  // calls the endpoint to import CSV form data if a CSV file has been
  // uploaded, or alerts the user otherwise
  async function handleImportButtonClick() {
    if (uploadedCSV === null) {
      alert('Please upload a CSV file first');
    } else {
      putMultipleCSVForms(await uploadedCSV?.text());
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      rowGap="5px"
      mb="10px"
      marginLeft="auto"
      marginRight="auto"
      width="98%"
    >
      <Text>Upload a CSV file to import completed forms:</Text>
      <input
        id="csv_upload"
        name="csv_upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      ></input>
      <Button
        id="csv_import"
        name="csv_import"
        onClick={handleImportButtonClick}
      >
        Import
      </Button>
    </Box>
  );
}
