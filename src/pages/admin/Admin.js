import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import styles from "./Admin.module.scss";
import Home from "../../components/admin/home/Home";
import ViewEmployees from "../../components/admin/viewEmployees/ViewEmployees";
import EditEmployee from "../../components/admin/editEmployee/EditEmployee";
import AddEmployee from "../../components/admin/addEmployee/AddEmployee";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-employees" element={<ViewEmployees />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
