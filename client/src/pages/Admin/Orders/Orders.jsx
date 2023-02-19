import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../components/Table/Table";

const Orders = () => {
  const headers = ["Order Id", "Status", "Quantity", "Amount", "Actions"];
  const data = [
    {
      _id: "634840c90bec16456c6f9d1a",
      status: "Shipped",
      Quantity: 5,
      Amount: 500,
    },
    {
      _id: "634840c90bec16446c6f9d1b",
      status: "Shipped",
      Quantity: 5,
      Amount: 500,
    },
    {
      _id: "634840c90bec16456c7f9d1c",
      status: "Shipped",
      Quantity: 5,
      Amount: 500,
    },
  ];

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Orders</h2>

      <Table headers={headers} data={data}>
        {data.map((d) => (
          <tr key={d._id}>
            <td>{d._id}</td>
            <td>{d.status}</td>
            <td>{d.Quantity}</td>
            <td>{d.Amount}</td>
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

export default Orders;
