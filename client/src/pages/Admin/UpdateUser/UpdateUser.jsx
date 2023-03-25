import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import Input from "../../../components/Input/Input";
import InputContainer from "../../../components/InputContainer/InputContainer";
import SideLayout from "../../../components/SideLayout/SideLayout";
import logo from "../../../assets/icon.svg";
import "./UpdateUser.scss";
import { useInputValidate } from "../../../hooks/useInputValidate";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSingleUser, updateUser } from "../../../redux/actions/userAction";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-hot-toast";
import {
  clearUserDetailsError,
  clearUserError,
  resetUser,
} from "../../../redux/slices/userSllice";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [email, setEmail, emailError, isEmailTouched] = useInputValidate();
  const [role, setRole, roleError, isRoleTouched] = useInputValidate();

  const { user, loading, success, error } = useSelector(
    (state) => state.userDetails
  );
  const {
    loading: updateLoading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      name === "" ||
      role === "" ||
      nameError ||
      emailError ||
      roleError
    ) {
      toast.error("Please enter all fields");
      return;
    }

    dispatch(updateUser({ id, name, email, role }));
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearUserDetailsError());
    }

    if (isUpdated) {
      toast.success("User is updated successfully");
      dispatch(resetUser());
      navigate("/admin/users");
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearUserError());
    }
  }, [
    dispatch,
    user,
    success,
    setEmail,
    setName,
    setRole,
    error,
    isUpdated,
    navigate,
    updateError,
  ]);

  return loading ? (
    <Loading />
  ) : (
    <SideLayout className={`create-product`}>
      <FormWrapper className={`wrapper`}>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Update User</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="text"
              placeholder="User Name"
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={isEmailTouched}
              className={emailError ? "error" : ""}
            />
            {emailError && (
              <span className="error-text">*** Please enter product price</span>
            )}
          </InputContainer>
          <InputContainer>
            <select
              onChange={(e) => setRole(e.target.value)}
              onBlur={isRoleTouched}
              className={`select-category ${role ? "selected" : ""}`}
            >
              <option value="">Select role</option>
              <option value="admin" selected={user.role === "admin"}>
                Admin
              </option>
              <option value="user" selected={user.role === "user"}>
                User
              </option>
            </select>
            {roleError && (
              <span className="error-text">*** Please select role</span>
            )}
          </InputContainer>

          <Button type="submit">Update</Button>
        </Form>
      </FormWrapper>
    </SideLayout>
  );
};

export default UpdateUser;
