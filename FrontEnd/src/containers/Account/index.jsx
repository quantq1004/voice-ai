import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { TextField, Box, Typography, Button } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Copyright from '../../components/Copyright';
import { removeToken, getUserId, removeUserId } from '../../utils/localStorage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import getErrorMessage from '../../errors/message';
import { updateUser, getUserDetails } from '../../apis/user';
import {
  StyledBox,
  StyledTypography,
  StyledAvatar,
  StyledButton,
} from './index.style';

const AccountManagement = () => {
  const navigate = useNavigate();
  const userId = getUserId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const fetchUserDetails = async (id) => {
    const response = await getUserDetails(id);

    if (response) {
      setName(response?.result?.user?.name || '');
      setEmail(response?.result?.user?.email || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!name) validationErrors.name = 'Name is required';
    if (!email) validationErrors.email = 'Email is required';
    // if (!password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await updateUser({ name, email, userId });

    if (response?.status === 0) {
      setErrors({});
      enqueueSnackbar(getErrorMessage(response?.result?.code), {
        variant: 'error',
      });
    } else {
      setErrors({});
      enqueueSnackbar('Account updated successfully', { variant: 'success' });
    }
  };
  const handleLogout = () => {
    removeToken();
    removeUserId();
  };

  const handleReturn = () => navigate('/');

  useEffect(() => {
    if (userId) fetchUserDetails(userId);
  }, [userId]);

  return (
    <>
      <Header onLogout={handleLogout} />
      <StyledBox>
        <StyledBox className="title">
          <Button onClick={handleReturn} variant="contained">
            Return
          </Button>
          <StyledTypography>Manage your account</StyledTypography>
        </StyledBox>
        <StyledAvatar>
          <AccountCircleOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Edit Account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          {/* <TextField
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
            error={Boolean(errors.password)}
            helperText={errors.password}
          /> */}
          <StyledButton type="submit" className="customButton">
            Save Changes
          </StyledButton>
          <Copyright />
        </Box>
      </StyledBox>
      <Footer />
    </>
  );
};

export default AccountManagement;
