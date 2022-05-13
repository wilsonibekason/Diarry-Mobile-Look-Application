import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-login")) {
      history.pushState("/add");
    }
  }, []);

  const onsubmit = async () => {
    let item = (email, password);
    let API = await fetch("api details", {
      method: "POST",
      headers: {
        "content-type": "appliccation/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await API.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.pushState("/add");
  };
  return <div>Login</div>;
};

/**    const {
      data: { token, userId },
    } = await axios.post(`${APIURL}/${isSignup ? "register" : "login"}`, {
      firstName,
      lastName,
      email,
      password,
    });
    cookies.set("token", token);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("userId", userId);
    if (isSignup) {
      cookies.set("password", password);
    }
    window.location.reload() && router.push("/"); */
    onSubmit: async (e) => {
      e.preventDefault();
      const { firstName, lastName, password, email } = form;
      const APIURL = "https://myjournserver.herokuapp.com/auth/signup";
      const {
        data: { token, userId },
      } = await axios.post(`${APIURL}/${isSignup ? "register" : "login"}`, {
        firstName,
        lastName,
        email,
        password,
      });
      cookies.set("token", token);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("userId", userId);
      if (isSignup) {
        cookies.set("password", password);
      }
      window.location.reload() && router.push("/");
    },

    
    
    onst handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({}), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser("");
        setPwd("");
        router.push("/");
        //navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      }
    };
    useEffect(() => {
      if (localStorage.getItem("user-login")) {
        router.push("/register");
      }
    }, []);
  
    const onsubmit = async () => {
      let item = (user, pwd);
      let API = await fetch("https://myjournserver.herokuapp.com/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
  
        },
        body: JSON.stringify(item),
      });
      result = await API.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      router.push("/register");
    };

    import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "./api/axios";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import swal from "sweetalert";

const loginUser = async (credentials) => {
  return fetch("https://myjournserver.herokuapp.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const Login = () => {
  const [email, setUser] = useState("");
  const [password, setpassword] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();
  const onsubmit = async () => {
    let item = (email, password);
    let API = await fetch("https://myjournserver.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    response = await API.json();
    // localStorage.setItem("user", JSON.stringify(result));
    alert("user is logggginnnng");
    router.push("/register");
    if ("accessToken" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("accessToken", response["accessToken"]);
        localStorage.setItem("user", JSON.stringify(response["user"]));
        alert("user has logg");
        //window.location.href = "/profile";
        router.push("/");
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
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
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      policy: false,
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      firstName: yup.string().max(255).required("First name is required"),
      lastName: yup.string().max(255).required("Last name is required"),
      password: yup.string().max(255).required("password is required"),
      policy: yup.boolean().oneOf([true], "This field must be checked"),
    }),
  });

  return (
    <>
      <Head>
        <title>Login</title>
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
          <form onSubmit={onsubmit}>
            <Box
              sx={{
                my: 3,
              }}
            >
              <Typography color={"textPrimary"} variant="h4">
                Sign In
              </Typography>
              <Typography color={"textSecondary"} variant="body2" gutterBottom>
                Sign In on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={""}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="error"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={""}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ pb: 1, pt: 3 }}>
              <Typography
                color={"textSecondary"}
                alignItems="center"
                variant="body2"
              >
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              label="Email Address"
              margin="normal"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;

  
const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  policy: false,
};

//state to state to setform and create a switchmode between login and registration form
const [form, setForm] = useState(initialValues);
const [isSignup, setIsSignup] = useState(true);

const handleChange = (event) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleFormChange = (e) => {};

// Create new account using email/password
const handleSubmit = async () => {
  const { firstName, email, lastName, password } = form;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

const handleSubmitS = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({ ...form }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // TODO: remove console.logs before deployments
    console.log(JSON.stringify(response?.data));
    //console.log(JSON.stringify(response))
    setSuccess(true);
    setForm(initialValues);
  } catch (error) {
    if (!error?.response) {
      setErrMsg("No Server Response");
    } else if (error.response?.status === 409) {
      setErrMsg("Username taken");
    } else {
      setErrMsg("Registration failed");
    }
  }
};