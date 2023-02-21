import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import SideLayout from "../../../components/SideLayout/SideLayout";
import "./CreateProduct.scss";
import logo from "../../../assets/icon.svg";
import Form from "../../../components/Form/Form";
import InputContainer from "../../../components/InputContainer/InputContainer";
import Input from "../../../components/Input/Input";
import { useInputValidate } from "../../../hooks/useInputValidate";

const CreateProduct = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();

  return (
    <SideLayout className={`create-product`}>
      <FormWrapper className={`wrapper`}>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Create Product</h2>
        <Form>
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
              type="number"
              placeholder="Price"
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
              type="text"
              placeholder="Stock"
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
              type="text"
              placeholder="Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={isNameTouched}
              className={nameError ? "error" : ""}
            />
            {nameError && (
              <span className="error-text">*** Please enter product name</span>
            )}
          </InputContainer>
        </Form>
      </FormWrapper>
    </SideLayout>
  );
};

export default CreateProduct;
