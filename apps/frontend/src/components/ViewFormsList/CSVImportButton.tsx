import { Box, Button } from '@chakra-ui/react';
import { useRef } from 'react';
import { putMultipleCSVForms } from '../../utils/sendRequest';

/**
 * A button component that allows the user to upload a CSV file
 * from their computer to import completed forms into the database.
 */
export default function CSVImportButton() {
  const fileInput = useRef<HTMLInputElement>(null);

  // called after the user uploads a file
  // sends the uploaded file to the endpoint if it is a CSV file, or
  // alerts the user if they uploaded the wrong file type
  async function handleFileUpload() {
    const files = fileInput.current?.files;
    if (files && files.length === 1) {
      const uploadedFile = files[0];
      if (uploadedFile.type === 'text/csv') {
        putMultipleCSVForms(await uploadedFile.text());
      } else {
        alert('Please upload a CSV file');
      }
      fileInput.current.value = '';
    }
  }

  // clicks the hidden file input
  function handleImportButtonClick() {
    fileInput.current?.click();
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
      <input
        id="hidden_file_input"
        name="hidden_file_input"
        type="file"
        accept=".csv"
        ref={fileInput}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <Button
        id="csv_import"
        name="csv_import"
        onClick={handleImportButtonClick}
      >
        Import Forms from CSV
      </Button>
    </Box>
  );
}
