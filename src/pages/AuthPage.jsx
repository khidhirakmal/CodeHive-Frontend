import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../components/AuthForm";

/* The AuthPage renders a form that allows user to log in or register an 
account. This is the default page for the website. */

export default function AuthPage() {
  const theme = useTheme(); // `useTheme` is a hook that retrieves the theme object from `ThemeProvider` in App.js
  const nonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          CodeHive
        </Typography>
      </Box>

      <Box
        width={nonMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography textAlign="center" fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to CodeHive, a place for buzzing developers!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
