import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}
