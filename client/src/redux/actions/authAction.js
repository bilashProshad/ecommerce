import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerFail,
  registerSuccess,
  registerRequest,
  loadUserSuccess,
  loadUserFail,
  loadUserRequest,
} from "../slices/authSlice";

const server = process.env.REACT_APP_SERVER;

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
