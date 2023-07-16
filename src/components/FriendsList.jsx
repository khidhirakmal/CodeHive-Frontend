import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import Container from "./tools/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../stores/authSlice";

export default function FriendsList({ userId }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      dispatch(setFriends({ friends: data }));
    } catch (err) {
      console.log("Error retrieving friends:", err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <Container>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </Container>
  );
}
