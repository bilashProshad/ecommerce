import "./AllCategory.scss";
import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  deleteCategory,
  getAllAdminCategories,
} from "../../../redux/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearCategoriesError } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/Loading/Loading";
import {
  clearDeleteCategoryError,
  clearDeleteCategoryMessage,
} from "../../../redux/slices/categorySlice";
import ResponsivePagination from "react-responsive-pagination";

const AllCategory = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const { categories, loading, error, totalCategories } = useSelector(
    (state) => state.categories
  );

  const {
    // loading: deleteLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminCategories(`page=${page}&limit=${limit}`));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCategoriesError());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearDeleteCategoryError());
    }

    if (message) {
      toast.success(message);
      dispatch(clearDeleteCategoryMessage());
      window.location.reload();
    }

    if (totalCategories > 0) {
      setTotalPages(Math.ceil(totalCategories / limit));
    }
  }, [error, dispatch, updateError, message, totalCategories, limit]);

  const deleteCategoryHandler = (e, id) => {
    e.preventDefault();

    dispatch(deleteCategory(id));
  };

  const headers = ["Image", "Category Id", "Name", "Actions"];

  return (
    <SideLayout className={`all-products all-category`}>
      <h2 className="title">All Categories</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table headers={headers}>
            {categories.map((d) => (
              <tr key={d?._id}>
                <td>
                  <img className="image" src={d?.image.url} alt="" />
                </td>
                <td>{d?._id}</td>
                <td>{d?.name}</td>
                <td>
                  <div className="link">
                    <Link to={`/admin/categories/${d?._id}`}>
                      <MdEdit />
                    </Link>
                    <Link
                      to={`/admin/categories/${d?._id}`}
                      onClick={(e) => deleteCategoryHandler(e, d._id)}
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

export default AllCategory;
