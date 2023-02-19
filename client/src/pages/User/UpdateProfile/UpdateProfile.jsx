import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import logo from "../../../assets/icon.svg";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import "./UpdateProfile.scss";

const UpdateProfile = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [email, setEmail, emailError, isEmailTouched] = useInputValidate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameError || emailError) {
      return;
    }

    if (name === "") return;

    console.log(name);

    setName("");
  };

  return (
    <Container className={`update-profile`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Update Profile</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={isNameTouched}
              className={nameError ? "error" : ""}
            />
            {nameError && (
              <span className="error-text">*** Please enter your name</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={isEmailTouched}
              className={emailError ? "error" : ""}
            />
            {emailError && (
              <span className="error-text">*** Please enter your name</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="file"
              placeholder="Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              // onBlur={isEmailTouched}
              // className={emailError ? "error" : ""}
            />
            {/* {emailError && (
              <span className="error-text">*** Please enter your name</span>
            )} */}
          </InputContainer>

          <Button type="submit">Update Profile</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdateProfile;
