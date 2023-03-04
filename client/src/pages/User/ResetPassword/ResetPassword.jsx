import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import Input from "../../../components/Input/Input";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import "./ResetPassword.scss";
import logo from "../../../assets/icon.svg";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, resetPassword } from "../../../redux/actions/authAction";
import { useEffect } from "react";
import { clearResetPasswordError } from "../../../redux/slices/passwordSlice";

const ResetPassword = () => {
  const [newPassword, setNewPassword, newPasswordError, isNewPasswordTouched] =
    useInputValidate();
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    isConfirmPasswordTouched,
  ] = useInputValidate();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      newPasswordError ||
      confirmPasswordError ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please enter all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must be same");
      return;
    }

    dispatch(resetPassword(token, { password: newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearResetPasswordError());
    }

    if (success) {
      toast.success("Password updated successfully");
      dispatch(loadUser());
      navigate("/profile");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <Container className={`reset-password`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Reset Password</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={isNewPasswordTouched}
              className={newPasswordError ? "error" : ""}
            />
            {newPasswordError && (
              <span className="error-text">*** Please enter new password</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={isConfirmPasswordTouched}
              className={confirmPasswordError ? "error" : ""}
            />
            {confirmPasswordError && (
              <span className="error-text">
                *** Please enter confirm password
              </span>
            )}
          </InputContainer>

          <Button type="submit">Reset Password</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default ResetPassword;
