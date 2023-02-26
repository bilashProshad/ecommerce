import { useEffect, useState } from "react";
import Form from "../../../components/Form/Form";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import InputContainer from "../../../components/InputContainer/InputContainer";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { useInputValidate } from "../../../hooks/useInputValidate";
import logo from "../../../assets/icon.svg";
import Input from "../../../components/Input/Input";
import Textarea from "../../../components/Textarea/Textarea";
import Button from "../../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
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
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      price <= 0 ||
      stock <= 0 ||
      description === "" ||
      category === ""
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

    if (images.length > 0) {
      images.forEach((image) => {
        myForm.append("images", image);
      });
    }
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

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearCreateProductError());
  //   }

  //   if (success) {
  //     toast.success("Product created successfully");
  //     dispatch(createProductReset());

  //     setName("");
  //     setPrice(0);
  //     setStock(0);
  //     setCategory("");
  //     setDescription("");
  //     setImages([]);
  //     setImagesPreview([]);

  //     navigate(`/admin/products/all`);
  //   }
  // }, [
  //   success,
  //   error,
  //   dispatch,
  //   setName,
  //   setPrice,
  //   setStock,
  //   setCategory,
  //   setDescription,
  //   navigate,
  // ]);

  return (
    <SideLayout className={`create-product`}>
      <FormWrapper className={`wrapper`}>
        <img src={logo} alt="website logo" className="logo" />
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

          <Button type="submit">Create</Button>
        </Form>
      </FormWrapper>
    </SideLayout>
  );
};

export default UpdateProduct;
