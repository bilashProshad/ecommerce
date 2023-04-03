import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerFail,
  registerSuccess,
  registerRequest,
  loadUserSuccess,
  // loadUserFail,
  loadUserRequest,
  logoutSuccess,
  logoutFail,
} from "../slices/authSlice";
import {
  forgotPasswordFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../slices/passwordSlice";

const server = process.env.REACT_APP_SERVER;

axios.defaults.withCredentials = true;

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginRequest());

      const { data } = await axios.post(
        `${server}/api/v1/auth/login`,
        { email, password },
        config
      );

      dispatch(loginSuccess(data.user));
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
  };

export const register =
  ({ name, email, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      dispatch(registerRequest());

      const { data } = await axios.post(
        `${server}/api/v1/auth/register`,
        { name, email, password, confirmPassword },
        config
      );

      dispatch(registerSuccess(data.user));
    } catch (error) {
      dispatch(registerFail(error.response.data.message));
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest);

    const { data } = await axios.get(`${server}/api/v1/user/me`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    // dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/auth/logout`, {
      withCredentials: true,
    });

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const { data } = await axios.post(
      `${server}/api/v1/auth/password/forgot`,
      {
        email,
      },
      config
    );

    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response.data.message));
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(
      `${server}/api/v1/auth/password/reset/${token}`,
      passwords,
      config
    );

    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response.data.message));
  }
};
