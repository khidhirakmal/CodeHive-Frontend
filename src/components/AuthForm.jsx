import axios from "axios";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup"; // JS schema validation library for Form validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../stores/authSlice";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

/* The AuthForm component handles user authentication, including login and 
registration. It utilizes Formik for Form management and Yup for Form validation
with defined schemas. It communicates with the server for authentication processes.*/

export default function AuthForm() {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme(); // `useTheme` is a hook that retrieves the theme object from `ThemeProvider` in App.js
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nonMobile = useMediaQuery("(min-width:600px)");
  const loginPage = pageType === "login";
  const registerPage = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    try {
      const savedUserResponse = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      const savedUser = savedUserResponse.data;
      console.log(savedUser);
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (err) {
      console.log("Error registering user:", err);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await axios.post(
        "http://localhost:3000/api/users/login",
        values
      );
      const loggedIn = loggedInResponse.data;
      console.log("Payload Data:", loggedIn);
      onSubmitProps.resetForm();

      if (loggedIn) {
        console.log("Logged in user:", loggedIn.user);
        console.log("User token:", loggedIn.token);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (err) {
      console.log("Error logging in:", err);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (loginPage) await login(values, onSubmitProps);
    if (registerPage) await register(values, onSubmitProps);
    console.log("handleFormSubmit values:", values);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={loginPage ? initialValuesLogin : initialValuesRegister}
      validationSchema={loginPage ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            sx={{
              "& > div": { gridColumn: nonMobile ? undefined : "span 4" },
            }}
          >
            {registerPage && (
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                /> */}
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              onClick={() => {}}
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {loginPage ? "LOG IN" : "REGISTER"}
            </Button>
            <Typography
              textAlign="center"
              onClick={() => {
                setPageType(loginPage ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {loginPage
                ? "Don't have an account? Register here."
                : "Already have an account? Log in here."}
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
