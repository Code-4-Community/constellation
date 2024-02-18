import { Box, Text, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { putMultipleCSVForms } from '../../utils/sendRequest';

/**
 * A component that allows the user to upload a CSV file from their
 * computer to import completed forms into the database. Includes a
 * text description and the Import button.
 */
export default function CSVImport() {
  const inputFile = useRef<HTMLInputElement>(null);

  // called after the user uploads a file
  // sends the uploaded file to the endpoint if it is a CSV file, or
  // alerts the user if they uploaded the wrong file type
  async function handleFileUpload() {
    const file_input = inputFile.current!;
    const files = file_input.files;
    if (files?.length === 1) {
      const uploadedFile = files[0];
      if (uploadedFile.type === 'text/csv') {
        putMultipleCSVForms(await uploadedFile.text());
      } else {
        alert('Please upload a CSV file');
      }
    }
    file_input.value = '';
  }

  // clicks the hidden file input
  function handleImportButtonClick() {
    inputFile.current?.click();
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
        id="hidden_file_input"
        name="hidden_file_input"
        type="file"
        accept=".csv"
        ref={inputFile}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
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
