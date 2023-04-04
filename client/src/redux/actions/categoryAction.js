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
import api from "../../http";

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch(createCategoryRequest());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const { data } = await api.post(
      `/api/v1/admin/categories`,
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

    let url = `/api/v1/categories`;
    if (query) {
      url = `/api/v1/categories?${query}`;
    }

    const { data } = await api.get(url);

    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoriesFail(error.response.data.message));
  }
};

export const getAllAdminCategories = (query) => async (dispatch) => {
  try {
    dispatch(getCategoriesRequest());

    let url = `/api/v1/admin/categories`;
    if (query) {
      url = `/api/v1/admin/categories?${query}`;
    }

    const { data } = await api.get(url);

    dispatch(getCategoriesSuccess(data));
  } catch (error) {
    dispatch(getCategoriesFail(error.response.data.message));
  }
};

export const getSingleCategory = (id) => async (dispatch) => {
  try {
    dispatch(categoryDetailsRequest());

    const { data } = await api.get(`/api/v1/admin/categories/${id}`);

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

    const { data } = await api.put(
      `/api/v1/admin/categories/${id}`,
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

    const { data } = await api.delete(`/api/v1/admin/categories/${id}`);

    dispatch(deleteCategorySuccess(data));
  } catch (error) {
    dispatch(deleteCategoryFail(error.response.data.message));
  }
};
