import "./CreateCategory.scss";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import SideLayout from "../../../components/SideLayout/SideLayout";
import logo from "../../../assets/icon.svg";
import Form from "../../../components/Form/Form";
import InputContainer from "../../../components/InputContainer/InputContainer";
import Input from "../../../components/Input/Input";
import { useInputValidate } from "../../../hooks/useInputValidate";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCategory } from "../../../redux/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  createCategoryReset,
} from "../../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newCategory);
  const navigate = useNavigate();

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

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameError || name === "" || image === "") {
      toast.error("Please enter category name and image");
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("image", image);

    dispatch(createCategory(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Category is created successfully");
      dispatch(createCategoryReset());

      setName("");
      navigate(`/admin/categories`);
    }
  }, [error, success, dispatch, setName, navigate]);

  return (
    <SideLayout className={`create-category`}>
      <FormWrapper className={`wrapper`}>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Create Category</h2>
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
              <span className="error-text">*** Please enter category name</span>
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

          <Button type="submit">Create</Button>
        </Form>
      </FormWrapper>
    </SideLayout>
  );
};

export default CreateCategory;
