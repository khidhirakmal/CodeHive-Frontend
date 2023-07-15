import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers stores functions (setMode, setLogin, etc) that modifies the state
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; // toggles state.mode
    },
    setLogin: (state, action) => {
      // setLogin: (current state, action object dispatched to trigger the reducer)
      state.user = action.payload.user; // updates the user state with the payload value
      state.token = action.payload.token; // updates the token state with the payload value
    },
    setLogout: (state) => {
      // logging out does not require any specific data, therefore payload is not required. thus action is not required.
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        // if user exists (logged in), update friends state
        state.user.friends = action.payload.friends;
      } else {
        console.error("You have no friends");
      }
    },
    setPosts: (state, action) => {
      // creating a new post
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
// exporting reducer property as default allows us to use it directly in store config without having to access authSlice
export default authSlice.reducer;
