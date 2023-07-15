import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App() {
  const mode = useSelector((state) => state.mode);
  // useSelector is a hook that extracts data from Redux store in the functional components

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // useMemo is a hook that takes two arguments. function that computes value and an array of dependencies(prevents unecessary re-rendering).

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

/*
<ThemeProvider> provides the theme object as a prop to all the components in the app.
<CssBaseline> is a materialUI component that resets the CSS styling.
<AuthPage/> = User authentication (Login or Register)
*/
