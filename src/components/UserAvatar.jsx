import { Box } from "@mui/material";

export default function UserAvatar({ username, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user avatar"
        src={"https://robohash.org/" + username}
      />
    </Box>
  );
}
