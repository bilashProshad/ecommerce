import { Link } from "react-router-dom";
import SideLayout from "../../../components/SideLayout/SideLayout";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  clearAllUsersError,
  clearUserError,
  resetUser,
} from "../../../redux/slices/userSllice";
import Loading from "../../../components/Loading/Loading";
import { deleteUser, getAllUsers } from "../../../redux/actions/userAction";
import ResponsivePagination from "react-responsive-pagination";

const Users = () => {
  const headers = ["User Id", "Name", "Email", "Role", "Actions"];

  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const { loading, users, error, totalUsers } = useSelector(
    (state) => state.users
  );
  const {
    // loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.user);

  const deleteUserHandler = (e, id) => {
    e.preventDefault();

    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAllUsers(`page=${page}&limit=${limit}`));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearUserError());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      dispatch(resetUser());
      dispatch(getAllUsers());
    }

    if (totalUsers > 0) {
      setTotalPages(Math.ceil(totalUsers / limit));
    }
  }, [error, dispatch, deleteError, isDeleted, totalUsers, limit]);

  return (
    <SideLayout className={`all-products`}>
      <h2 className="title">All Users</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table headers={headers}>
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
                      <Link
                        to={`/admin/users/${user._id}`}
                        onClick={(e) => deleteUserHandler(e, user._id)}
                      >
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

export default Users;
