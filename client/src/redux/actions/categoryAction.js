import axios from "axios";
import {
  createCategoryRequest,
  createCategoryFail,
  createCategorySuccess,
} from "../slices/categorySlice";
import {
  getCategoriesFail,
  getCategoriesRequest,
  getCategoriesSuccess,
} from "../slices/categoriesSlice";

const server = process.env.REACT_APP_SERVER;

// const config = {
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// };

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/v1/admin/categories`,
      categoryData,
      config
    );

    dispatch(createCategorySuccess(data));
  } catch (error) {
    dispatch(createCategoryFail(error.response.data.message));
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());

    const { data } = await axios.get(`${server}/api/v1/categories`, {
      withCredentials: true,
    });

    dispatch(getCategoriesSuccess(data.categories));
  } catch (error) {
    dispatch(getCategoriesFail(error.response.data.message));
  }
};

// export const getProductsByCategoryId = (id) => async (dispatch) => {
//   try {
//     dispatch(getCategoriesRequest());

//     const { data } = await axios.get(`${server}/api/v1/categories/${id}`, {
//       withCredentials: true,
//     });

//     dispatch(getCategoriesSuccess(data.categories));
//   } catch (error) {
//     dispatch(getCategoriesFail(error.response.data.message));
//   }
// };
