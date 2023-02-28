import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import logo from "../../../assets/icon.svg";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import "./UpdateAddress.scss";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../../redux/actions/profileAction";
import { useEffect } from "react";
import {
  clearUpdateAddressError,
  resetUpdateAddress,
} from "../../../redux/slices/addressSlice";
import { useNavigate } from "react-router-dom";

const UpdateAddress = () => {
  const [contact, setContact, contactError, isContactTouched] =
    useInputValidate();
  const [post, setPost, postError, isPostTouched] = useInputValidate();
  const [district, setDistrict, districtError, isDistrictTouched] =
    useInputValidate();
  const [division, setDivision, divisionError, isDivisionTouched] =
    useInputValidate();
  const [country, setCountry, countryError, isCountryTouched] =
    useInputValidate();

  const { loading, success, error } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      contactError ||
      postError ||
      districtError ||
      divisionError ||
      countryError ||
      contact === "" ||
      post === "" ||
      district === "" ||
      division === "" ||
      country === ""
    ) {
      toast.error("Please enter all fields");
      return;
    }

    dispatch(
      updateAddress({ contactNo: contact, post, district, division, country })
    );
  };

  useEffect(() => {
    if (user && user.address) {
      setContact(user.address.contactNo);
      setPost(user.address.post);
      setDistrict(user.address.district);
      setDivision(user.address.division);
      setCountry(user.address.country);
    }
  }, [setContact, setCountry, setDistrict, setDivision, setPost, user]);

  useEffect(() => {
    if (success) {
      toast.success(`Address update successfully`);
      dispatch(resetUpdateAddress());
      navigate(`/profile`);
    }

    if (error) {
      toast.error(error);
      dispatch(clearUpdateAddressError());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <Container className={`update-address`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Update Address</h2>
        <Form onSubmit={submitHandler}>
          <InputContainer>
            <Input
              type="number"
              placeholder="Contact No."
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              onBlur={isContactTouched}
              className={contactError ? "error" : ""}
            />
            {contactError && (
              <span className="error-text">
                *** Please enter your contact number
              </span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Village, Post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              onBlur={isPostTouched}
              className={postError ? "error" : ""}
            />
            {postError && (
              <span className="error-text">
                *** Please enter your post, village
              </span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onBlur={isDistrictTouched}
              className={districtError ? "error" : ""}
            />
            {districtError && (
              <span className="error-text">*** Please enter your district</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              onBlur={isDivisionTouched}
              className={divisionError ? "error" : ""}
            />
            {divisionError && (
              <span className="error-text">*** Please enter your division</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onBlur={isCountryTouched}
              className={countryError ? "error" : ""}
            />
            {countryError && (
              <span className="error-text">*** Please enter your country</span>
            )}
          </InputContainer>

          <Button type="submit">Update Address</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default UpdateAddress;
