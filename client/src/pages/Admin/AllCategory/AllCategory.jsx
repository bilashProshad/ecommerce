import "./AllCategory.scss";
import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  deleteCategory,
  getAllCategories,
} from "../../../redux/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearCategoriesError } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/Loading/Loading";
import {
  clearDeleteCategoryError,
  clearDeleteCategoryMessage,
} from "../../../redux/slices/categorySlice";

const AllCategory = () => {
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
  }, [error, dispatch, updateError, message]);

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
        </>
      )}
    </SideLayout>
  );
};

export default AllCategory;
