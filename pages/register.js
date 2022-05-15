// import input required packages
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

/// third party
import Cookies from "universal-cookie";
//import axios from "./api/axios";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Login from "./login";
import { setRequestMeta } from "next/dist/server/request-meta";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from ".././firebase";
import swal from "sweetalert";
import axios from "axios";
import api from "../api/axios_config";
const cookies = new Cookies();
//const auth = getAuth();
const RegisterUser = async (credentials) => {
  axios({
    method: "post",
    url: "https://myjournserver.herokuapp.com/auth/signup",
    data: credentials,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((data) => {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      data.json();
    })
    .catch((error) => {
      if (error) {
        console.log("====================================");
        console.log(error.response.data);
        console.log("====================================");
      } else {
        return console.log("User successful");
      }
    });
};
/** creating functional component */
const RegisterForm = () => {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      username: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async ({ email, password, username }) => {
      //e.preventDefault();
      const response = await RegisterUser({
        email,
        password,
        username,
        SignUpType: "email",
      });
      if ("accessToken" in response) {
        swal("Success", response.message, "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("user", JSON.stringify(response["user"]));
          window.location.href = "/profile";
        });
      } else {
        swal("Failed", response.message, "error");
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        component={"main"}
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href={"/"} passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              HomePage
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color={"textPrimary"} variant="h4">
                create an account
              </Typography>
              <Typography color={"textSecondary"} gutterBottom variant="body2">
                Use your email or create a new One
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <TextField
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
            </Grid>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onClick={formik.handleChange}
              />
              <Typography color="textSecondary">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Condition
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
  //return isSignup && <Login />;
};

export default RegisterForm;
