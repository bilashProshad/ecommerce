import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { clearAllUsersError } from "../../../redux/slices/userSllice";
import Loading from "../../../components/Loading/Loading";
import { getAllUsers } from "../../../redux/actions/userAction";

const Users = () => {
  const headers = ["User Id", "Name", "Email", "Role", "Actions"];
  const data = [
    {
      _id: "634840c90bec16456c6f9d2a",
      name: "Bilash Prosad",
      email: "pbilash64@gmail.com",
      role: "admin",
    },
    {
      _id: "634840c90bec57866c6f9d2b",
      name: "Joyee",
      email: "joyee@gmail.com",
      role: "user",
    },
    {
      _id: "535574c90bec12354c6f9d2f",
      name: "John",
      email: "john@gmail.com",
      role: "user",
    },
  ];

  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersError());
    }
  }, [error, dispatch]);

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Users</h2>

      {loading ? (
        <Loading />
      ) : (
        <Table headers={headers} data={data}>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="link">
                    <Link to={`/admin/users/${user._id}`}>
                      <MdEdit />
                    </Link>
                    <Link to={`/admin/users/${user._id}`}>
                      <MdDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </Table>
      )}
    </SideLayout>
  );
};

export default Users;
