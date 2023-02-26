import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import logo from "../../../assets/icon.svg";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import "./UpdateProfile.scss";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateProfile } from "../../../redux/actions/profileAction";
import {
  clearUpdateProfileError,
  updatePasswordReset,
} from "../../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { loadUserSuccess } from "../../../redux/slices/authSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    loading,
    error,
    success,
    user: updatedUser,
  } = useSelector((state) => state.profile);

  const [name, setName, nameError, isNameTouched] = useInputValidate(user.name);
  const [email, setEmail, emailError, isEmailTouched] = useInputValidate(
    user.email
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (nameError || emailError || name === "" || email === "") {
      toast.error("Please enter all input fields");
      return;
    }

    dispatch(updateProfile({ name, email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUpdateProfileError());
    }

    if (success) {
      toast.success("Profile updated successfully");
      setName("");
      setEmail("");
      dispatch(loadUserSuccess(updatedUser));
      dispatch(updatePasswordReset());
      navigate(`/profile`);
    }
  }, [error, success, dispatch, setName, setEmail, navigate, updatedUser]);

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

          <Button type="submit">Update Profile</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdateProfile;
