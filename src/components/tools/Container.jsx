// import { Box } from "@mui/material";
// import { styled } from "@mui/system";

// export default function Container({ theme }) {
//   return styled(Box)({
//     padding: "1.5rem",
//     backgroundColor: theme.palette.background.alt,
//     borderRadius: "0.75rem",
//   });
// }

// import { Box } from "@mui/material";
// import { styled } from "@mui/system";

// export default function Container({ theme }) {
//   const StyledContainer = styled(Box)({
//     padding: "1.5rem",
//     backgroundColor: theme?.palette?.background?.alt,
//     borderRadius: "0.75rem",
//   });

//   return <StyledContainer />;
// }

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import themeSettings from "../../theme";

const StyledContainer = styled(Box)({
  padding: "1.5rem",
  // backgroundColor: themeSettings.palette.background.alt,
  backgroundColor: "#1A1A1A",
  borderRadius: "0.75rem",
});

export default function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}
