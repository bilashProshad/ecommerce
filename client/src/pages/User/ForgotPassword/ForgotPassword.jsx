import "./ForgotPassword.scss";
import Container from "../../../components/Container/Container";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import Form from "../../../components/Form/Form";
import InputContainer from "../../../components/InputContainer/InputContainer";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import logo from "../../../assets/icon.svg";
import { useInputValidate } from "../../../hooks/useInputValidate";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../redux/actions/authAction";
import { useEffect } from "react";
import {
  clearForgotPasswordError,
  clearForgotPasswordMessage,
} from "../../../redux/slices/passwordSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail, emailError, isemailTouched] = useInputValidate();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (emailError || email === "") {
      toast.error("Please enter all fields");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearForgotPasswordError());
    }

    if (message) {
      toast.success(message);
      dispatch(clearForgotPasswordMessage());
      navigate(`/login`);
    }
  }, [error, dispatch, message, navigate]);

  return (
    <Container className={`forgot-password`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Forgot Password</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={isemailTouched}
              className={emailError ? "error" : ""}
            />
            {emailError && (
              <span className="error-text">*** Please enter your email</span>
            )}
          </InputContainer>
          <Button type="submit">Send</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default ForgotPassword;
