import axios from "axios";
import {
  updatePasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
} from "../slices/userSlice";

const server = process.env.REACT_APP_SERVER;
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const updatePassword =
  ({ oldPassword, newPassword, confirmPassword }) =>
  async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${server}/api/v1/user/password`,
        { oldPassword, newPassword, confirmPassword },
        config
      );

      dispatch(updatePasswordSuccess(data));
    } catch (error) {
      dispatch(updatePasswordFailed(error.response.data.message));
    }
  };
