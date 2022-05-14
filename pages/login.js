import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import swal from "sweetalert";
import { auth } from "../firebase";

/// initiallizing axios fetch for api
const loginUser = async (credentials) => {
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

const Signin = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: " ",
      password: " ",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          /// signed in as user crediential is allowed
          const user = userCredential.user;
          router.push("/");
          swal("Success", user.message, "success", {
            buttons: false,
            timer: 2000,
          });
          console.log("submited by formik");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          swal("Failed", error.message, "error");
        });
    },
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
          <form onSubmit={formik.handleSubmit}>
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
                  startIcon={"<FacebookIcon />"}
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
                  startIcon={"<GoogleIcon />"}
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
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              //value={" "}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
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

export default Signin;
