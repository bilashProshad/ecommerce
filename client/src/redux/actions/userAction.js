import axios from "axios";
import {
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
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
