import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { clearGetAllOrdersError } from "../../../redux/slices/orderSlice";
import { getAllOrders } from "../../../redux/actions/orderAction";
import Loading from "../../../components/Loading/Loading";
import ResponsivePagination from "react-responsive-pagination";

const Orders = () => {
  const headers = ["Order Id", "Status", "Quantity", "Amount", "Actions"];

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { orders, loading, error, totalOrders } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getAllOrders(`page=${page}&limit=${limit}`));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearGetAllOrdersError());
    }

    if (totalOrders > 0) {
      setTotalPages(Math.ceil(totalOrders / limit));
    }
  }, [error, dispatch, totalOrders, limit]);

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Orders</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table headers={headers}>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    {order.orderItems.reduce(
                      (total, current) => total + current.quantity,
                      0
                    )}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <div className="link">
                      <Link to={`/admin/orders/${order._id}`}>
                        <MdEdit />
                      </Link>
                      <Link to={`/admin/orders/${order._id}`}>
                        <MdDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </Table>

          {totalPages > 1 && (
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </SideLayout>
  );
};

export default Orders;
