import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserBox from "../components/UserBox"; // UserWidget
import PostBox from "../components/PostBox"; // MyPostWidget
import PostFeed from "../components/PostFeed"; // PostsWidget
import UserProjects from "../components/UserProjects"; // AdvertWidget
import FriendsList from "../components/FriendsList"; // FriendsListWidget

/* The HomePage is accessible upon successful authorization. It renders
User Profile, Posts and Friends List. */

export default function HomePage() {
  const nonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={nonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={nonMobile ? "26%" : undefined}>
          <UserBox userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={nonMobile ? "42%" : undefined}
          mt={nonMobile ? undefined : "2rem"}
        >
          <PostBox picturePath={picturePath} />
          <PostFeed userId={_id} />
        </Box>
        {nonMobile && (
          <Box flexBasis="26%">
            <UserProjects />
            <Box m="2rem 0" />
            <FriendsList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
