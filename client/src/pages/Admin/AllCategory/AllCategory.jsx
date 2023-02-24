import "./AllCategory.scss";
import SideLayout from "../../../components/SideLayout/SideLayout";
import Table from "../../../components/Table/Table";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { clearCategoriesError } from "../../../redux/slices/categoriesSlice";
import Loading from "../../../components/Loading/Loading";

const AllCategory = () => {
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCategoriesError());
    }
  }, [error, dispatch]);

  const headers = ["Image", "Product Id", "Name", "Actions"];

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
                    <Link to={`/admin/products/all/${d?._id}`}>
                      <MdEdit />
                    </Link>
                    <Link to={`/admin/products/all/${d?._id}`}>
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
