import { extendTheme } from "@chakra-ui/react";
import '@fontsource/poppins';

const poppinsTheme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`
  }
});

export default poppinsTheme