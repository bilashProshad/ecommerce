import "./Profile.scss";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container className={`profile`}>
      <div className="profile-wrapper">
        <div className="left">
          <img src="/images/profile-pic.jpg" className="display-pic" alt="" />

          <div className="user-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          <div className="update-btns">
            <Link to={`/profile/edit`}>
              <Button>Edit Profile</Button>
            </Link>
            <Link to={`/profile/password/change`}>
              <Button>Change Password</Button>
            </Link>
          </div>
        </div>
        <div className="right">
          <Link to={`/profile/address/edit`} className="edit-icon">
            <FiEdit />
          </Link>

          <div className="address">
            <div>
              <h4>Contact Number:</h4>
              <p>+8801788228533</p>
            </div>
            <div>
              <h4>Address:</h4>
              <p>Katabari, Phulbari</p>
            </div>
            <div>
              <h4>District:</h4>
              <p>Dinajpur</p>
            </div>
            <div>
              <h4>Division:</h4>
              <p>Rangpur</p>
            </div>
            <div>
              <h4>Country:</h4>
              <p>Bangladesh</p>
            </div>
          </div>

          <div
            className={`order-btns ${user.role !== "admin" && "right-align"}`}
          >
            {user && user.role === "admin" && (
              <Link to={`/admin/dashboard`}>
                <Button>Dashboard</Button>
              </Link>
            )}
            <Link to={`/orders`}>
              <Button>My Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
