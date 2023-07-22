import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import Container from "./tools/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../stores/authSlice";

// Shuffle Users //
function shuffleUsers(usersArray) {
  let shuffledUsers = [...usersArray]; // This creates a copy of the array
  for (let currentIndex = shuffledUsers.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledUsers[currentIndex], shuffledUsers[randomIndex]] = [shuffledUsers[randomIndex], shuffledUsers[currentIndex]];
  }
  return shuffledUsers;
}

export default function FriendSuggestion({ userId }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.user._id);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/listUsers`,
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
        {shuffleUsers(user)
          .filter((user) => user._id !== currentUser)
          .slice(0, 3)
          .map((user) => (
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
