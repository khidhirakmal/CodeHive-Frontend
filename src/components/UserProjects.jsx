import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./tools/FlexBetween";
import Container from "./tools/Container";

/* The UserProjects component renders a container that showcases the user's
projects. It includes project names and their respective URLs. */

export default function UserProjects() {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Container>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Projects Showcase
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main}>Project 1</Typography>
        <Typography color={medium}>Project URL</Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main}>Project 2</Typography>
        <Typography color={medium}>Project URL</Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main}>Project 3</Typography>
        <Typography color={medium}>Project URL</Typography>
      </FlexBetween>
    </Container>
  );
}
