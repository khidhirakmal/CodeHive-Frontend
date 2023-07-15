import { styled } from "@mui/system";
import { Box } from "@mui/material";

export default function Container({ theme }) {
  return styled(Box)({
    padding: "1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
  });
}
