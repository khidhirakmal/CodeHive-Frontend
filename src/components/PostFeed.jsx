import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../stores/authSlice";
import Container from "./tools/Container";
import PostWidget from "./PostWidget";

export default function PostFeed({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.log("Error retrieving posts:", err);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${userId}/posts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.log("Error retrieving user posts:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isProfile) {
          await getUserPosts();
        } else {
          await getPosts();
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Posts:", posts);

  return (
    <Container>
      {Array.isArray(posts[0]) &&
        posts[0].map(
          ({
            _id,
            userId,
            name,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => {
            console.log("Description:", description);

            return (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={name}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
              />
            );
          }
        )}
    </Container>
  );
}
