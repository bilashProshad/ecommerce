import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import Input from "../../../components/Input/Input";
import InputContainer from "../../../components/InputContainer/InputContainer";
import SideLayout from "../../../components/SideLayout/SideLayout";
import logo from "../../../assets/icon.svg";
import "./UpdateCategory.scss";
import { useInputValidate } from "../../../hooks/useInputValidate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getSingleCategory,
  updateCategory,
} from "../../../redux/actions/categoryAction";
import {
  clearCategoryDetailsError,
  clearUpdateCategoryError,
  resetUpdateCategory,
} from "../../../redux/slices/categorySlice";
import Loading from "../../../components/Loading/Loading";

const UpdateCategory = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();

  const { loading, error, success, category } = useSelector(
    (state) => state.categoryDetails
  );

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useSelector((state) => state.category);

  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  useEffect(() => {
    dispatch(getSingleCategory(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (success) {
      setName(category.name);
      setImagePreview(category.image.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearCategoryDetailsError());
    }
  }, [success, dispatch, error, setName, category]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch(clearUpdateCategoryError());
    }

    if (updateSuccess) {
      toast.success("Category updated successfully");
      dispatch(resetUpdateCategory());
      navigate("/admin/categories");
    }
  }, [dispatch, navigate, updateError, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameError || name === "") {
      toast.error("Please enter category name and image");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("image", image);

    dispatch(updateCategory(categoryId, myForm));
  };

  const setCategoryImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <SideLayout className={`create-category`}>
          <FormWrapper className={`wrapper`}>
            <img src={logo} alt="website logo" className="logo" />
            <h2>Update Category</h2>
            <Form onSubmit={submitHandler}>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={isNameTouched}
                  className={nameError ? "error" : ""}
                />
                {nameError && (
                  <span className="error-text">
                    *** Please enter category name
                  </span>
                )}
              </InputContainer>

              <InputContainer>
                <Input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={setCategoryImage}
                />
              </InputContainer>

              {imagePreview && (
                <img src={imagePreview} alt="category img" className="image" />
              )}

              <Button
                loading={updateLoading}
                disabled={updateLoading}
                type="submit"
              >
                Update
              </Button>
            </Form>
          </FormWrapper>
        </SideLayout>
      )}
    </>
  );
};

export default UpdateCategory;
