import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts, updatePost } from "../stores/authSlice";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./tools/FlexBetween";
import PostContainer from "./tools/PostContainer";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  likes,
  comments,
  likeCount,
}) {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = likes && likes[loggedInUserId];

  const { palette } = useTheme();
  const main = palette.text.primary;
  const primary = palette.primary.main;

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log(data);
      dispatch(setAllPosts({ posts: data }));
    } catch (err) {
      console.log("Error retrieving posts:", err);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/posts/${postId}/likeToggle`,
        JSON.stringify({ postId: postId, userId: loggedInUserId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedPost = response.data;
      console.log("Updated post:", updatedPost);

      // Dispatch an action to update the state
      dispatch(updatePost(updatedPost));

      // Fetch posts again after successful like
      await getPosts();
    } catch (error) {
      console.error("Error occurred while patching like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API's delete endpoint
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);

      // Update the Redux state by removing the deleted post
      dispatch(setAllPosts({ posts: { _id: postId } }));
      // Fetch posts again after successful deletion
      await getPosts();
    } catch (error) {
      console.error("Error occurred while deleting post:", error);
    }
  };

  console.log("name:", toString(name));
  return (
    <PostContainer>
      {/* Profile Picture */}
      <Link to={`/profile/${postUserId}`}>
        <UserAvatar username={postUserId} />
      </Link>
      <Typography variant="h6" color={main} sx={{ mt: "1rem" }}>
        {name}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {/* Uploaded Photo */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3000/api/posts/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like Button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* Comment Button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments ? comments.length : 0}</Typography>
          </FlexBetween>
        </FlexBetween>
        {/* Share Button */}
        {/* <IconButton>
          <ShareOutlined />
        </IconButton> */}
        {/* Delete Button */}
        <IconButton onClick={handleDelete}>
          <DeleteOutlined />
        </IconButton>
      </FlexBetween>
      {/* Comment Box */}
      {isComments && (
        <Box mt="0.5rem">
          {comments &&
            comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
          <Divider />
        </Box>
      )}
    </PostContainer>
  );
}
