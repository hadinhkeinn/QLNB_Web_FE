import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { selectUser } from "../../../redux/features/auth/authSlice";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const user = useSelector(selectUser);
  const userName = user?.name;

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-employees" className={activeLink}>
              Tất cả nhân viên
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-employee" className={activeLink}>
              Thêm nhân viên
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/news" className={activeLink}>
              Bản tin
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-news" className={activeLink}>
              Thêm tin tức
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-notifi" className={activeLink}>
              Thêm thông báo
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
