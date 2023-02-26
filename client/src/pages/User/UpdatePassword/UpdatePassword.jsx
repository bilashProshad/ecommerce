import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import logo from "../../../assets/icon.svg";
import "./UpdatePassword.scss";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updatePassword } from "../../../redux/actions/userAction";
import {
  clearUpdatePasswordError,
  updatePasswordReset,
} from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword, oldPasswordError, isOldPasswordTouched] =
    useInputValidate();
  const [newPassword, setNewPassword, newPasswordError, isNewPasswordTouched] =
    useInputValidate();
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    isConfirmPasswordTouched,
  ] = useInputValidate();

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      oldPasswordError ||
      newPasswordError ||
      confirmPasswordError ||
      oldPassword === "" ||
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

    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUpdatePasswordError());
    }

    if (success) {
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(updatePasswordReset());
      navigate(`/profile`);
    }
  }, [
    error,
    setConfirmPassword,
    setNewPassword,
    setOldPassword,
    success,
    dispatch,
    navigate,
  ]);

  return (
    <Container className={`update-password`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Change Password</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onBlur={isOldPasswordTouched}
              className={oldPasswordError ? "error" : ""}
            />
            {oldPasswordError && (
              <span className="error-text">
                *** Please enter your old password
              </span>
            )}
          </InputContainer>
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

          <Button type="submit">Change Password</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdatePassword;
