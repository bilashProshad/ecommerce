import { Link } from "react-router-dom";
import LineChart from "../../../components/Chart/LineChart";
import SideLayout from "../../../components/SideLayout/SideLayout";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../redux/actions/dashboardAction";
import { toast } from "react-hot-toast";
import { clearGetDashboardStatsError } from "../../../redux/slices/dashboardSlice";
import Loading from "../../../components/Loading/Loading";
import DoughnutChart from "../../../components/Chart/DoughnutChart";

const Dashboard = () => {
  const { loading, error, stats, success } = useSelector(
    (state) => state.dashboard
  );
  const [salesByDay, setSalesByDay] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearGetDashboardStatsError());
    }

    if (success) {
      setSalesByDay(stats.salesByDay);
    }
  }, [error, dispatch, success, stats]);

  const today = new Date();
  const labels = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    labels.unshift(
      day.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }

  return (
    <SideLayout className={`dashboard`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="title">Dashboard</h2>

          <div className="summary">
            <div className="summary-title">
              <p>Sell of a Month</p>
              <p>${stats?.monthlyTotalSold}</p>
            </div>

            <div className="summary-boxs">
              <Link to={`/admin/products`} className={`products-box`}>
                <p>Products</p>
                <p>{stats?.productsCount}</p>
              </Link>
              <Link to={`/admin/orders`} className={`orders-box`}>
                <p>Orders</p>
                <p>{stats?.ordersCount}</p>
              </Link>
              <Link to={`/admin/users`} className={`users-box`}>
                <p>Users</p>
                <p>{stats?.usersCount}</p>
              </Link>
            </div>

            <div className="sales-overview">
              <div className="summary-title">
                <p>Sales overview</p>
              </div>

              <div className="charts">
                <h2>Last 7 Days Earning (in USD)</h2>
                {salesByDay.length > 0 && (
                  <div className="line">
                    <LineChart
                      max={1000}
                      titleText={`Product Chart`}
                      chartData={salesByDay}
                      labels={labels}
                      label={`Produce Sell`}
                    />
                  </div>
                )}

                <div className="doughnut">
                  <h2>Product Availability</h2>

                  <DoughnutChart
                    inStock={stats?.productAvailablity?.inStockCount}
                    outOfStock={stats?.productAvailablity?.outOfStockCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </SideLayout>
  );
};

export default Dashboard;
