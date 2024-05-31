import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import EmployeeForm from "../employeeForm/EmployeeForm";
import { selectUserToEdit, getUserById, updateUser } from "../../../redux/features/auth/authSlice";

const EditEmployee = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);

    const userEdit = useSelector(selectUserToEdit);
    const [files, setFiles] = useState("");
    const [user, setUser] = useState(userEdit);
    // console.log(user);  
    //   const [productImage, setProductImage] = useState("");
    //   const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        setUser(userEdit);

        if (userEdit && userEdit.photo) {
            setFiles(userEdit.photo);
        }

    }, [userEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = async (e) => {
        e.preventDefault();
        if (files.length < 1) {
            return toast.info("Please add an image");
        }

        const formData = {
            identity_num: user?.identity_num,
            name: user?.name,
            email: user?.email,
            password: user?.password,
            gender: user?.gender,
            dateOfBirth: user?.dateOfBirth,
            position: user?.position,
            photo: files,
        };

        console.log(formData);

        await dispatch(updateUser({ id, userData: formData }));
        // await dispatch(getProducts());
        navigate("/admin/all-employees");
    };

    return (
        <div>
            <h3 className="--mt">Chỉnh sửa thông tin nhân viên</h3>
            <EmployeeForm
                files={files}
                setFiles={setFiles}
                user={user}
                handleInputChange={handleInputChange}
                saveUser={saveUser}
                isEditing={true}
            />
        </div>
    );
};

export default EditEmployee;
