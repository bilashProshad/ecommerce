import "./Profile.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <Container className="profile">
      <h2 className="heading">My Profile</h2>
      <div className="body">
        <div className="left">
          <div className="photo">
            <img src="/images/Profile.png" alt="profile pic" />
          </div>
          <div className="user-details">
            <h3 className="name">Bilash Prosad</h3>
            <p className="email">pbilash64@gmail.com</p>
          </div>
          <div className="update-buttons">
            <Button>Edit Profile</Button>
            <Button className={`change-pass-btn`}>Change Password</Button>
          </div>
        </div>
        <div className="right">
          <Card className={`address`}>
            <Link to={"change-address"}>
              <FiEdit />
            </Link>

            <div className="details">
              <div>
                <h4>Contact Number</h4>
                <p>+8801788228533</p>
              </div>
              <div>
                <h4>Address</h4>
                <p>Kantabari, Phulbari</p>
              </div>
              <div>
                <h4>District</h4>
                <p>Dinajpur</p>
              </div>
              <div>
                <h4>Division</h4>
                <p>Rangpur</p>
              </div>
              <div>
                <h4>Country</h4>
                <p>Bangladesh</p>
              </div>
            </div>
          </Card>
          <div>
            <Button>My Orders</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
