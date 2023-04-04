import api from "../../http";
import {
  getDashboardStatsFail,
  getDashboardStatsRequest,
  getDashboardStatsSuccess,
} from "../slices/dashboardSlice";

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch(getDashboardStatsRequest());

    const { data } = await api.get(`/api/v1/admin/dashboard`);

    dispatch(getDashboardStatsSuccess(data));
  } catch (error) {
    dispatch(getDashboardStatsFail(error.response.data.message));
  }
};
