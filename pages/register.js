// import input required packages
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
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

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down("md"));
  const googleHandler = async () => {
    console.error("Register");
  };

  const handleClickShowPassword = () => {};

  const HandleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {};

  const router = useRouter();
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
    onSubmit: () => {
      router.push("/");
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
            <Box sx={{}}>
              <TextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                fullwidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="firstName"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
                sx={{ mx: 2 }}
              />
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                fullwidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="lastName"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullwidth
                helperText={formik.touched.email && formik.errors.email}
                label="email"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="outlined"
                sx={{ mx: 2 }}
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullwidth
                helperText={formik.touched.password && formik.errors.password}
                label="password"
                margin="normal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                variant="outlined"
              />
            </Box>
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
                disabled={formik.isSubmitting}
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
};

export default RegisterForm;
