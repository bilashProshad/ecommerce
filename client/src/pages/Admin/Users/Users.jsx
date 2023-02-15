import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";

const Users = () => {
  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Products</h2>

      <table className="list">
        <tr className="header">
          <th>User Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>634840c90bec13046c6f9d1a</td>
          <td>Bilash Prosad</td>
          <td>pbilash64@gmail.com</td>
          <td>admin</td>
          <td>
            <div className="link">
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdEdit />
              </Link>
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdDelete />
              </Link>
            </div>
          </td>
        </tr>
        <tr>
          <td>634840c90bec13046c6f9d1a</td>
          <td>Bilash Prosad</td>
          <td>pbilash64@gmail.com</td>
          <td>admin</td>
          <td>
            <div className="link">
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdEdit />
              </Link>
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdDelete />
              </Link>
            </div>
          </td>
        </tr>
        <tr>
          <td>634840c90bec13046c6f9d1a</td>
          <td>Bilash Prosad</td>
          <td>pbilash64@gmail.com</td>
          <td>admin</td>
          <td>
            <div className="link">
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdEdit />
              </Link>
              <Link to={`/634840c90bec13046c6f9d1a`}>
                <MdDelete />
              </Link>
            </div>
          </td>
        </tr>
      </table>
    </SideLayout>
  );
};

export default Users;
