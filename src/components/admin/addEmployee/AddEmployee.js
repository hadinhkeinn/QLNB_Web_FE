import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import EmployeeForm from "../employeeForm/EmployeeForm";
import "./AddEmployee.scss";
import { toast } from "react-toastify";
import { create } from "../../../redux/features/auth/authSlice";


const initialState = {
    identity_num: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    photo: "",
    position: "",
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [userImage, setUserImage] = useState("");
  const [files, setFiles] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  const isLoading = useSelector((state) => state.auth.isLoading);

  const { name, identity_num, email, password, dateOfBirth, gender, phone, photo, position } = user;
  // console.log(categories);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();

    const formData = {
      identity_num,
      name,
      email,
      password,
      dateOfBirth,
      gender,
      phone,
      photo: files,
      position,
    };

    // console.log(formData);

    await dispatch(create(formData));

    navigate("/admin/all-employees");
  };

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <h3 className="--mt">Thêm nhân viên mới</h3>

      <EmployeeForm
        files={files}
        setFiles={setFiles}
        user={user}
        userImage={userImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        description={description}
        handleInputChange={handleInputChange}
        saveUser={saveUser}
        isEditing={false}
      />
    </div>
  );
};

export default AddEmployee;
