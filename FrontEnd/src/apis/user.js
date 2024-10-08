import { RESOURCE } from '@src/constants';
import api from './api';
import { getToken } from '../utils/localStorage';

const login = async (username, password) => {
  try {
    const response = await api({
      method: 'POST',
      url: `${RESOURCE}/login`,
      data: { username, password },
    });

    return response;
  } catch (error) {
    return null;
  }
};

const register = async (name, username, email, password) => {
  try {
    const response = await api({
      method: 'POST',
      url: '/users/register',
      data: { name, username, email, password },
    });
    return response;
  } catch (error) {
    return null;
  }
};

const getUserDetails = async (userId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `/users/${userId}`,
    });

    return response;
  } catch (error) {
    return null;
  }
};

const updateUser = async ({ name, email, userId }) => {
  try {
    const response = await api({
      method: 'PUT',
      url: `/users/${userId}`,
      data: { name, email },
    });
    return response;
  } catch (error) {
    return null;
  }
};

const getUsers = async () => {
  try {
    const token = getToken();
    const response = await api({
      method: 'GET',
      url: '/users',
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return null;
  }
};

export { login, register, getUserDetails, updateUser, getUsers };
