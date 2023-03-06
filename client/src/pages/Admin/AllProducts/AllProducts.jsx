import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import "./AllProducts.scss";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteProduct,
  getAdminProducts,
} from "../../../redux/actions/productAction";
import {
  clearAdminProductsError,
  clearModifiedProductError,
  clearDeleteProductMessage,
} from "../../../redux/slices/productSlice";
import Loading from "../../../components/Loading/Loading";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const {
    loading: deleteLoading,
    error: deleteError,
    message: deleteMessage,
  } = useSelector((state) => state.productModify);

  const headers = ["Product Id", "Name", "Stock", "Price", "Actions"];

  useEffect(() => {
    dispatch(getAdminProducts(`page=${page}&limit=${limit}`));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminProductsError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearModifiedProductError());
    }

    if (deleteMessage) {
      toast.success(deleteMessage);
      dispatch(clearDeleteProductMessage());
      window.location.reload();
    }
  }, [error, dispatch, deleteError, deleteMessage]);

  const deleteProductHandler = (e, id) => {
    e.preventDefault();

    dispatch(deleteProduct(id));
  };

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Products</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table headers={headers}>
            {products.length > 0 &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="link">
                      <Link to={`/admin/products/${product._id}`}>
                        <MdEdit />
                      </Link>
                      <Link
                        to={`/admin/products/${product._id}`}
                        onClick={(e) => deleteProductHandler(e, product._id)}
                      >
                        <MdDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </Table>
        </>
      )}
    </SideLayout>
  );
};

export default AllProducts;
