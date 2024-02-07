import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useRouter } from 'next/router';
import { Alert } from "@mui/material";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(true)
  const [error, setError] = useState('');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [last_name, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState({});



  const handleSignup = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password, last_name, company })
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const responseData = await response.json();
        throw new Error(JSON.stringify(responseData));
      }
    } catch (error) {
      throw new Error(error.message || 'Signup error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await handleSignup();
      console.log(data)

      if (data) {
        setIsLoading(false);
        router.push('/user');
      } else {
        setIsLoading(false);
        const errorData = JSON.parse(error.message);
        // setError(errorData.username[0] || errorData.email[0] || 'Signup failed. Please try again.');
        if(errorData.username) setErrors({...errors, username: errorData.username});
        if(errorData.email) setErrors({...errors, email: errorData.email});
        if(errorData.password) setErrors({...errors, password: errorData.password});
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Signup error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1651B6" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="company"
                label="Company/Institution"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors && errors?.username && <Alert severity="error">{errors?.username?.join(' ')}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{
                  pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors && errors?.email && <Alert severity="error">{errors?.email?.join(' ')}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors && errors?.password && <Alert severity="error">{errors?.password?.join(' ')}</Alert>}
            </Grid>
            <div>
              <ul>
                <li>Must be at least 8 characters long</li>
                <li>Must contain an uppercase and a lowercase letter (A-Z, a-z)</li>
                <li>Can contain a special character (!, %, @, #.)</li>
              </ul>
            </div>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" onClick={() => setToggle(!toggle)} />}
                label="I accept the terms and conditions of KNHTS."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={toggle}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        KNHTS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Signup;