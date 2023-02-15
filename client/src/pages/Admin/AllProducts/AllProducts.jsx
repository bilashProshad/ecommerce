import SideLayout from "../../../components/SideLayout/SideLayout";
import "./AllProducts.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AllProducts = () => {
  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Products</h2>

      <table className="list">
        <tr className="header">
          <th>Product Id</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>634840c90bec13046c6f9d1a</td>
          <td>Sony Wired Headphone</td>
          <td>5</td>
          <td>500</td>
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
          <td>Sony Wired Headphone</td>
          <td>5</td>
          <td>500</td>
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
          <td>Sony Wired Headphone</td>
          <td>5</td>
          <td>500</td>
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

export default AllProducts;
