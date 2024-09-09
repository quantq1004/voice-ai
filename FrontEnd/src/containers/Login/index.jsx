import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import actions from '@src/redux/actions';
import Copyright from '@src/components/Copyright';
import getErrorMessage from '@src/errors/message';
import { login } from '@src/apis/user';
import { setToken, setUserId } from '@src/utils/localStorage';
import {
  StyledGrid,
  StyledBackgroundGrid,
  StyledBox,
  StyledTypography,
  StyledAvatar,
  StyledButton,
} from './index.style';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogined, setIsLogined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await login(username, password);

    if (!response?.status) {
      if (response?.code) {
        const errorMessage = getErrorMessage(response?.result?.code);
        dispatch(
          actions.noti.push({
            severity: 'error',
            message: errorMessage,
          }),
        );
        setLoading(false);
        return;
      }
      dispatch(
        actions.noti.push({
          severity: 'error',
          message: 'createVoiceFailed',
        }),
      );
      setLoading(false);
      return;
    }

    setIsLogined(true);
    if (response && response.result) {
      const { userId, accessToken } = response?.result?.user;
      if (accessToken) setToken(accessToken);
      if (userId) setUserId(userId);
    }
    setLoading(false);
  };

  if (isLogined) window.location.href = '/';

  return (
    <StyledGrid className="mainContainer">
      <Backdrop sx={{ zIndex: '9999999' }} open={loading}>
        <CircularProgress />
      </Backdrop>
      <CssBaseline />
      <StyledBackgroundGrid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <StyledBox>
          <StyledTypography>
            Welcome to our
            <br />
            Voice AI website!
          </StyledTypography>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <StyledButton type="submit" className="customButton">
              Sign In
            </StyledButton>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </StyledBox>
      </Grid>
    </StyledGrid>
  );
};

export default LoginContainer;
