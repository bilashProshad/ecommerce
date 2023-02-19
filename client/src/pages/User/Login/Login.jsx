import "./Login.scss";
import logo from "../../../assets/icon.svg";
import Input from "../../../components/Input/Input";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Button from "../../../components/Button/Button";
import { useInputValidate } from "../../../hooks/useInputValidate";

const Login = () => {
  const switchButtonRef = useRef(null);
  const loginButtonRef = useRef(null);
  const registerButtonRef = useRef(null);
  const loginTabRef = useRef(null);
  const registerTabRef = useRef(null);

  const [loginEmail, setLoginEmail, loginEmailError, isLoginEmailTouched] =
    useInputValidate();
  const [
    loginPassword,
    setLoginPassword,
    loginPasswordError,
    isLoginPasswordTouched,
  ] = useInputValidate();
  const [name, setName, nameError, isNameTouched] = useInputValidate();
  const [email, setEmail, emailError, isEmailTouched] = useInputValidate();
  const [password, setPassword, passwordError, isPasswordTouched] =
    useInputValidate();
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    isConfirmPasswordTouched,
  ] = useInputValidate();

  const switchButton = (e, tabs) => {
    if (tabs === "login") {
      switchButtonRef.current.classList.remove("shiftButtonToRight");
      loginButtonRef.current.classList.add("active");
      registerButtonRef.current.classList.remove("active");

      registerTabRef.current.classList.remove("swipe-register-tab-to-right");
      loginTabRef.current.classList.remove("swipe-login-tab-to-right");
    }

    if (tabs === "register") {
      switchButtonRef.current.classList.add("shiftButtonToRight");
      loginButtonRef.current.classList.remove("active");
      registerButtonRef.current.classList.add("active");

      registerTabRef.current.classList.add("swipe-register-tab-to-right");
      loginTabRef.current.classList.add("swipe-login-tab-to-right");
    }
  };

  const submitLoginHandler = (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    console.log(loginEmail, loginPassword);

    setLoginEmail("");
    setLoginPassword("");
  };

  const submitRegisterHandler = (e) => {
    e.preventDefault();

    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }

    console.log(name, email, password, confirmPassword);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={`login`}>
      <div className="wrapper">
        <img src={logo} alt="website logo" className="logo" />
        <div className={`buttons`} ref={switchButtonRef}>
          <span
            onClick={(e) => switchButton(e, "login")}
            ref={loginButtonRef}
            className="active"
          >
            Login
          </span>
          <span
            onClick={(e) => switchButton(e, "register")}
            ref={registerButtonRef}
          >
            Register
          </span>
        </div>
        <form
          className="login-form"
          ref={loginTabRef}
          onSubmit={submitLoginHandler}
        >
          <div className="input-container">
            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              onBlur={isLoginEmailTouched}
              className={loginEmailError ? "error" : ""}
            />
            {loginEmailError && (
              <span className="error-text">*** Please enter your email</span>
            )}
          </div>

          <div className="input-container">
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onBlur={isLoginPasswordTouched}
              className={loginPasswordError ? "error" : ""}
            />
            {loginPasswordError && (
              <span className="error-text">*** Please enter password</span>
            )}
          </div>

          <div>
            <Link to={"/"}>Forgot your password?</Link>
            <Button type="submit">Login</Button>
          </div>
        </form>
        <form
          className="register-form"
          ref={registerTabRef}
          onSubmit={submitRegisterHandler}
        >
          <div className="input-container">
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
          </div>
          <div className="input-container">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={isEmailTouched}
              className={emailError ? "error" : ""}
            />
            {emailError && (
              <span className="error-text">*** Please enter your email</span>
            )}
          </div>
          <div className="input-container">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={isPasswordTouched}
              className={passwordError ? "error" : ""}
            />
            {passwordError && (
              <span className="error-text">*** Please enter password</span>
            )}
          </div>
          <div className="input-container">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={isConfirmPasswordTouched}
              className={confirmPasswordError ? "error" : ""}
            />{" "}
            {confirmPasswordError && (
              <span className="error-text">
                *** Please enter confirm password
              </span>
            )}
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
