import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import Input from "../../../components/Input/Input";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import { loadUser } from "../../../redux/actions/authAction";
import { updateAddress } from "../../../redux/actions/profileAction";
import {
  clearUpdateAddressError,
  resetUpdateAddress,
} from "../../../redux/slices/addressSlice";
import logo from "../../../assets/icon.svg";
import "./ShippingAddress.scss";

const ShippingAddress = () => {
  const [contact, setContact, contactError, isContactTouched] =
    useInputValidate();
  const [post, setPost, postError, isPostTouched] = useInputValidate();
  const [district, setDistrict, districtError, isDistrictTouched] =
    useInputValidate();
  const [division, setDivision, divisionError, isDivisionTouched] =
    useInputValidate();
  const [country, setCountry, countryError, isCountryTouched] =
    useInputValidate();

  const { loading, success, error, address } = useSelector(
    (state) => state.address
  );
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

    if (user && !user.address) {
      localStorage.removeItem("obAddress");
    }
  }, [setContact, setCountry, setDistrict, setDivision, setPost, user]);

  useEffect(() => {
    if (success) {
      dispatch(loadUser());
      localStorage.setItem(
        "obAddress",
        JSON.stringify({
          contactNo: address.contactNo,
          post: address.post,
          district: address.district,
          division: address.division,
          country: address.country,
        })
      );
      dispatch(resetUpdateAddress());
      navigate(`/order/confirm`);
    }

    if (error) {
      toast.error(error);
      dispatch(clearUpdateAddressError());
    }
  }, [dispatch, error, success, navigate, user, address]);

  return (
    <Container className={`shipping-address`}>
      <FormWrapper>
        <img src={logo} alt="website logo" className="logo" />
        <h2>Shipping Address</h2>
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

          <Button loading={loading} disabled={loading} type="submit">
            Continue
          </Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default ShippingAddress;
