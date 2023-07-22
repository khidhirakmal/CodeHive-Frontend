import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserBox from "../components/UserBox";
import PostBox from "../components/PostBox";
import PostFeed from "../components/PostFeed";
import UserProjects from "../components/UserProjects";
import FriendsList from "../components/FriendsList";
import FriendSuggestion from "components/FriendSuggestion";

/* The HomePage is accessible upon successful authorization. It renders
User Profile, Posts and Friends List. */

export default function HomePage() {
  const nonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  // console.log("User ID:", _id);
  // console.log("User Picture:", picturePath);

  return (
    <Box>
      {/* (TOP SECTION) */}
      <Navbar />
      {/* (LEFT SECTION) UserBox */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={nonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={nonMobile ? "26%" : undefined}>
          <UserBox userId={_id}  />
        </Box>

        {/* (MID SECTION) Posts Section - PostBox and PostFeed */}
        <Box
          flexBasis={nonMobile ? "42%" : undefined}
          mt={nonMobile ? undefined : "2rem"}
        >
          <PostBox  />
          <Box mt="2rem">
            {/* PostFeed having issues */}
            <PostFeed userId={_id} />
          </Box>
        </Box>

        {/* (RIGHT SECTION) UserProjects and FriendsList */}
        {nonMobile && (
          <Box flexBasis="26%">
            {/* <UserProjects /> */}
            {/* <Box m="2rem 0" /> */}
            <FriendsList userId={_id} />
            <Box m="2rem 0" />
            {/* <FriendSuggestion /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
}
