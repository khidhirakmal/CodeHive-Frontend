import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import Container from "./tools/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../stores/authSlice";

export default function FriendSuggestion({ userId }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.users);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/listUsers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log("All Users Payload:", data);
      dispatch(getUsers({ users: data }));
    } catch (err) {
      console.log("Error retrieving users:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Suggested Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user.map((user) => (
          <Friend
            key={user._id}
            friendId={user._id}
            name={`${user.name}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}
      </Box>
    </Container>
  );
}
