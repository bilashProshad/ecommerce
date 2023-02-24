import "./Table.scss";

const Table = ({ headers, children }) => {
  return (
    <div className="table-container">
      <table className="list">
        <thead>
          <tr className="header">
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
