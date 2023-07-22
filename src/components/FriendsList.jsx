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
        `${process.env.REACT_APP_SERVER_URL}/${userId}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // const data = response.data[0].name;
      const data = response.data;
      dispatch(setFriends({ friends: data }));
      console.log("Friends Payload:", data);
    } catch (err) {
      console.log("Error retrieving friends:", err);
    }
  };

  useEffect(() => {
    getFriends();
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
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.name}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </Container>
  );
}
