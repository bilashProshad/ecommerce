import "./Profile.scss";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateProfilePicture } from "../../../redux/actions/profileAction";
import { toast } from "react-hot-toast";
import { clearUserError, resetUser } from "../../../redux/slices/userSllice";
import { loadUser } from "../../../redux/actions/authAction";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error } = useSelector((state) => state.user);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("/images/profile.png");

  const dispatch = useDispatch();

  const setProfileImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user && user.avatar && user.avatar.public_id) {
      setImagePreview(user.avatar.url);
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      const myForm = new FormData();
      myForm.set("image", image);

      dispatch(updateProfilePicture(myForm));
    }
  }, [dispatch, image]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profile picture is updated successfully");
      setImage("");
      dispatch(resetUser());
      dispatch(loadUser());
    }

    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
  }, [dispatch, error, isUpdated]);

  return (
    <Container className={`profile`}>
      <div className="profile-wrapper">
        <div className="left">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            multiple
            id="profile"
            style={{ display: "none" }}
            onChange={setProfileImage}
          />
          <label htmlFor="profile">
            <img src={imagePreview} className="display-pic" alt="" />
          </label>

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
              <p>{user.address ? user.address.contactNo : "N/A"}</p>
            </div>
            <div>
              <h4>Address:</h4>
              <p>{user.address ? user.address.post : "N/A"}</p>
            </div>
            <div>
              <h4>District:</h4>
              <p>{user.address ? user.address.district : "N/A"}</p>
            </div>
            <div>
              <h4>Division:</h4>
              <p>{user.address ? user.address.division : "N/A"}</p>
            </div>
            <div>
              <h4>Country:</h4>
              <p>{user.address ? user.address.country : "N/A"}</p>
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
