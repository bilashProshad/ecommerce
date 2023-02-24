import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import "./AllProducts.scss";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const AllProducts = () => {
  const headers = ["Product Id", "Name", "Stock", "Price", "Actions"];
  const data = [
    {
      _id: "634840c90bec16456c6f9d1a",
      name: "Sony Wired Headphone",
      stock: 5,
      price: 500,
    },
    {
      _id: "634840c90bec13046c6f9d1b",
      name: "Sony Wired Headphone",
      stock: 5,
      price: 500,
    },
    {
      _id: "634840c90bec1302456f9d5f",
      name: "Sony Wired Headphone",
      stock: 5,
      price: 500,
    },
  ];

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Products</h2>

      <Table headers={headers}>
        {data.map((d) => (
          <tr key={d._id}>
            <td>{d._id}</td>
            <td>{d.name}</td>
            <td>{d.stock}</td>
            <td>{d.price}</td>
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

export default AllProducts;
