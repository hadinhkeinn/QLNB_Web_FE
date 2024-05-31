import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./EmployeeForm.scss";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const EmployeeForm = ({
    files,
    setFiles,
    user,
    imagePreview,
    setImagePreview,
    description,
    setDescription,
    handleInputChange,
    handleImageChange,
    saveUser,
    isEditing,
}) => {
    // useEffect(() => {
    //   const updateImagePreview = () => {
    //     // const imagesArray = files.map((file) => {
    //     //   return file;
    //     // });
    //     setImagePreview(files);
    //   };
    //   updateImagePreview();
    // }, [files, setImagePreview]);

    const removeImage = (image) => {
        console.log(image);
        setFiles("");
    };

    return (
        <div className="add-product">
            <UploadWidget files={files} setFiles={setFiles} />

            <Card cardClass={"card"}>
                <br />
                <form onSubmit={saveUser}>
                    <label>Hình ảnh nhân viên:</label>
                    <div className="slide-container">
                        <aside>
                            {files !== "" &&
                                <div className="thumbnail">
                                    <img src={files} alt="userImage" height={100} />
                                    <div>
                                        <BsTrash
                                            size={15}
                                            className="thumbnailIcon"
                                            onClick={() => removeImage(files)}
                                        />
                                    </div>
                                </div>
                            }
                            {files === "" && (
                                <p className="--m">Không có hình ảnh</p>
                            )}
                        </aside>
                    </div>
                    <br />
                    <hr />

                    <label>CMND/CCCD:</label>
                    <input
                        type="text"
                        placeholder="CMND/CCCD"
                        name="identity_num"
                        value={user?.identity_num}
                        onChange={handleInputChange}
                    />
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        placeholder="Tên nhân viên"
                        name="name"
                        value={user?.name}
                        onChange={handleInputChange}
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={user?.email}
                        onChange={handleInputChange}
                    />
                    <label>SĐT:</label>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        name="phone"
                        value={user?.phone}
                        onChange={handleInputChange}
                    />
                    <label>Ngày sinh:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={user?.dateOfBirth.split("T")[0]}
                        onChange={handleInputChange}
                    />
                    <label style={{ marginTop: "15px" }}>Giới tính:</label>
                    <input
                        type="text"
                        placeholder=""
                        name="gender"
                        value={user?.gender}
                        onChange={handleInputChange}
                    />
                    <label>Chức vụ:</label>
                    <input
                        type="text"
                        placeholder="Chức vụ"
                        name="position"
                        value={user?.position}
                        onChange={handleInputChange}
                    />
                    {!isEditing && (
                        <>
                            <lable>Mật khẩu</lable>
                            <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                            >
                            </input>
                        </>
                    )
                    }
                    <div className="--my">
                        <button type="submit" className="--btn --btn-primary">
                            Lưu
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EmployeeForm;
