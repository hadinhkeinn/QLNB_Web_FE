import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Không có quyền truy cập.</h2>
        <p>Trang này dành cho người quản trị website.</p>
        <br />
        <Link to="/home">
          <button className="--btn">&larr; Quay về trang chủ</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  if (userRole === "admin") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
