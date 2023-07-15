import { Box } from "@mui/material"; // `Box` is a versatile container that can be used to create various layout and spacing arrangements
import { styled } from "@mui/system"; // `styled` function is to create custome styled components by extending existing components with custom CSS styles.

// a custom styled component that extends the `Box` component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
