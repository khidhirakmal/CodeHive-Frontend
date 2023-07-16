import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../stores/authSlice";
import PostWidget from "./PostWidget";

export default function PostFeed({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts", {
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
        `http://localhost:3001/posts/${userId}/posts`,
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
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}
