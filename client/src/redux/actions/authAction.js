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
import api from "../../http";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginRequest());

      const { data } = await api.post(`/api/v1/auth/login`, {
        email,
        password,
      });

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

      const { data } = await api.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });

      dispatch(registerSuccess(data.user));
    } catch (error) {
      dispatch(registerFail(error.response.data.message));
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest);

    const { data } = await api.get(`/api/v1/user/me`);

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    // dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/v1/auth/logout`);

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const { data } = await api.post(`/api/v1/auth/password/forgot`, {
      email,
    });

    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response.data.message));
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await api.put(
      `/api/v1/auth/password/reset/${token}`,
      passwords
    );

    dispatch(resetPasswordSuccess(data));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response.data.message));
  }
};
