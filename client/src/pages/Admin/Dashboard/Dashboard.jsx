import { Link } from "react-router-dom";
import LineChart from "../../../components/Chart/LineChart";
import SideLayout from "../../../components/SideLayout/SideLayout";
import "./Dashboard.scss";
import faker from "faker";

const Dashboard = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = labels.map(() => faker.datatype.number({ min: 0, max: 1000 }));

  return (
    <SideLayout className={`dashboard`}>
      <h2 className="title">Dashboard</h2>

      <div className="summary">
        <div className="summary-title">
          <p>Total Amount</p>
          <p>$4565.25</p>
        </div>

        <div className="summary-boxs">
          <Link to={`/admin/products`} className={`products-box`}>
            <p>Products</p>
            <p>50</p>
          </Link>
          <Link to={`/admin/orders`} className={`orders-box`}>
            <p>Orders</p>
            <p>99</p>
          </Link>
          <Link to={`/admin/users`} className={`users-box`}>
            <p>Users</p>
            <p>200</p>
          </Link>
        </div>

        <div className="sales-overview">
          <div className="summary-title">
            <p>Sales overview</p>
          </div>

          <div className="charts">
            <LineChart
              max={1000}
              titleText={`Product Chart`}
              chartData={data}
              labels={labels}
              label={`Produce Sell`}
            />
            <LineChart
              max={1000}
              titleText={`Product Chart`}
              chartData={data}
              labels={labels}
              label={`Produce Sell`}
            />
            <LineChart
              max={1000}
              titleText={`Product Chart`}
              chartData={data}
              labels={labels}
              label={`Produce Sell`}
            />
            <LineChart
              max={1000}
              titleText={`Product Chart`}
              chartData={data}
              labels={labels}
              label={`Produce Sell`}
            />
          </div>
        </div>
      </div>
    </SideLayout>
  );
};

export default Dashboard;
