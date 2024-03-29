import api from "../../http";
import {
  updateAddressFail,
  updateAddressRequest,
  updateAddressSuccess,
} from "../slices/addressSlice";
import {
  updatePasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFailed,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/profileSlice";
import {
  updatePhotoFail,
  updatePhotoRequest,
  updatePhotoSuccess,
} from "../slices/userSllice";

export const updatePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await api.put(`/api/v1/user/password`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      dispatch(updatePasswordSuccess(data));
    } catch (error) {
      dispatch(updatePasswordFailed(error.response.data.message));
    }
  };

export const updateProfile =
  ({ name, email }) =>
  async (dispatch) => {
    try {
      dispatch(updateProfileRequest());

      const { data } = await api.put(`/api/v1/user/me`, { name, email });

      dispatch(updateProfileSuccess(data));
    } catch (error) {
      dispatch(updateProfileFailed(error.response.data.message));
    }
  };

export const updateAddress =
  ({ contactNo, post, district, division, country }) =>
  async (dispatch) => {
    try {
      dispatch(updateAddressRequest());

      const { data } = await api.put(`/api/v1/address`, {
        contactNo,
        post,
        district,
        division,
        country,
      });

      dispatch(updateAddressSuccess(data));
    } catch (error) {
      dispatch(updateAddressFail(error.response.data.message));
    }
  };

export const updateProfilePicture = (userData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };

  try {
    dispatch(updatePhotoRequest());

    const { data } = await api.put(`/api/v1/user/avatar`, userData, config);

    dispatch(updatePhotoSuccess(data));
  } catch (error) {
    dispatch(updatePhotoFail(error.response.data.message));
  }
};
