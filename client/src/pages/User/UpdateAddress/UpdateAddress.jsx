import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Form from "../../../components/Form/Form";
import Input from "../../../components/Input/Input";
import logo from "../../../assets/icon.svg";
import InputContainer from "../../../components/InputContainer/InputContainer";
import { useInputValidate } from "../../../hooks/useInputValidate";
import FormWrapper from "../../../components/FormWrapper/FormWrapper";
import "./UpdateAddress.scss";

const UpdateAddress = () => {
  const [contact, setContact, contactError, isContactTouched] =
    useInputValidate();
  const [address, setAddress, addressError, isAddressTouched] =
    useInputValidate();
  const [district, setDistrict, districtError, isDistrictTouched] =
    useInputValidate();
  const [division, setDivision, divisionError, isDivisionTouched] =
    useInputValidate();
  const [country, setCountry, countryError, isCountryTouched] =
    useInputValidate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (contactError) {
      return;
    }

    if (contact === "") return;

    console.log(contact);

    setContact("");
  };

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
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={isAddressTouched}
              className={addressError ? "error" : ""}
            />
            {addressError && (
              <span className="error-text">*** Please enter your address</span>
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
