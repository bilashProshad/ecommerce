import api from "../../http";
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

export const getAllUsers = (query) => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    const { data } = await api.get(`/api/v1/admin/users?${query}`);

    dispatch(getAllUsersSuccess(data));
  } catch (error) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch(getUserDetailsRequest());

    const { data } = await api.get(`/api/v1/admin/users/${id}`);

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

      const { data } = await api.put(`/api/v1/admin/users/${id}`, {
        name,
        email,
        role,
      });

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFail(error.response.data.message));
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());

    const { data } = await api.delete(`/api/v1/admin/users/${id}`);

    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
