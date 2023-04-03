import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import SideLayout from "../../../components/SideLayout/SideLayout";
import "./CreateProduct.scss";
// import logo from "../../../assets/icon.svg";
import Form from "../../../components/Form/Form";
import InputContainer from "../../../components/InputContainer/InputContainer";
import Input from "../../../components/Input/Input";
import { useInputValidate } from "../../../hooks/useInputValidate";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Textarea from "../../../components/Textarea/Textarea";
import { createProduct } from "../../../redux/actions/productAction";
import {
  clearCreateProductError,
  createProductReset,
} from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [price, setPrice, priceError, isPriceTouched] = useInputValidate(0);
  const [stock, setStock, stockError, isStockTouched] = useInputValidate(0);
  const [description, setDescription, descriptionError, isDescriptionTouched] =
    useInputValidate();
  const [category, setCategory, categoryError, isCategoryTouched] =
    useInputValidate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);
  const { loading, success, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      price <= 0 ||
      stock <= 0 ||
      description === "" ||
      category === "" ||
      images.length === 0
    ) {
      toast.error("Please enter all fields");
      return;
    }

    if (
      nameError ||
      priceError ||
      stockError ||
      descriptionError ||
      categoryError
    ) {
      toast.error("Please enter all fields");
      return;
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("category", category);
    myForm.set("description", description);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const productImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCreateProductError());
    }

    if (success) {
      setName("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setDescription("");
      setImages([]);
      setImagesPreview([]);

      toast.success("Product created successfully");
      dispatch(createProductReset());

      navigate(`/admin/products`);
    }
  }, [
    success,
    error,
    dispatch,
    setName,
    setPrice,
    setStock,
    setCategory,
    setDescription,
    navigate,
  ]);

  return (
    <SideLayout className={`create-product`}>
      <FormWrapper className={`wrapper`}>
        {/* <img src={logo} alt="website logo" className="logo" /> */}
        <h2>Create Product</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={isNameTouched}
              className={nameError ? "error" : ""}
            />
            {nameError && (
              <span className="error-text">*** Please enter product name</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              // type="text"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={isPriceTouched}
              className={priceError ? "error" : ""}
            />
            {priceError && (
              <span className="error-text">*** Please enter product price</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onBlur={isStockTouched}
              className={stockError ? "error" : ""}
            />
            {stockError && (
              <span className="error-text">
                *** Please enter stock quantity
              </span>
            )}
          </InputContainer>
          <InputContainer>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={isDescriptionTouched}
              className={stockError ? "error" : ""}
            />
            {descriptionError && (
              <span className="error-text">*** Please enter description</span>
            )}
          </InputContainer>
          <InputContainer>
            <select
              onChange={(e) => setCategory(e.target.value)}
              onBlur={isCategoryTouched}
              className={`select-category ${category ? "selected" : ""}`}
            >
              <option value="">Select Category</option>
              {categories &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {categoryError && (
              <span className="error-text">*** Please select category</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              multiple
              onChange={productImageChange}
            />
          </InputContainer>

          <div className={`product-images`}>
            {imagesPreview.length > 0 &&
              imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="product review" />
              ))}
          </div>

          <Button loading={loading} disabled={loading} type="submit">
            Create
          </Button>
        </Form>
      </FormWrapper>
    </SideLayout>
  );
};

export default CreateProduct;
