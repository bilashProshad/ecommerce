import axios from "axios";
import {
  createCategoryRequest,
  createCategoryFail,
  createCategorySuccess,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  categoryDetailsRequest,
  categoryDetailsSuccess,
  categoryDetailsFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
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

export const getAllCategories = (query) => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());

    let url = `${server}/api/v1/categories`;
    if (query) {
      url = `${server}/api/v1/categories?${query}`;
    }

    const { data } = await axios.get(url, {
      withCredentials: true,
    });

    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoriesFail(error.response.data.message));
  }
};

export const getSingleCategory = (id) => async (dispatch) => {
  try {
    dispatch(categoryDetailsRequest());

    const { data } = await axios.get(
      `${server}/api/v1/admin/categories/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(categoryDetailsSuccess(data));
  } catch (error) {
    dispatch(categoryDetailsFail(error.response.data.message));
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequest());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/api/v1/admin/categories/${id}`,
      categoryData,
      config
    );

    dispatch(updateCategorySuccess(data));
  } catch (error) {
    dispatch(updateCategoryFail(error.response.data.message));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(deleteCategoryRequest());

    const { data } = await axios.delete(
      `${server}/api/v1/admin/categories/${id}`,
      { withCredentials: true }
    );

    dispatch(deleteCategorySuccess(data));
  } catch (error) {
    dispatch(deleteCategoryFail(error.response.data.message));
  }
};
