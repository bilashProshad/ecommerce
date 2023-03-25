import axios from "axios";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  getUserDetailsFail,
  getUserDetailsRequest,
  getUserDetailsSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
} from "../slices/userSllice";

const server = process.env.REACT_APP_SERVER;
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await axios.get(`${server}/api/v1/admin/users`, config);

    dispatch(getAllUsersSuccess(data));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch(getUserDetailsRequest());

    const { data } = await axios.get(
      `${server}/api/v1/admin/users/${id}`,
      config
    );

    dispatch(getUserDetailsSuccess(data));
  } catch (error) {
    dispatch(getUserDetailsFail(error.response.data.message));
  }
};

export const updateUser =
  ({ id, name, email, role }) =>
  async (dispatch) => {
    try {
      dispatch(updateUserRequest());

      const { data } = await axios.put(
        `${server}/api/v1/admin/users/${id}`,
        { name, email, role },
        config
      );

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());

    const { data } = await axios.delete(
      `${server}/api/v1/admin/users/${id}`,
      config
    );

    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
