import axios from "axios";
import {
  getDashboardStatsFail,
  getDashboardStatsRequest,
  getDashboardStatsSuccess,
} from "../slices/dashboardSlice";

// const server = process.env.REACT_APP_SERVER;

// const config = {
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// };

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch(getDashboardStatsRequest());

    const { data } = await axios.get(`/api/v1/admin/dashboard`, {
      withCredentials: true,
    });

    dispatch(getDashboardStatsSuccess(data));
  } catch (error) {
    dispatch(getDashboardStatsFail(error.response.data.message));
  }
};
