import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../components/Table/Table";

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

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Users</h2>

      <Table headers={headers} data={data}>
        {data.map((d) => (
          <tr key={d._id}>
            <td>{d._id}</td>
            <td>{d.name}</td>
            <td>{d.email}</td>
            <td>{d.role}</td>
            <td>
              <div className="link">
                <Link to={`/admin/products/all/${d._id}`}>
                  <MdEdit />
                </Link>
                <Link to={`/admin/products/all/${d._id}`}>
                  <MdDelete />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </SideLayout>
  );
};

export default Users;
